import React from 'react';
import LinkButton from '../components/buttons/linkbutton/LinkButton';
import CheckBox from '../components/checkbox/CheckBox';
import Accordion from '../components/layout/accordion/Accordion';
import AccordionItem from '../components/layout/accordion/AccordionItem';
import FlexBox from '../components/layout/flexbox/FlexBox';
import FlexContainer from '../components/layout/flexbox/FlexContainer';
import ScrollBox from '../components/layout/scrollbox/ScrollBox';
import ChartView from '../rendering/ChartView';
import { defaultChart } from '../types/ChartDataType';

const Overview: React.FC = () => {
  return (
    <>
      Overview
      <LinkButton to="/style">Back</LinkButton>
      <FlexContainer>
        <FlexBox flexAmount='75%'>
          <ChartView data={defaultChart} />
        </FlexBox>
        <FlexBox flexAmount='25%'>
          <ScrollBox>
            <Accordion>
              <AccordionItem text='Accordion 1'>
                <CheckBox 
                  callBack={(v: boolean) => {defaultChart.show_background_grid = v}}
                  isChecked={defaultChart.show_background_grid}
                  text={"Grid"}
                />
                <CheckBox 
                  callBack={(v: boolean) => {defaultChart.show_x_axis = v}}
                  isChecked={defaultChart.show_x_axis}
                  text={"Show x"}
                />
                <CheckBox 
                  callBack={(v: boolean) => {defaultChart.show_y_axis = v}}
                  isChecked={defaultChart.show_y_axis}
                  text={"Show y"}
                />
              </AccordionItem>
            </Accordion>
          </ScrollBox>
        </FlexBox>
      </FlexContainer>
    </>
  );
}

export default Overview;