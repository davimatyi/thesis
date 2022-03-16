import React from 'react';
import LinkButton from '../components/buttons/linkbutton/LinkButton';
import FlexBox from '../components/layout/flexbox/FlexBox';
import FlexContainer from '../components/layout/flexbox/FlexContainer';
import ScrollBox from '../components/layout/scrollbox/ScrollBox';
import ListGroupController from '../components/listselector/ListGroupController';
import ListSelectorItem from '../components/listselector/ListSelectorItem';
import { ChartData } from '../types/ChartDataType';
import icon from '../assets/placeholder.png';

const StyleEditor: React.FC<{ chart: ChartData }> = ({ chart }) => {

  const controller = new ListGroupController();

  return (
    <>
      Style
      <LinkButton to="/editor">Back</LinkButton>
      <LinkButton to="/overview">Next</LinkButton>
      <FlexContainer>
        <FlexBox>
          <ScrollBox>
            <ListSelectorItem
              group={controller}
              iconSrc={icon}
              index={0}
              text="Bar Chart"
              onSelection={() => chart.type = "bar"}
              selected={chart.type === "bar"}
            />
            <ListSelectorItem
              group={controller}
              iconSrc={icon}
              index={1}
              text="Line Chart"
              onSelection={() => chart.type = "line"}
              selected={chart.type === "line"}
            />
            <ListSelectorItem
              group={controller}
              iconSrc={icon}
              index={2}
              text="Pie Chart"
              onSelection={() => chart.type = "pie"}
              selected={chart.type === "pie"}
            />
          </ScrollBox>
        </FlexBox>
      </FlexContainer>
    </>
  );
}

export default StyleEditor;