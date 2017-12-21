import React, {Component} from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';
import {scaleLinear,scaleOrdinal,schemeCategory20b} from 'd3-scale';
import {hierarchy,treemap,treemapResquarify} from 'd3-hierarchy';
import TypeToggle from './TypeToggle';
import './TreeMap.css';

class TreeView extends Component {
	constructor(props) {
		super(props);
		const h = 500;
		const w = document.getElementsByClassName('App-body')[0].offsetWidth-72;
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
			sum_method: 'byCount'
		};
		this.toggleSumMethod = this.toggleSumMethod.bind(this);
		this.exportSVG = this.exportSVG.bind(this);
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
			obj.size = node.outerHTML.length;
		}
		obj.index = idx;
	}
	setPos(dim,coords) {
		return scaleLinear().range([0, dim]).domain([0,dim]);
	}
	getTextColor(c) {
		return this.getLuma(c) < 130 ? '#FFF' : '#000';
	}
	getLuma(c) {
		c = c.substring(1);      // strip #
		const rgb = parseInt(c, 16);   // convert rrggbb to decimal
		const r = (rgb >> 16) & 0xff;  // extract red
		const g = (rgb >>  8) & 0xff;  // extract green
		const b = (rgb >>  0) & 0xff;  // extract blue
		return 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
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
						fill={fillColor}
						stroke="#fff"
						width={this.state.kx*(d.x1 - d.x0)}
						height={this.state.ky*(d.y1 - d.y0)} />
					<clipPath id={'clip-'+i}>
						<rect width={this.state.kx*(d.x1 - d.x0)}
							height={this.state.ky*(d.y1 - d.y0)} />
					</clipPath>
					<text clipPath={'url(#clip-'+i+')'}
						x="4" y="13"
						fill={this.getTextColor(fillColor)}
						fillOpacity="0.7">{d.data.name}</text>
				</g>
			);
		});
		const descendants = this.state.node.descendants().filter(desc => desc.children);
		const parentRects = descendants.map((d,i) => {
			const width = this.state.kx*(d.x1 - d.x0);
			const height = this.state.ky*(d.y1 - d.y0);
			const longName = d.data.name.length * 5.2 > width;
			const textX = longName ? 4 : width/2;
			const textAnchor = longName ? 'start' : 'middle';
			return (
				<g key={'g-parent-'+i}
					className="parentRect"
					transform={'translate(' + this.state.x(d.x0) + ',' + this.state.y(d.y0) + ')' }
					onClick={e => this.zoom(this.state.node===d ? this.state.root : d,e)}>
					<rect id={'rect-parent-'+i}
						width={width} height={height}
					 	fill="#fff" fillOpacity="0" />
					<clipPath id={'clip-parent-'+i}>
						<rect width={width} height={height} />
					</clipPath>
					<text clipPath={'url(#clip-parent-'+i+')'}
						x={textX} y={height/2}
						fillOpacity="0"
						textAnchor={textAnchor}>{d.data.name}</text>
				</g>
			);
		});
		return (
			<div>
				<FormGroup>
					<TypeToggle name="sum_method"
						value={this.state.sum_method}
						options={[
							{value:'byCount',label:'By Count'},
							{value:'bySize',label:'By Size'}
						]}
						onChange={this.toggleSumMethod} />
					<Button className="pull-right"
						bsSize="xs" bsStyle="primary"
						onClick={this.exportSVG}>Export SVG</Button>
				</FormGroup>
				<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width={this.state.w} height={this.state.h} ref={svg => this.svg = svg}>
					{leafRects}
					{parentRects}
				</svg>
			</div>
		);
	}
	zoom(node) {
		const kx = this.state.w / (node.x1-node.x0), ky = this.state.h / (node.y1-node.y0);
		this.state.x.domain([node.x0, node.x1]);
		this.state.y.domain([node.y0, node.y1]);
		this.setState({
			node,
			kx,
			ky
		});
	}
	bySize(d) {
		return Math.max(d.size,100);
	}
	byCount(d) {
		return d.children ? 0 : 1;
	}
	toggleSumMethod(value) {
		this.setState({
			sum_method: value
		})
		this.state._treemap(this.state.root.sum(this[value]));
		this.zoom(this.state.node);
	}
	exportSVG() {
		const svgData = this.svg.outerHTML;
		const svgBlob = new Blob([svgData], {type:'image/svg+xml;charset=utf-8'});
		const svgUrl = URL.createObjectURL(svgBlob);
		const downloadLink = document.createElement('a');
		downloadLink.href = svgUrl;
		downloadLink.download = 'treemap.svg';
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	}
};

export default TreeView;
