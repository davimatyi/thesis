import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';
import { ChartData } from "../types/chartDataType";

interface RendererProps {
	data: ChartData
}

const ChartView: React.FC<RendererProps> = (props: RendererProps) => {
	

	const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(500, 500).parent(canvasParentRef);
	};

	const draw = (p5: p5Types) => {
		p5.background(0);
		p5.ellipse(50, 50, 70, 70);
	};

	return <Sketch setup={setup} draw={draw} />;
};

export default ChartView