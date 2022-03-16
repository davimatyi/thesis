import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';
import { ChartData } from '../types/ChartDataType';
import PieChartRenderer from './charts/PieChartRenderer';
import LineChartRenderer from './charts/LineChartRenderer';
import BarChartRenderer from './charts/BarChartRenderer';

export interface MetaData {
	canvasWidth: number,
	canvasHeight: number,
	maxValue: number
}

const metadata: MetaData = {
	canvasWidth: 800,
	canvasHeight: 600,
	maxValue: 0
}

const ChartView: React.FC<{ data: ChartData }> = ({ data }) => {

	const barChart = new BarChartRenderer();
	const lineChart = new LineChartRenderer();
	const pieChart = new PieChartRenderer();

	const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(metadata.canvasWidth, metadata.canvasHeight).parent(canvasParentRef);
		metadata.maxValue = Math.max(...(data.values.map(arr => Math.max(...arr))));

	};

	const draw = (p5: p5Types) => {
		switch (data.type) {
			case 'bar': barChart.draw(p5, data, metadata); break;
			case 'pie': pieChart.draw(p5, data, metadata); break;
			case 'line': lineChart.draw(p5, data, metadata); break;
		}
	};

	return <Sketch setup={setup} draw={draw} />;
};

export default ChartView