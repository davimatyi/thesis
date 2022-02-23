import p5Types from 'p5';
import { ChartData } from '../../types/ChartDataType';
import { MetaData } from '../ChartView';

const DrawPieChart = (p5: p5Types, data: ChartData, meta: MetaData) =>  {

  const flatArray = data.values.flat();
  const sum = flatArray.reduce((acc, curr) => acc + curr);
  const dataCount = flatArray.length;
  const size = meta.canvasWidth < meta.canvasHeight ? meta.canvasWidth - 2 * data.margin : meta.canvasHeight - 2 * data.margin;
  const colorCount = data.fill_colors.length;

  p5.background(data.background);
  if(data.stroke) {
    p5.stroke(data.stroke_color);
    p5.strokeWeight(data.stroke_width);
  } else p5.noStroke();

  let prevAngle = 0;

  for(let i = 0; i < dataCount; i++) {
    if(data.use_multiple_colors) 
      p5.fill(data.fill_colors[i % colorCount]);
    else
      p5.fill(data.fill_primary);

    const angle = prevAngle + (flatArray[i] / sum) * p5.TWO_PI;
    const separationAngle = prevAngle + (angle - prevAngle) / 2;
    p5.arc(
      meta.canvasWidth / 2 + Math.cos(separationAngle) * data.spacing, 
      meta.canvasHeight / 2 + Math.sin(separationAngle) * data.spacing,
      size,
      size,
      prevAngle,
      angle,
      p5.PIE
    );
    prevAngle = angle;
  }
}

export default DrawPieChart;