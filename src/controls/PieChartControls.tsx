import React, { useState } from "react";
import IconButton from "../components/buttons/iconbutton/IconButton";
import CheckBox from "../components/checkbox/CheckBox";
import ColorPicker from "../components/colorpicker/ColorPicker";
import Accordion from "../components/layout/accordion/Accordion";
import AccordionItem from "../components/layout/accordion/AccordionItem";
import FlexBox from "../components/layout/flexbox/FlexBox";
import FlexContainer from "../components/layout/flexbox/FlexContainer";
import ScrollBox from "../components/layout/scrollbox/ScrollBox";
import { ChartData } from "../types/ChartDataType";
import { Slider } from "@mui/material";

function useForcedUpdate() {
  const [, setValue] = useState(0);
  return () => setValue(value => value + 1);
}

const PieChartControls: React.FC<{ chart: ChartData }> = ({ chart }) => {

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
        </AccordionItem>
        <AccordionItem text="Fill">
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
            </>
          }
          {
            chart.use_multiple_colors &&
            <>
              Color palette
              <FlexContainer>
                {
                  chart.fill_colors.map((v, i) => {
                    return <FlexBox><ColorPicker initialColor={v} onColorPicked={(v: string) => { chart.fill_colors[i] = v }} /></FlexBox>
                  })
                }
                <FlexBox><IconButton onClick={(e: any) => { chart.fill_colors.push("#555555"); forcedUpdate(); }} /></FlexBox>
              </FlexContainer>
            </>
          }
        </AccordionItem>
        <AccordionItem text="Stroke">
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
                max={20}
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
        </AccordionItem>
        <AccordionItem text="Spacing">
          Spacing between slices
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
        </AccordionItem>
      </Accordion>
    </ScrollBox>
  );
}

export default PieChartControls;