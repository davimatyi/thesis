import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';
import { ChartData } from '../types/ChartDataType';
import PieChartRenderer from './charts/PieChartRenderer';
import LineChartRenderer from './charts/LineChartRenderer';
import BarChartRenderer from './charts/BarChartRenderer';

export interface MetaData {
	maxValue: number
}

const metadata: MetaData = {
	maxValue: 0
}

const ChartView: React.FC<{ data: ChartData, doExport: {value: boolean} }> = ({ data, doExport }) => {

	const barChart = new BarChartRenderer();
	const lineChart = new LineChartRenderer();
	const pieChart = new PieChartRenderer();

	const windowResized = (p5: p5Types) => {
		p5.resizeCanvas(p5.windowWidth * 0.65, p5.windowHeight - 67);
	}

	const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(p5.windowWidth * 0.65, p5.windowHeight - 67).parent(canvasParentRef);
		metadata.maxValue = Math.max(...(data.values.map(arr => Math.max(...arr))));
	};

	const draw = (p5: p5Types) => {
		switch (data.type) {
			case 'bar': barChart.draw(p5, data, metadata); break;
			case 'pie': pieChart.draw(p5, data, metadata); break;
			case 'line': lineChart.draw(p5, data, metadata); break;
		}
		if(doExport.value) {
			p5.saveCanvas("image", "png");
			doExport.value = false;
		}
	};

	return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default ChartView