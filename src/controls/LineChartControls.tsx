import React, { useState } from "react";
import CheckBox from "../components/checkbox/CheckBox";
import ColorPicker from "../components/colorpicker/ColorPicker";
import Slider from "../components/inputs/slider/Slider";
import Accordion from "../components/layout/accordion/Accordion";
import AccordionItem from "../components/layout/accordion/AccordionItem";
import ScrollBox from "../components/layout/scrollbox/ScrollBox";
import { ChartData } from "../types/ChartDataType";

function useForcedUpdate() {
  const [, setValue] = useState(0);
  return () => setValue(value => value + 1);
}

const LineChartControls: React.FC<{ chart: ChartData }> = ({ chart }) => {

  const forcedUpdate = useForcedUpdate();

  return (
    <ScrollBox>
      <Accordion>
        <AccordionItem text="Background">
          Background color
          <ColorPicker
            initialColor={chart.background}
            onColorPicked={(v: string) => { chart.background = v }}
          />
          <CheckBox
            callBack={(v: boolean) => { chart.show_background_grid = v; }}
            isChecked={chart.show_background_grid}
            text="Show background grid"
          />
        </AccordionItem>
        <AccordionItem text="Stroke">
          Stroke color
          <ColorPicker
            initialColor={chart.stroke_color}
            onColorPicked={(v: string) => { chart.stroke_color = v }}
          />
          Stroke width
          <Slider
            initialValue={chart.stroke_width}
            min={1}
            max={20}
            onChange={(val: number) => { chart.stroke_width = val }}
          />
        </AccordionItem>
        <AccordionItem text='Axes'>
          <CheckBox
            callBack={(v: boolean) => { chart.show_x_axis = v }}
            isChecked={chart.show_x_axis}
            text={"Show X axis"}
            onClick={forcedUpdate}
          />
          <CheckBox
            callBack={(v: boolean) => { chart.show_y_axis = v }}
            isChecked={chart.show_y_axis}
            text={"Show Y axis"}
            onClick={forcedUpdate}
          />
          {
            (chart.show_x_axis || chart.show_y_axis) &&
            <>
              Axis line width
              <Slider
                min={1}
                max={10}
                initialValue={chart.axis_line_width}
                onChange={(v: number) => { chart.axis_line_width = v }}
              />
            </>
          }
          {
            (chart.show_x_axis || chart.show_y_axis) &&
            <>
              Axis line color
              <ColorPicker
                initialColor={chart.axis_line_color}
                onColorPicked={(v: string) => { chart.axis_line_color = v }}
              />
            </>
          }
          {
            chart.show_y_axis &&
            <>
              Y axis marker frequency
              <Slider
                min={1}
                max={100}
                initialValue={chart.y_axis_marker_frequency}
                onChange={(v: number) => { chart.y_axis_marker_frequency = v }}
              />
            </>
          }
        </AccordionItem>
        <AccordionItem text="Spacing">
          <CheckBox
            text="Start from 0"
            isChecked={chart.start_from_zero}
            callBack={(v: boolean) => { chart.start_from_zero = v }}
          />
          Margin
          <Slider
            initialValue={chart.margin}
            min={0}
            max={200}
            onChange={(val: number) => { chart.margin = val }}
          />
        </AccordionItem>
      </Accordion>
    </ScrollBox>
  );
}

export default LineChartControls;