import p5Types from 'p5';
import { ChartData } from '../../types/ChartDataType';
import { MetaData } from '../ChartView';

const DrawBarChart = (p5: p5Types, data: ChartData, meta: MetaData) => {

  const flatArr = data.values.flat();
  const maxValue = Math.max(...(data.values.map(arr => Math.max(...arr))));
  const dataCount = flatArr.length;
  const barWidth = (meta.canvasWidth - 2 * data.margin) / dataCount - data.spacing;
  const colorCount = data.fill_colors.length;
  const markerCount = Math.round(maxValue / data.y_axis_marker_frequency);

  p5.background(data.background);

  if (data.show_background_grid) {
    p5.stroke("#cccccc");
    p5.strokeWeight(1);

    for (let i = 0; i < markerCount; i++) {
      p5.line(
        data.margin,
        (meta.canvasHeight - data.margin) - (meta.canvasHeight - 2 * data.margin) * ((i + 1) / markerCount),
        meta.canvasWidth - data.margin,
        (meta.canvasHeight - data.margin) - (meta.canvasHeight - 2 * data.margin) * ((i + 1) / markerCount)
      );
    }
  }

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
      data.margin + i * (barWidth + data.spacing) + data.spacing / 2,
      (meta.canvasHeight - data.margin) - (meta.canvasHeight - 2 * data.margin) * (flatArr[i] / maxValue),
      barWidth,
      (meta.canvasHeight - 2 * data.margin) * (flatArr[i] / maxValue),
      data.border_radius
    );
    if (data.show_value_labels) {
      p5.push();
      p5.noStroke();
      p5.fill(data.axis_line_color);
      p5.textStyle(p5.BOLD);
      p5.translate(
        data.margin + i * (barWidth + data.spacing) + data.spacing / 2 + barWidth / 2,
        (meta.canvasHeight - data.margin) - (meta.canvasHeight - 2 * data.margin) * (flatArr[i] / maxValue) - 10
      );
      p5.text(flatArr[i], - p5.textWidth(flatArr[i] + "") / 2, 0, 0);
      p5.pop();
    }
  }

  if (data.show_x_axis) {
    p5.stroke(data.axis_line_color);
    p5.strokeWeight(data.axis_line_width);

    p5.line(
      data.margin,
      meta.canvasHeight - data.margin,
      meta.canvasWidth - data.margin,
      meta.canvasHeight - data.margin
    );
    for (let i = 0; i < dataCount; i++) {
      p5.line(
        data.margin + i * (barWidth + data.spacing) + barWidth / 2 - data.axis_marker_length + data.spacing / 2,
        meta.canvasHeight - data.margin + data.axis_marker_length,
        data.margin + i * (barWidth + data.spacing) + barWidth / 2 + data.spacing / 2,
        meta.canvasHeight - data.margin
      );
      if (data.x_axis_labels.length > i) {
        p5.push();
        p5.noStroke();
        p5.fill(data.axis_line_color);
        p5.textStyle(p5.BOLD);
        p5.translate(
          data.margin + i * (barWidth + data.spacing) + barWidth / 2 + data.spacing / 2,
          meta.canvasHeight - data.margin
        );
        p5.rotate(p5.radians(-45));
        p5.text(data.x_axis_labels[i], -p5.textWidth(data.x_axis_labels[i]), p5.textSize());
        p5.pop();
      }

    }
  }
  if (data.show_y_axis) {
    p5.stroke(data.axis_line_color);
    p5.strokeWeight(data.axis_line_width);

    p5.line(
      data.margin,
      meta.canvasHeight - data.margin,
      data.margin,
      data.margin - 20
    );
    for (let i = 0; i < markerCount; i++) {
      p5.line(
        data.margin - data.axis_marker_length,
        (meta.canvasHeight - data.margin) - (meta.canvasHeight - 2 * data.margin) * ((i + 1) / markerCount),
        data.margin,
        (meta.canvasHeight - data.margin) - (meta.canvasHeight - 2 * data.margin) * ((i + 1) / markerCount)
      );
      p5.push();
      p5.noStroke();
      p5.fill(data.axis_line_color);
      p5.textStyle(p5.BOLD);
      p5.translate(
        data.margin,
        (meta.canvasHeight - data.margin) - (meta.canvasHeight - 2 * data.margin) * ((i + 1) / markerCount)
      );
      const text = Math.round((i + 1) / markerCount * maxValue * 10) / 10 + "";
      p5.text(text, -p5.textWidth(text) - 10, -5);
      p5.pop();
    }
  }


}

export default DrawBarChart;