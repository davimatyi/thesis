import p5Types from 'p5';
import { ChartData } from '../../types/ChartDataType';
import { MetaData } from '../ChartView';
import AbstractRenderer from '../AbstractRenderer';

class LineChartRenderer extends AbstractRenderer {

  draw(p5: p5Types, data: ChartData, meta: MetaData) {

    const flatArr = data.values[0];
    const minValue = data.start_from_zero ? 0 : Math.min(...(data.values.map(arr => Math.min(...arr))));
    const dataCount = flatArr.length;
    const segmentWidth = (p5.width - 2 * data.margin) / dataCount;


    p5.background(data.background);

    this.drawBackgroundGrid(p5, data, meta);

    for (let i = 0; i < data.values.length; i++) {
      if (data.use_multiple_colors)
        p5.stroke(data.fill_colors[i % data.fill_colors.length]);
      else
        p5.stroke(data.fill_primary);

      p5.strokeWeight(data.stroke_width);

      let prevHeight = (data.values[i][0] - minValue) / (meta.maxValue - minValue) * (p5.height - data.margin * 2);
      for (let j = 1; j < dataCount; j++) {
        const height = (data.values[i][j] - minValue) / (meta.maxValue - minValue) * (p5.height - data.margin * 2);
        p5.line(
          (j - 1) * segmentWidth + data.margin + segmentWidth / 2,
          p5.height - data.margin - prevHeight,
          j * segmentWidth + data.margin + segmentWidth / 2,
          p5.height - data.margin - height
        );

        prevHeight = height;
      }
    }

    this.drawLineChartAxes(p5, data, meta, segmentWidth, dataCount, minValue);

  }
}
export default LineChartRenderer;