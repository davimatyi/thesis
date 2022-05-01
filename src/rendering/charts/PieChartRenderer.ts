import p5Types from 'p5';
import { ChartData } from '../../types/ChartDataType';
import { MetaData } from '../ChartView';
import AbstractRenderer from '../AbstractRenderer';

class PieChartRenderer extends AbstractRenderer {

  draw(p5: p5Types, data: ChartData, meta: MetaData) {

    const flatArray = data.values[0];
    const sum = flatArray.reduce((acc, curr) => acc + curr);
    const dataCount = flatArray.length;
    const size = p5.width < p5.height ? p5.width - 2 * data.margin : p5.height - 2 * data.margin;
    const colorCount = data.fill_colors.length;

    p5.translate(- p5.width / 2, -p5.height/ 2);

    p5.background(data.background);
    if (data.stroke) {
      p5.stroke(data.stroke_color);
      p5.strokeWeight(data.stroke_width);
    } else p5.noStroke();

    let prevAngle = 0;

    for (let i = 0; i < dataCount; i++) {
      if (data.use_multiple_colors)
        p5.fill(data.fill_colors[i % colorCount]);
      else
        p5.fill(data.fill_primary);

      const angle = prevAngle + (flatArray[i] / sum) * p5.TWO_PI;
      const separationAngle = prevAngle + (angle - prevAngle) / 2;
      p5.arc(
        p5.width / 2 + Math.cos(separationAngle) * data.spacing,
        p5.height / 2 + Math.sin(separationAngle) * data.spacing,
        size,
        size,
        prevAngle,
        angle,
        p5.PIE
      );
      prevAngle = angle;
    }
  }
}

export default PieChartRenderer;