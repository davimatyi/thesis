import p5Types from 'p5';
import { ChartData } from '../../types/chartDataType';
import { MetaData } from '../ChartView';

const DrawBarChart = (p5: p5Types, data: ChartData, meta: MetaData) => {
  const maxValue = Math.max(...(data.values.map(arr => Math.max(...arr))));
	const dataCount = data.values[0].length;
	const barWidth = (meta.canvasWidth - 2 * data.margin) / dataCount - data.bar_spacing;
  p5.background(data.background);
		p5.fill(data.fill_primary);
		for(let i = 0; i < dataCount; i++) {
			p5.rect(
				data.margin + i * (barWidth + data.bar_spacing),
				(meta.canvasHeight - data.margin) - (meta.canvasHeight - 2 * data.margin) * (data.values[0][i] / maxValue),
				barWidth,
				(meta.canvasHeight - 2 * data.margin) * (data.values[0][i] / maxValue)
			);
		}
}

export default DrawBarChart;