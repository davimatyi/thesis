import React from 'react';
import Button from '../components/buttons/button/Button';
import LinkButton from '../components/buttons/linkbutton/LinkButton';
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
                <Button onClick={undefined}>asd</Button>
                <Button onClick={undefined}>asd</Button>
                <Button onClick={undefined}>asd</Button>
                <Button onClick={undefined}>asd</Button>
              </AccordionItem>
            </Accordion>
          </ScrollBox>
        </FlexBox>
      </FlexContainer>
    </>
  );
}

export default Overview;