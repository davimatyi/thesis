import React from 'react';
import LinkButton from '../components/buttons/linkbutton/LinkButton';
import FlexBox from '../components/layout/flexbox/FlexBox';
import FlexContainer from '../components/layout/flexbox/FlexContainer';
import ScrollBox from '../components/layout/scrollbox/ScrollBox';
import ListGroupController from '../components/listselector/ListGroupController';
import ListSelectorItem from '../components/listselector/ListSelectorItem';
import { ChartData } from '../types/ChartDataType';
import icon1 from '../assets/typeselect_barchart.png';
import icon2 from '../assets/typeselect_linechart.png';
import icon3 from '../assets/typeselect_piechart.png';

const StyleEditor: React.FC<{ chart: ChartData }> = ({ chart }) => {

  const typeGroup = new ListGroupController();
  const styleGroup = new ListGroupController();

  return (
    <>
      <h2>Style</h2>
      <LinkButton to="/editor">Back</LinkButton>
      <LinkButton to="/overview">Next</LinkButton>
      <FlexContainer>
        <FlexBox flexAmount='50%'>
          <ScrollBox>
            <ListSelectorItem
              group={typeGroup}
              iconSrc={icon1}
              index={0}
              text="Bar Chart"
              onSelection={() => chart.type = "bar"}
              selected={chart.type === "bar"}
            />
            <ListSelectorItem
              group={typeGroup}
              iconSrc={icon2}
              index={1}
              text="Line Chart"
              onSelection={() => chart.type = "line"}
              selected={chart.type === "line"}
            />
            <ListSelectorItem
              group={typeGroup}
              iconSrc={icon3}
              index={2}
              text="Pie Chart"
              onSelection={() => chart.type = "pie"}
              selected={chart.type === "pie"}
            />
          </ScrollBox>
        </FlexBox>
        <FlexBox flexAmount='50%'>
          <ScrollBox>
            <ListSelectorItem
              group={styleGroup}
              iconSrc={icon1}
              index={0}
              text="Classic"
              onSelection={() => {

              }}
            />
            <ListSelectorItem
              group={styleGroup}
              iconSrc={icon1}
              index={1}
              text="Classic"
              onSelection={() => {
                
              }}
            />
            <ListSelectorItem
              group={styleGroup}
              iconSrc={icon1}
              index={2}
              text="Classic"
              onSelection={() => {
                
              }}
            />
          </ScrollBox>
        </FlexBox>
      </FlexContainer>
    </>
  );
}

export default StyleEditor;