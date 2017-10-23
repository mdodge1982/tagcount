import React, {Component} from 'react';
import {scaleLinear} from 'd3-scale';
import {max} from 'd3-array';

class BarChart extends Component {
	render() {
		const height = 500;
		let data = Object.values(this.props.tags);
		data = data.sort((a,b) => {
			const n = b.count - a.count;
			if(n!==0){
				return n;
			}
			return a.name<b.name ? -1 : a.name>b.name ? 1 : 0;
		});
		const counts = data.map(itm => itm.count);
		const barWdith = 100/data.length;
		const dataMax = max(counts);
		const yScale = scaleLinear().domain([0, dataMax]).range([0, height-20]);
		const bars = data.map((itm, i) => {
			return (
				<g key={'g-'+itm.name}>
					<rect style={{fill:'#d7f3f7',stroke:'#79d7e4'}}
					x={(i*barWdith+.05)+'%'}
					y={height-yScale(itm.count)}
					height={yScale(itm.count)}
					width={(barWdith-.5)+'%'} />
					<text x={(i*barWdith+(barWdith-.2)/2)+'%'}
					style={{fontSize:'12px'}}
					textAnchor="middle"
					width={(barWdith-.2)+'%'}
					y={height-yScale(itm.count)-10}>{itm.name+' ('+itm.count+')'}</text>
				</g>
			);
		});
		return (
			<svg width="100%" height={height}>
				{bars}
			</svg>
		);
	}
};

export default BarChart;
