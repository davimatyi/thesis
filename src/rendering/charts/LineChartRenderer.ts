import p5Types from 'p5';
import { ChartData } from '../../types/ChartDataType';
import { MetaData } from '../ChartView';
import AbstractRenderer from './AbstractRenderer';

class LineChartRenderer extends AbstractRenderer {

  draw(p5: p5Types, data: ChartData, meta: MetaData) {

    const flatArr = data.values.flat();
    const minValue = data.start_from_zero ? 0 : Math.min(...(data.values.map(arr => Math.min(...arr))));
    const dataCount = flatArr.length;
    const segmentWidth = (meta.canvasWidth - 2 * data.margin) / dataCount;
    

    p5.background(data.background);

    this.drawBackgroundGrid(p5, data, meta);

    p5.stroke(data.stroke_color);
    p5.strokeWeight(data.stroke_width);

    let prevHeight = (flatArr[0] - minValue) / (meta.maxValue - minValue) * (meta.canvasHeight - data.margin * 2);

    for (let i = 1; i < dataCount; i++) {
      const height = (flatArr[i] - minValue) / (meta.maxValue - minValue) * (meta.canvasHeight - data.margin * 2);
      p5.line(
        (i - 1) * segmentWidth + data.margin + segmentWidth / 2,
        meta.canvasHeight - data.margin - prevHeight,
        i * segmentWidth + data.margin + segmentWidth / 2,
        meta.canvasHeight - data.margin - height
      );

      prevHeight = height;
    }

    this.drawLineChartAxes(p5, data, meta, segmentWidth, dataCount, minValue);

  }
}
export default LineChartRenderer;