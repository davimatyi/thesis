import p5Types from 'p5';
import { ChartData } from '../../types/ChartDataType';
import { MetaData } from '../ChartView';
import AbstractRenderer from '../AbstractRenderer';

class BarChartRenderer extends AbstractRenderer {
  draw(p5: p5Types, data: ChartData, meta: MetaData) {

    const flatArr = data.values[0];
    const dataCount = flatArr.length;
    const barWidth = (p5.width - 2 * data.margin) / dataCount * (1 - data.spacing / 100.0);
    const spacing = (p5.width - 2 * data.margin) / dataCount * (data.spacing / 100.0);
    const colorCount = data.fill_colors.length;

    p5.background(data.background);

    p5.translate(-p5.width / 2, -p5.height/2);

    this.drawBackgroundGrid(p5, data, meta);

    if (data.stroke) {
      p5.stroke(data.stroke_color);
      p5.strokeWeight(data.stroke_width);
    } else p5.noStroke();

    for (let i = 0; i < dataCount; i++) {
      if (data.use_multiple_colors)
        p5.fill(data.fill_colors[i % colorCount]);
      else
        p5.fill(data.fill_primary);

      p5.rect(
        data.margin + i * (barWidth + spacing) + spacing / 2,
        (p5.height - data.margin) - (p5.height - 2 * data.margin) * (flatArr[i] / meta.maxValue),
        barWidth,
        (p5.height - 2 * data.margin) * (flatArr[i] / meta.maxValue),
        data.border_radius,
        data.border_radius,
        data.border_radius,
        data.border_radius
      );
      if (data.show_value_labels) {
        p5.push();
        p5.noStroke();
        p5.textSize(14);
        p5.fill(data.axis_line_color);
        p5.textStyle(p5.BOLD);
        p5.translate(
          data.margin + i * (barWidth + spacing) + spacing / 2 + barWidth / 2,
          (p5.height - data.margin) - (p5.height - 2 * data.margin) * (flatArr[i] / meta.maxValue) - 10
        );
        p5.text(flatArr[i], - p5.textWidth(flatArr[i] + "") / 2, 0, 0);
        p5.pop();
      }
    }

    this.drawBarChartAxes(p5, data, meta, barWidth, spacing, dataCount);
    


  }
}
export default BarChartRenderer;