import React, {Component} from 'react';
// import {select} from 'd3-selection';
// import {transition} from 'd3-transition';
import {scaleLinear,scaleOrdinal,schemeCategory20b} from 'd3-scale';
import {hierarchy,treemap,treemapResquarify} from 'd3-hierarchy';
import TypeToggle from './TypeToggle';
import './TreeMap.css';

class TreeView extends Component {
	constructor(props) {
		super(props);
		const h = 500;
		const w = document.getElementsByClassName('App-body')[0].offsetWidth;
		const json = {};
		this.addNode(this.props.docElem,json,0);
		const root = hierarchy(json)
		.eachBefore((d) => {
			d.data.id = (d.parent ? d.parent.data.id + '.' : '') + d.data.name + d.data.index;
		})
		.sum(this.byCount);
		const _treemap = treemap()
		.tile(treemapResquarify)
		.size([w,h]);
		_treemap(root);
		this.state = {
			node: root,
			_treemap,
			root,
			color: scaleOrdinal(schemeCategory20b),
			x: this.setPos(w),
			y: this.setPos(h),
			w,
			h,
			kx: 1,
			ky: 1,
			type: 'COUNT'
		};
	}
	addNode(node,obj,idx) {
		obj.name = node.nodeName.toLowerCase();
		if(node.className!==''){
			obj.name += '.'+node.className;
		}
		if(node.childNodes.length){
			const children = [];
			for(let i=0;i<node.childNodes.length;i++){
				const childNode = node.childNodes[i];
				if(childNode.nodeType===1){
					const nodeObj = {};
					this.addNode(childNode,nodeObj,i);
					children.push(nodeObj);
				}
			}
			if(children.length>1){
				obj.children = children;
			}else if(children.length===1){
				obj.name += '>'+children[0].name;
				if(children[0].children){
					obj.children = children[0].children;
				}
			}
		}
		if(!obj.children){
			obj.size = node.innerHTML.length;
		}
		obj.index = idx;
	}
	setPos(dim,coords) {
		return scaleLinear().range([0, dim]).domain([0,dim]);
	}
	getTextColor(c) {
		c = c.substring(1);      // strip #
		var rgb = parseInt(c, 16);   // convert rrggbb to decimal
		var r = (rgb >> 16) & 0xff;  // extract red
		var g = (rgb >>  8) & 0xff;  // extract green
		var b = (rgb >>  0) & 0xff;  // extract blue

		var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
		console.log(luma);
		return luma < 100 ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';
	}
	render() {
		const leaves = this.state.node.leaves();
		const leafRects = leaves.map((d,i) => {
			const fillColor = this.state.color(d.parent.data.id);
			return (
				<g key={'g-leaf-'+i}
					className="leafRect"
					transform={'translate(' + this.state.x(d.x0) + ',' + this.state.y(d.y0) + ')' }>
					<rect id={'rect-fill-'+i}
						className="leafFill"
						style={{fill:fillColor,stroke:'#fff'}}
						width={this.state.kx*(d.x1 - d.x0)}
						height={this.state.ky*(d.y1 - d.y0)} />
					<clipPath id={'clip-'+i}>
						<use href={'#rect-fill-'+i}></use>
					</clipPath>
					<text clipPath={'url(#clip-'+i+')'}
						x="4" y="13"
						style={{fill:this.getTextColor(fillColor)}}>{d.data.name.toLowerCase()}</text>
				</g>
			);
		});
		const descendants = this.state.node.descendants().filter(desc => desc.children);
		const parentRects = descendants.map((d,i) => {
			const width = this.state.kx*(d.x1 - d.x0);
			return (
				<g key={'g-parent-'+i}
					className="parentRect"
					transform={'translate(' + this.state.x(d.x0) + ',' + this.state.y(d.y0) + ')' }
					onClick={e => this.zoom(this.state.node===d ? this.state.root : d,e)}>
					<rect id={'rect-parent-'+i}
						width={width}
						height={this.state.ky*(d.y1 - d.y0)} />
					<clipPath id={'clip-parent-'+i}>
						<use href={'#rect-parent-'+i}></use>
					</clipPath>
					<text clipPath={'url(#clip-parent-'+i+')'}
						x={width/2} y="25" textAnchor="middle">{d.data.name.toLowerCase()}</text>
				</g>
			);
		});
		return (
			<div>
				<svg width={this.state.w} height={this.state.h} ref={svg => this.svg = svg}>
					{leafRects}
					{parentRects}
				</svg>
				<TypeToggle type={this.state.type} types={['COUNT','SIZE']} toggleType={this.toggleType} />
			</div>
		);
	}
	zoom(node,e) {
		const kx = this.state.w / (node.x1-node.x0), ky = this.state.h / (node.y1-node.y0);
		this.state.x.domain([node.x0, node.x1]);
		this.state.y.domain([node.y0, node.y1]);
		this.setState({
			node,
			kx,
			ky
		});
		e.stopPropagation();
	}
	bySize(d) {
		return Math.max(d.size,20);
	}
	byCount(d) {
		return d.children ? 0 : 1;
	}
	toggleType
};

export default TreeView;
