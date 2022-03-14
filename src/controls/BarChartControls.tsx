import React from "react";
import CheckBox from "../components/checkbox/CheckBox";
import Slider from "../components/inputs/slider/Slider";
import TextField from "../components/inputs/TextField";
import Accordion from "../components/layout/accordion/Accordion";
import AccordionItem from "../components/layout/accordion/AccordionItem";
import ScrollBox from "../components/layout/scrollbox/ScrollBox";
import { ChartData } from "../types/ChartDataType";

const BarChartControls: React.FC<{ chart: ChartData }> = ({ chart }) => {
  return (
    <ScrollBox>
      <Accordion>
        <AccordionItem text="Background">
          Background color
          <TextField
            text={chart.background}
            onChange={(v: string) => { chart.background = v }}
          />
          <CheckBox
            callBack={(v: boolean) => { chart.show_background_grid = v }}
            isChecked={chart.show_background_grid}
            text="Show background grid"
          />
        </AccordionItem>
        <AccordionItem text="Colors">
          Primary fill color
          <TextField
            text={chart.background}
            onChange={(v: string) => { chart.background = v }}
          />
          <CheckBox
            callBack={(v: boolean) => { chart.fill_gradient = v }}
            isChecked={chart.fill_gradient}
            text="Use gradient"
          />
          {
            chart.fill_gradient &&
            <>Secondary fill color
              <TextField
                text={chart.background}
                onChange={(v: string) => { chart.background = v }}
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
        <AccordionItem text='Axes'>
          <CheckBox
            callBack={(v: boolean) => { chart.show_x_axis = v }}
            isChecked={chart.show_x_axis}
            text={"Show X axis"}
          />
          <CheckBox
            callBack={(v: boolean) => { chart.show_y_axis = v }}
            isChecked={chart.show_y_axis}
            text={"Show Y axis"}
          />
          Axis line width
          {
            (chart.show_x_axis || chart.show_y_axis) &&
            <Slider
              min={1}
              max={10}
              initialValue={chart.axis_line_width}
              onChange={(v: number) => { chart.axis_line_width = v }}
            />
          }
          Axis line color
          {
            (chart.show_x_axis || chart.show_y_axis) &&
            <TextField
              text={chart.axis_line_color}
              onChange={(v: string) => { chart.axis_line_color = v }}
            />
          }
          Y axis marker frequency
          {
            chart.show_y_axis &&
            <Slider
              min={1}
              max={100}
              initialValue={chart.y_axis_marker_frequency}
              onChange={(v: number) => { chart.y_axis_marker_frequency = v }}
            />
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
          Border radius
          <Slider
            initialValue={chart.border_radius}
            min={0}
            max={99}
            onChange={(val: number) => { chart.border_radius = val }}
          />
        </AccordionItem>
      </Accordion>
    </ScrollBox>
  );
}

export default BarChartControls;