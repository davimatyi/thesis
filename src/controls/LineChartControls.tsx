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

const LineChartControls: React.FC<{ chart: ChartData }> = ({ chart }) => {

  const forcedUpdate = useForcedUpdate();

  return (
    <ScrollBox
    style={{maxHeight: 'calc(100vh - 150px)', margin: '0 20px 0 20px', backgroundColor: "#ddd", borderRadius: "10px", padding: "5px"}}
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
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="panel2a-header"
          aria-controls="panel2a-content"
        >
          Stroke
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
              Stroke color
              <ColorPicker
                initialColor={chart.fill_primary}
                onColorPicked={(v: string) => { chart.fill_primary = v }}
              />
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
                        rightClick={() => { chart.fill_colors.splice(i, 1); forcedUpdate() }}
                      />
                    </FlexBox>
                  })
                }
                <FlexBox><IconButton onClick={(e: any) => { chart.fill_colors.push("#555555"); forcedUpdate(); }} /></FlexBox>
              </FlexContainer>
            </>
          }
          Stroke width
          <Slider
            defaultValue={chart.stroke_width}
            min={1}
            max={20}
            onChange={(_, v) => { chart.stroke_width = Array.isArray(v) ? v[0] : v }}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
      <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            id="panel3a-header"
            aria-controls="panel3a-content"
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
              max={10}
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
            expandIcon={<ExpandMoreIcon/>}
            id="panel4a-header"
            aria-controls="panel4a-content"
          >
            Spacing
          </AccordionSummary>
          <AccordionDetails>
        <CheckBox
          text="Start from 0"
          isChecked={chart.start_from_zero}
          callBack={(v: boolean) => { chart.start_from_zero = v }}
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
    </ScrollBox >
  );
}

export default LineChartControls;