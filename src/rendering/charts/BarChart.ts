import p5Types from 'p5';
import { ChartData } from '../../types/ChartDataType';
import { MetaData } from '../ChartView';

const DrawBarChart = (p5: p5Types, data: ChartData, meta: MetaData) => {
  const flatArr = data.values.flat();
  const maxValue = Math.max(...(data.values.map(arr => Math.max(...arr))));
  const dataCount = flatArr.length;
  const barWidth = (meta.canvasWidth - 2 * data.margin) / dataCount - data.spacing;
  const colorCount = data.fill_colors.length;
  p5.background(data.background);
  if(data.stroke) {
    p5.stroke(data.stroke_color);
    p5.strokeWeight(data.stroke_width);
  } else p5.noStroke();
  for (let i = 0; i < dataCount; i++) {
    if(data.use_multiple_colors) 
      p5.fill(data.fill_colors[i % colorCount]);
    else
      p5.fill(data.fill_primary);
      
    p5.rect(
      data.margin + i * (barWidth + data.spacing),
      (meta.canvasHeight - data.margin) - (meta.canvasHeight - 2 * data.margin) * (flatArr[i] / maxValue),
      barWidth,
      (meta.canvasHeight - 2 * data.margin) * (flatArr[i] / maxValue),
      data.border_radius
    );
  }

}

export default DrawBarChart;