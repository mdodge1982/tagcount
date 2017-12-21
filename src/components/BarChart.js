import React, {Component} from 'react';
import {scaleLinear} from 'd3-scale';
import {max} from 'd3-array';
import values from 'object.values';
import './BarChart.css';

class BarChart extends Component {
	render() {
		const height = 500;
		if (!Object.values) {
			values.shim();
		}
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
			const rectHeight = yScale(itm.count);
			const rectY = height-rectHeight;
			let textY = rectY+15;
			const x = i*barWdith;
			const textStyle = {};
			if(rectHeight<20){
				textY = rectY-5;
			}else{
				textStyle.fill = '#fff';
			}
			return (
				<g key={'g-'+itm.name}>
					<rect x={(x+.05)+'%'}
						y={rectY}
						height={rectHeight}
						width={(barWdith-.5)+'%'} />
					<text x={(x+(barWdith-.2)/2)+'%'}
						y={textY}
						style={textStyle}
						width={(barWdith-.2)+'%'}
						textAnchor="middle">{itm.name+' ('+itm.count+')'}</text>
				</g>
			);
		});
		return (
			<svg width="100%" height={height} className="BarChart">
				{bars}
			</svg>
		);
	}
};

export default BarChart;
