import React, { useState } from "react";
import IconButton from "../components/buttons/iconbutton/IconButton";
import CheckBox from "../components/checkbox/CheckBox";
import ColorPicker from "../components/colorpicker/ColorPicker";
import FlexBox from "../components/layout/flexbox/FlexBox";
import FlexContainer from "../components/layout/flexbox/FlexContainer";
import ScrollBox from "../components/layout/scrollbox/ScrollBox";
import { ChartData } from "../types/ChartDataType";
import { Slider } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function useForcedUpdate() {
  const [, setValue] = useState(0);
  return () => setValue(value => value + 1);
}

const BarChartControls: React.FC<{ chart: ChartData, backgroundSetter: Function }> = ({ chart, backgroundSetter }) => {

  const forcedUpdate = useForcedUpdate();

  return (
    <ScrollBox
      style={{
        maxHeight: 'calc(100vh - 180px)',
        margin: '0 20px 0 20px',
        backgroundColor: "#ddd",
        borderRadius: "10px",
        padding: "10px",
        boxShadow: "inset 0 0 5px #777"
      }}
    >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="panel1a-header"
          aria-controls="panel1a-content"
        >
          Background
        </AccordionSummary>
        <AccordionDetails>
          Background Color
          <ColorPicker
            initialColor={chart.background}
            onColorPicked={(v: string) => { chart.background = v; backgroundSetter(v) }}
          />
          <CheckBox
            callBack={(v: boolean) => { chart.show_background_grid = v; }}
            isChecked={chart.show_background_grid}
            text="Show background grid"
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="panel2a-header"
          aria-controls="panel2a-content"
        >
          Fill
        </AccordionSummary>
        <AccordionDetails>
          <CheckBox
            callBack={(v: boolean) => { chart.use_multiple_colors = v }}
            isChecked={chart.use_multiple_colors}
            text="Use alternating colors"
            onClick={forcedUpdate}
          />
          {
            !chart.use_multiple_colors &&
            <>
              Primary fill color
              <ColorPicker
                initialColor={chart.fill_primary}
                onColorPicked={(v: string) => { chart.fill_primary = v }}
              />
              <CheckBox
                callBack={(v: boolean) => { chart.fill_gradient = v }}
                isChecked={chart.fill_gradient}
                text="Use gradient"
                onClick={forcedUpdate}
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
            </>
          }
          {
            chart.use_multiple_colors &&
            <>
              Color palette
              <FlexContainer>
                {
                  chart.fill_colors.map((v, i) => {
                    return <FlexBox key={i}>
                      <ColorPicker
                        initialColor={v}
                        onColorPicked={(v: string) => { chart.fill_colors[i] = v }}
                        rightClick={() => { 
                          if(chart.fill_colors.length > 1) chart.fill_colors.splice(i, 1); forcedUpdate() 
                        }}
                      />
                    </FlexBox>
                  })
                }
                <FlexBox><IconButton onClick={(e: any) => { chart.fill_colors.push("#555555"); forcedUpdate(); }} /></FlexBox>
              </FlexContainer>
            </>
          }
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="panel3a-header"
          aria-controls="panel3a-content"
        >
          Stroke
        </AccordionSummary>
        <AccordionDetails>
          {/* Border radius
          <Slider
            defaultValue={chart.border_radius}
            min={0}
            max={99}
            onChange={(_, v) => { chart.border_radius = Array.isArray(v) ? v[0] : v }}
          /> */}
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
                defaultValue={chart.stroke_width}
                min={1}
                max={5}
                onChange={(_, v) => { chart.stroke_width = Array.isArray(v) ? v[0] : v }}
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
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="panel4a-header"
          aria-controls="panel4a-content"
        >
          Axes
        </AccordionSummary>
        <AccordionDetails>
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
                max={5}
                defaultValue={chart.axis_line_width}
                onChange={(_, v) => { chart.axis_line_width = Array.isArray(v) ? v[0] : v }}
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
                defaultValue={chart.y_axis_marker_frequency}
                onChange={(_, v) => { chart.y_axis_marker_frequency = Array.isArray(v) ? v[0] : v }}
              />
            </>
          }
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="panel5a-header"
          aria-controls="panel5a-content"
        >
          Spacing
        </AccordionSummary>
        <AccordionDetails>
          Spacing between bars
          <Slider
            defaultValue={chart.spacing}
            min={0}
            max={99}
            onChange={(_, v) => { chart.spacing = Array.isArray(v) ? v[0] : v }}
          />
          Margin
          <Slider
            defaultValue={chart.margin}
            min={0}
            max={200}
            onChange={(_, v) => { chart.margin = Array.isArray(v) ? v[0] : v }}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="panel6a-header"
          aria-controls="panel6a-content"
        >
          Details
        </AccordionSummary>
        <AccordionDetails>
          <CheckBox
            callBack={(v: boolean) => { chart.show_value_labels = v }}
            isChecked={chart.show_value_labels}
            text={"Show value labels"}
            onClick={forcedUpdate}
          />
        </AccordionDetails>
      </Accordion>
    </ScrollBox>
  );
}

export default BarChartControls;