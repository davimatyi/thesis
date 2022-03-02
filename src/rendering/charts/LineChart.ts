import p5Types from 'p5';
import { ChartData } from '../../types/ChartDataType';
import { MetaData } from '../ChartView';

const DrawLineChart = (p5: p5Types, data: ChartData, meta: MetaData) => {

  const flatArr = data.values.flat();
  const maxValue = Math.max(...(data.values.map(arr => Math.max(...arr))));
  const minValue = data.start_from_zero ? 0 : Math.min(...(data.values.map(arr => Math.min(...arr))));
  const dataCount = flatArr.length;
  const segmentWidth = (meta.canvasWidth - 2 * data.margin) / dataCount;
  const markerCount = Math.round((maxValue - minValue) / data.y_axis_marker_frequency);

  p5.background(data.background);
  p5.stroke(data.stroke_color);
  p5.strokeWeight(data.stroke_width);

  let prevHeight = (flatArr[0] - minValue) / (maxValue - minValue) * (meta.canvasHeight - data.margin * 2);

  for(let i = 1; i < dataCount; i++) {
    const height = (flatArr[i] - minValue) / (maxValue - minValue) * (meta.canvasHeight - data.margin * 2);
    p5.line(
      (i - 1) * segmentWidth + data.margin + segmentWidth / 2,
      meta.canvasHeight - data.margin - prevHeight,
      i * segmentWidth + data.margin + segmentWidth / 2,
      meta.canvasHeight - data.margin - height
      );

    prevHeight = height;
  }

  if(data.show_x_axis) {
    p5.stroke(data.axis_line_color);
    p5.strokeWeight(data.axis_line_width);

    p5.line(
      data.margin, 
      meta.canvasHeight - data.margin, 
      meta.canvasWidth - data.margin, 
      meta.canvasHeight - data.margin
    );
    for(let i = 0; i < dataCount; i++) {
      p5.line(
        data.margin + i * (segmentWidth) + segmentWidth / 2 - data.axis_marker_length ,
        meta.canvasHeight - data.margin + data.axis_marker_length,
        data.margin + i * (segmentWidth) + segmentWidth / 2,
        meta.canvasHeight - data.margin
      );
    }
  }
  if(data.show_y_axis) {
    p5.stroke(data.axis_line_color);
    p5.strokeWeight(data.axis_line_width);

    p5.line(
      data.margin, 
      meta.canvasHeight - data.margin, 
      data.margin, 
      data.margin - 20
    );
    for(let i = 0; i <= markerCount; i++) {
      p5.line(
        data.margin - data.axis_marker_length,
        (meta.canvasHeight - data.margin) - (meta.canvasHeight - 2 * data.margin) * (i / markerCount),
        data.margin,
        (meta.canvasHeight - data.margin) - (meta.canvasHeight - 2 * data.margin) * (i / markerCount)
      )
    }
  }

}

export default DrawLineChart;