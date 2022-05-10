import React from 'react';
import LinkButton from '../components/buttons/linkbutton/LinkButton';
import FlexBox from '../components/layout/flexbox/FlexBox';
import FlexContainer from '../components/layout/flexbox/FlexContainer';
import ListGroupController from '../components/listselector/ListGroupController';
import ListSelectorItem from '../components/listselector/ListSelectorItem';
import { ChartData } from '../types/ChartDataType';
import icon1 from '../assets/typeselect_barchart.png';
import icon2 from '../assets/typeselect_linechart.png';
import icon3 from '../assets/typeselect_piechart.png';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';

const StyleEditor: React.FC<{ chart: ChartData }> = ({ chart }) => {

  const typeGroup = new ListGroupController();
  const styleGroup = new ListGroupController();

  return (
    <>
      <LinkButton to="/editor" startIcon={<NavigateBefore/>}>Back</LinkButton>
      <LinkButton to="/overview" align="bottom" endIcon={<NavigateNext/>}>Next</LinkButton>
      <FlexContainer>
        <FlexBox flexAmount='40%' height='100%'>
          <h3 style={{marginLeft: '20px'}}>Chart type</h3>
          {/* <ScrollBox
            style={{borderRadius: '20px', margin: '20px', height: 'calc(100% - 160px)', scrollbarWidth: 'thin'}}
          > */}
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
            <ListSelectorItem
              group={typeGroup}
              iconSrc={icon1}
              index={3}
              text="3D Bar Chart"
              onSelection={() => chart.type = "3dbar"}
              selected={chart.type === "3dbar"}
            />
          {/* </ScrollBox> */}
        </FlexBox>
        <FlexBox flexAmount='40%' height='100%'>
          <h3 style={{marginLeft: '20px'}}>Chart style template</h3>
          {/* <ScrollBox
            style={{borderRadius: '20px', margin: '20px', height: 'calc(100% - 160px)'}}
          > */}
            <ListSelectorItem
              group={styleGroup}
              iconSrc={icon1}
              index={0}
              text="Default"
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
          {/* </ScrollBox> */}
        </FlexBox>
      </FlexContainer>
    </>
  );
}

export default StyleEditor;