import p5Types from 'p5';
import { ChartData } from '../../types/ChartDataType';
import { MetaData } from '../ChartView';
import AbstractRenderer from '../AbstractRenderer';

class BarChart3DRenderer extends AbstractRenderer {
  draw(p5: p5Types, data: ChartData, meta: MetaData) {

    /*
                      |  y
                      |
                      |
                      |
                      _________ x
                     /  
                   /
                 / z
    */

    const gridSize = 10.0;
    const zsize = data.values.length * gridSize;
    const xsize = data.values[0].length * gridSize;
    const ysize = xsize > zsize ? xsize : zsize;
    const barwidth = (100 - data.spacing) / gridSize;
    const colorCount = data.fill_colors.length;

    p5.background(data.background);


    p5.camera(
      p5.cos(data.perspective_xangle) * (data.perspective_distance + ysize / 2) * p5.sin(data.perspective_yangle),
      -ysize / 2 - data.perspective_distance * p5.cos(data.perspective_yangle),
      p5.sin(data.perspective_xangle) * (data.perspective_distance + ysize / 2) * p5.sin(data.perspective_yangle),
      0,
      -ysize / 2,
      0
    );

    p5.translate(- xsize / 2, data.perspective_yoffset * ysize, zsize / 2);

    if (data.show_background_grid) {
      p5.push();

      const markerCount = Math.round(meta.maxValue * (data.y_axis_marker_frequency / 100.0));
      p5.stroke("#cccccc");
      p5.strokeWeight(1);

      for (let i = 0; i < markerCount; i++) {
        p5.line(
          -gridSize / 2,
          -ysize * ((i + 1) / markerCount),
          0,
          -gridSize / 2,
          -ysize * ((i + 1) / markerCount),
          - zsize - gridSize / 2
        );
        p5.line(
          -gridSize / 2,
          -ysize * ((i + 1) / markerCount),
          - zsize - gridSize / 2,
          -gridSize / 2 + xsize + gridSize,
          -ysize * ((i + 1) / markerCount),
          - zsize - gridSize / 2
        );
      }
      p5.pop();
    }

    
    for (let i = 0; i < data.values.length; i++) {
      if (data.use_multiple_colors)
        p5.fill(data.fill_colors[i % colorCount]);
      else
        p5.fill(data.fill_primary);
  
      if (data.stroke) {
        p5.stroke(data.stroke_color);
        p5.strokeWeight(data.stroke_width);
      } else p5.noStroke();

      for (let j = 0; j < data.values[i].length; j++) {
        p5.push();
        p5.translate(j * gridSize + gridSize / 2, - ysize * (data.values[i][j] / meta.maxValue) / 2, - i * gridSize - gridSize / 2);
        p5.box(barwidth, ysize * ((data.values[i][j] < 0 ? 0.001 : data.values[i][j]) / meta.maxValue), barwidth);
        p5.pop();
      }
    }

    if (data.show_x_axis) {
      p5.push();
      p5.fill(data.axis_line_color);
      p5.stroke(data.axis_line_color);
      p5.strokeWeight(data.axis_line_width);
      p5.line(-gridSize / 2, 0, 0, -gridSize / 2, 0, - zsize - gridSize / 2);
      p5.line(-gridSize / 2, 0, - zsize - gridSize / 2, -gridSize / 2 + xsize + gridSize, 0, - zsize - gridSize / 2);
      p5.pop();
      for(let i = 0; i < data.x_axis_labels.length; i++) {
        p5.push();
        p5.noStroke();
        p5.fill(data.axis_line_color);
        p5.textStyle(p5.BOLD);
        p5.textSize(2);
        p5.translate(i * gridSize + gridSize / 2 , 0, gridSize / 2);
        p5.rotateX(Math.PI / 2);
        p5.text(data.x_axis_labels[i], -p5.textWidth(data.x_axis_labels[i]) / 2, 0);
        p5.pop();
      }
      for(let i = 0; i < data.y_axis_labels.length; i++) {
        p5.push();
        p5.noStroke();
        p5.fill(data.axis_line_color);
        p5.textStyle(p5.BOLD);
        p5.textSize(2);
        p5.translate(xsize + gridSize / 2, 0, - (i + 1) * gridSize + gridSize / 2);
        p5.rotateX(Math.PI / 2);
        p5.text(data.y_axis_labels[i+1], 0, 0);
        p5.pop();
      }
    }

    if (data.show_y_axis) {
      p5.push();
      p5.fill(data.axis_line_color);
      p5.stroke(data.axis_line_color);
      p5.strokeWeight(data.axis_line_width);
      p5.line(-gridSize / 2, 0, -zsize - gridSize / 2, -gridSize / 2, -ysize, -zsize - gridSize / 2);
      p5.pop();
      const markerCount = Math.round(meta.maxValue * (data.y_axis_marker_frequency / 100.0));
      for(let i = 0; i <= markerCount; i++) {
        p5.push();
        p5.noStroke();
        p5.fill(data.axis_line_color);
        p5.textStyle(p5.BOLD);
        p5.textSize(2);
        p5.translate(-gridSize / 2,  -ysize * (i / markerCount), 0);
        const text = Math.round((i / markerCount * (meta.maxValue)) * 10) / 10 + "";
        p5.text(text, -p5.textWidth(text), 0);
        p5.pop();
      }
    }

    if(data.show_value_labels) {
      for(let i = 0; i < data.values.length; i++) {
        for (let j = 0; j < data.values[i].length; j++) {
          p5.push();
          p5.stroke("#fff")
          p5.fill(data.axis_line_color);
          p5.textStyle(p5.ITALIC);
          p5.textSize(2);
          p5.translate(j * gridSize + gridSize / 2, - ysize * (data.values[i][j] / meta.maxValue) - 1, - i * gridSize - gridSize / 2);
          p5.text(data.values[i][j], -p5.textWidth(data.values[i][j]+"") / 2, 0);
          p5.pop();
        }
      }
    }

  }
}

export default BarChart3DRenderer;