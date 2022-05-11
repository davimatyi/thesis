import p5Types from 'p5';
import { ChartData } from '../types/ChartDataType';
import { MetaData } from './ChartView';

abstract class AbstractRenderer {

  drawBarChartAxes(p5: p5Types, data: ChartData, meta: MetaData, barWidth: number, spacing: number, dataCount: number) {
    const markerCount = Math.round(meta.maxValue * (data.y_axis_marker_frequency / 100.0));

    if (data.show_x_axis) {
      p5.stroke(data.axis_line_color);
      p5.strokeWeight(data.axis_line_width);

      p5.line(
        data.margin,
        p5.height - data.margin,
        p5.width - data.margin,
        p5.height - data.margin
      );
      for (let i = 0; i < dataCount; i++) {
        p5.line(
          data.margin + i * (barWidth + spacing) + barWidth / 2 - data.axis_marker_length + spacing / 2,
          p5.height - data.margin + data.axis_marker_length,
          data.margin + i * (barWidth + spacing) + barWidth / 2 + spacing / 2,
          p5.height - data.margin
        );
        if (data.x_axis_labels.length > i) {
          p5.push();
          p5.noStroke();
          p5.textSize(14);
          p5.fill(data.axis_line_color);
          p5.textStyle(p5.BOLD);
          p5.translate(
            data.margin + i * (barWidth + spacing) + barWidth / 2 + spacing / 2,
            p5.height - data.margin
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
        p5.height - data.margin,
        data.margin,
        data.margin - 20
      );
      for (let i = 0; i < markerCount; i++) {
        p5.line(
          data.margin - data.axis_marker_length,
          (p5.height - data.margin) - (p5.height - 2 * data.margin) * ((i + 1) / markerCount),
          data.margin,
          (p5.height - data.margin) - (p5.height - 2 * data.margin) * ((i + 1) / markerCount)
        );
        p5.push();
        p5.noStroke();
        p5.textSize(14);
        p5.fill(data.axis_line_color);
        p5.textStyle(p5.BOLD);
        p5.translate(
          data.margin,
          (p5.height - data.margin) - (p5.height - 2 * data.margin) * ((i + 1) / markerCount)
        );
        const text = Math.round((i + 1) / markerCount * meta.maxValue * 10) / 10 + "";
        p5.text(text, -p5.textWidth(text) - 10, -5);
        p5.pop();
      }
    }
  }

  drawLineChartAxes(p5: p5Types, data: ChartData, meta: MetaData, segmentWidth: number, dataCount: number, minValue: number) {
    
    const markerCount = Math.round(meta.maxValue * (data.y_axis_marker_frequency / 100.0));

    if (data.show_x_axis) {
      p5.stroke(data.axis_line_color);
      p5.strokeWeight(data.axis_line_width);

      p5.line(
        data.margin,
        p5.height - data.margin,
        p5.width - data.margin,
        p5.height - data.margin
      );
      for (let i = 0; i < dataCount; i++) {
        p5.line(
          data.margin + i * (segmentWidth) + segmentWidth / 2 - data.axis_marker_length,
          p5.height - data.margin + data.axis_marker_length,
          data.margin + i * (segmentWidth) + segmentWidth / 2,
          p5.height - data.margin
        );

        if (data.x_axis_labels.length > i) {
          p5.push();
          p5.noStroke();
          p5.textSize(14);
          p5.fill(data.axis_line_color);
          p5.textStyle(p5.BOLD);
          p5.translate(
            data.margin + i * (segmentWidth) + segmentWidth / 2,
            p5.height - data.margin
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
        p5.height - data.margin,
        data.margin,
        data.margin - 20
      );
      for (let i = 0; i <= markerCount; i++) {
        p5.line(
          data.margin - data.axis_marker_length,
          (p5.height - data.margin) - (p5.height - 2 * data.margin) * (i / markerCount),
          data.margin,
          (p5.height - data.margin) - (p5.height - 2 * data.margin) * (i / markerCount)
        );
        p5.push();
        p5.noStroke();
        p5.textSize(14);
        p5.fill(data.axis_line_color);
        p5.textStyle(p5.BOLD);
        p5.translate(
          data.margin,
          (p5.height - data.margin) - (p5.height - 2 * data.margin) * (i / markerCount)
        );
        const text = Math.round((minValue + i / markerCount * (meta.maxValue - minValue)) * 10) / 10 + "";
        p5.text(text, -p5.textWidth(text) - 10, -5);
        p5.pop();
      }
    }
  }

  drawBackgroundGrid(p5: p5Types, data: ChartData, meta: MetaData) {
    if (!data.show_background_grid)
      return;

    const markerCount = Math.round(meta.maxValue * (data.y_axis_marker_frequency / 100.0));

    p5.stroke("#cccccc");
    p5.strokeWeight(1);

    p5.push();
    p5.translate(0, 0, -1);

    for (let i = 0; i < markerCount; i++) {
      p5.line(
        data.margin,
        (p5.height - data.margin) - (p5.height - 2 * data.margin) * ((i + 1) / markerCount),
        p5.width - data.margin,
        (p5.height - data.margin) - (p5.height - 2 * data.margin) * ((i + 1) / markerCount)
      );
    }
    p5.pop();
  }


}

export default AbstractRenderer;