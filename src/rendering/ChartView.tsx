import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';
import { ChartData } from '../types/ChartDataType';
import PieChartRenderer from './charts/PieChartRenderer';
import LineChartRenderer from './charts/LineChartRenderer';
import BarChartRenderer from './charts/BarChartRenderer';
import BarChart3DRenderer from './charts/3DBarChartRenderer';
// import OpenSans from '../assets/OpenSans_Regular.ttf';

export interface MetaData {
	maxValue: number
}

const metadata: MetaData = {
	maxValue: 0
}

const ChartView: React.FC<{ data: ChartData, doExport: {value: boolean, fileType: string} }> = ({ data, doExport }) => {

	const barChart = new BarChartRenderer();
	const lineChart = new LineChartRenderer();
	const pieChart = new PieChartRenderer();
	const barChart3d = new BarChart3DRenderer();
	let font: p5Types.Font;

	const preload = (p5: p5Types) => {
		font = p5.loadFont(process.env.PUBLIC_URL + '/OpenSans_Regular.ttf');
	}

	const windowResized = (p5: p5Types) => {
		p5.resizeCanvas(p5.windowWidth * 0.65, p5.windowHeight - 67);
		if(data.type === '3dbar') p5.perspective(p5.PI / 3.0, p5.width / p5.height, 0.1, 500);
	}

	const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(p5.windowWidth * 0.65, p5.windowHeight - 67, p5.WEBGL).parent(canvasParentRef);
		p5.textFont(font);
		metadata.maxValue = Math.max(...(data.values.map(arr => Math.max(...arr))));
		if(data.type === '3dbar') p5.perspective(p5.PI / 3.0, p5.width / p5.height, 0.1, 500);
		windowResized(p5);
	};

	const draw = (p5: p5Types) => {
		switch (data.type) {
			case 'bar': barChart.draw(p5, data, metadata); break;
			case 'pie': pieChart.draw(p5, data, metadata); break;
			case 'line': lineChart.draw(p5, data, metadata); break;
			case '3dbar': barChart3d.draw(p5, data, metadata); break;
		}
		if(doExport.value) {
			p5.saveCanvas("image", doExport.fileType);
			doExport.value = false;
		}
	};

	return <Sketch preload={preload} setup={setup} draw={draw} windowResized={windowResized} />;
};

export default ChartView