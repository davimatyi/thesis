import p5Types from 'p5';
import { ChartData } from '../../types/ChartDataType';
import { MetaData } from '../ChartView';
import AbstractRenderer from '../AbstractRenderer';

class BarChart3DRenderer extends AbstractRenderer {
  draw(p5: p5Types, data: ChartData, meta: MetaData) {
    
    // const dataCount = data.values.flat().length;

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

    p5.translate(- xsize / 2, 0, zsize / 2);

    if(data.show_x_axis) {
      p5.push();
      p5.fill(data.axis_line_color);
      p5.stroke(data.axis_line_color);
      p5.strokeWeight(data.axis_line_width);
      p5.line(-gridSize / 2, 0, 0, -gridSize / 2, 0, - zsize - gridSize / 2);
      p5.line(-gridSize / 2, 0, - zsize - gridSize / 2, -gridSize / 2 + xsize + gridSize, 0, - zsize - gridSize / 2);
      p5.pop();
    }

    if(data.show_y_axis) {
      p5.push();
      p5.fill(data.axis_line_color);
      p5.stroke(data.axis_line_color);
      p5.strokeWeight(data.axis_line_width);
      p5.line(-gridSize / 2, 0, -zsize - gridSize / 2, -gridSize / 2, -ysize, -zsize - gridSize / 2);
      p5.pop();
    }

    if(data.show_background_grid) {
      p5.push();



      p5.pop();
    }

    for (let i = 0; i < data.values.length; i++) {
      if (data.use_multiple_colors)
        p5.fill(data.fill_colors[i % colorCount]);
      else
        p5.fill(data.fill_primary);

      for(let j = 0; j < data.values[i].length; j++) {
        p5.push();
        p5.translate(j * gridSize + gridSize / 2, - ysize * (data.values[i][j] / meta.maxValue) / 2, - i * gridSize - gridSize / 2);
        p5.box(barwidth, ysize * (data.values[i][j] / meta.maxValue), barwidth);
        p5.pop();
      }
    }

  }
}

export default BarChart3DRenderer;