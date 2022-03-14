import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';
import { ChartData } from '../types/ChartDataType';
import DrawBarChart from './charts/BarChart';
import DrawPieChart from './charts/PieChart';
import DrawLineChart from './charts/LineChart';

export interface MetaData {
	canvasWidth: number,
	canvasHeight: number,
}

const metadata: MetaData = {
	canvasWidth: 800,
	canvasHeight: 600,
}

const ChartView: React.FC<{ data: ChartData }> = ({ data }) => {


	const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(metadata.canvasWidth, metadata.canvasHeight).parent(canvasParentRef);
	};

	const draw = (p5: p5Types) => {
		switch (data.type) {
			case 'bar': DrawBarChart(p5, data, metadata); break;
			case 'pie': DrawPieChart(p5, data, metadata); break;
			case 'line': DrawLineChart(p5, data, metadata); break;
		}
	};

	return <Sketch setup={setup} draw={draw} />;
};

export default ChartView