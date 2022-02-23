import p5Types from 'p5';
import { ChartData } from '../../types/ChartDataType';
import { MetaData } from '../ChartView';

const DrawLineChart = (p5: p5Types, data: ChartData, meta: MetaData) => {

  const flatArr = data.values.flat();
  const maxValue = Math.max(...(data.values.map(arr => Math.max(...arr))));
  const minValue = data.start_from_zero ? 0 : Math.min(...(data.values.map(arr => Math.min(...arr))));
  const dataCount = flatArr.length;
  const segmentWidth = (meta.canvasWidth - 2 * data.margin) / dataCount;

  p5.background(data.background);
  p5.stroke(data.stroke_color);
  p5.strokeWeight(data.stroke_width);

  let prevHeight = (flatArr[0] - minValue) / (maxValue - minValue) * (meta.canvasHeight - data.margin * 2);

  for(let i = 1; i < dataCount; i++) {
    const height = (flatArr[i] - minValue) / (maxValue - minValue) * (meta.canvasHeight - data.margin * 2);
    p5.line(
      (i - 1) * segmentWidth + data.margin,
      meta.canvasHeight - data.margin - prevHeight,
      i * segmentWidth + data.margin,
      meta.canvasHeight - data.margin - height
      );

    prevHeight = height;
  }

}

export default DrawLineChart;