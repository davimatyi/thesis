import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';
import { ChartData } from "../types/chartDataType";
import DrawBarChart from './charts/BarChart';

const canvasWidth = 800, canvasHeight = 600;

export interface MetaData {
	canvasWidth: number,
	canvasHeight: number,
}

let metadata: MetaData= {
	canvasWidth: 800,
	canvasHeight: 600,
}

const ChartView: React.FC<{ data: ChartData }> = ({ data }) => {


	const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
	};

	const draw = (p5: p5Types) => {
		switch(data.type) {
			case 'bar': DrawBarChart(p5, data, metadata);
		}
	};

	return <Sketch setup={setup} draw={draw} />;
};

export default ChartView