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

const BarChartControls: React.FC<{ chart: ChartData }> = ({ chart }) => {

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
        <AccordionItem text="Fill">
          Primary fill color
          <ColorPicker
            initialColor={chart.fill_primary}
            onColorPicked={(v: string) => { chart.fill_primary = v }}
          />
          <CheckBox
            callBack={(v: boolean) => { chart.fill_gradient = v }}
            isChecked={chart.fill_gradient}
            text="Use gradient"
          />
          {
            chart.fill_gradient &&
            <>
              Secondary fill color
              <ColorPicker
                initialColor={chart.fill_secondary}
                onColorPicked={(v: string) => { chart.fill_secondary = v }}
              />
            </>
          }
          <CheckBox
            callBack={(v: boolean) => { chart.use_multiple_colors = v }}
            isChecked={chart.use_multiple_colors}
            text="Use alternating colors"
          />
          {/* TODO implement color picker and color array */}
        </AccordionItem>
        <AccordionItem text="Stroke">
          Border radius
          <Slider
            initialValue={chart.border_radius}
            min={0}
            max={99}
            onChange={(val: number) => { chart.border_radius = val }}
          />
          <CheckBox
            text="Stroke"
            isChecked={chart.stroke}
            callBack={(v: boolean) => { chart.stroke = v }}
            onClick={forcedUpdate}
          />
          {
            chart.stroke &&
            <>
              Stroke width
              <Slider
                initialValue={chart.stroke_width}
                min={1}
                max={20}
                onChange={(val: number) => { chart.stroke_width = val }}
              />
            </>
          }
          {
            chart.stroke &&
            <>
              Stroke color
              <ColorPicker
                initialColor={chart.stroke_color}
                onColorPicked={(v: string) => { chart.stroke_color = v }}
              />
            </>
          }
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
          Spacing between bars
          <Slider
            initialValue={chart.spacing}
            min={0}
            max={99}
            onChange={(val: number) => { chart.spacing = val }}
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

export default BarChartControls;