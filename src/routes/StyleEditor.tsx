import React from 'react';
import LinkButton from '../components/buttons/linkbutton/LinkButton';
import FlexBox from '../components/layout/flexbox/FlexBox';
import FlexContainer from '../components/layout/flexbox/FlexContainer';
import ListGroupController from '../components/listselector/ListGroupController';
import ListSelectorItem from '../components/listselector/ListSelectorItem';
import { ChartData } from '../types/ChartDataType';
import icon_type_bar from '../assets/typeselect_barchart.png';
import icon_type_line from '../assets/typeselect_linechart.png';
import icon_type_pie from '../assets/typeselect_piechart.png';
import icon_style_def from '../assets/styleselect_default.png';
import icon_style_dark from '../assets/styleselect_dark.png';
import icon_style_rgb from '../assets/styleselect_rainbow.png';
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
              iconSrc={icon_type_bar}
              index={0}
              text="Bar Chart"
              onSelection={() => chart.type = "bar"}
              selected={chart.type === "bar"}
            />
            <ListSelectorItem
              group={typeGroup}
              iconSrc={icon_type_line}
              index={1}
              text="Line Chart"
              onSelection={() => chart.type = "line"}
              selected={chart.type === "line"}
            />
            <ListSelectorItem
              group={typeGroup}
              iconSrc={icon_type_pie}
              index={2}
              text="Pie Chart"
              onSelection={() => chart.type = "pie"}
              selected={chart.type === "pie"}
            />
            <ListSelectorItem
              group={typeGroup}
              iconSrc={icon_type_bar}
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
              iconSrc={icon_style_def}
              index={0}
              text="Default"
              onSelection={() => {
                chart.background = "#ffffff";
                chart.axis_line_color = "#000000";
                chart.fill_colors.splice(0, chart.fill_colors.length);
                chart.fill_colors.push("#005097");
                chart.fill_colors.push("#007CE9");
                chart.fill_colors.push("#3EA5FF");

              }}
            />
            <ListSelectorItem
              group={styleGroup}
              iconSrc={icon_style_dark}
              index={1}
              text="Dark"
              onSelection={() => {
                chart.background = "#000000";
                chart.axis_line_color = "#ffffff";
                chart.fill_colors.splice(0, chart.fill_colors.length);
                chart.fill_colors.push("#0076DD");
                chart.fill_colors.push("#3FA5FF");
                chart.fill_colors.push("#A2D3FF");
              }}
            />
            <ListSelectorItem
              group={styleGroup}
              iconSrc={icon_style_rgb}
              index={2}
              text="Colorful"
              onSelection={() => {
                chart.background = "#ffffff";
                chart.fill_colors.splice(0, chart.fill_colors.length);
                chart.fill_colors.push("#F70000");
                chart.fill_colors.push("#FF6E00");
                chart.fill_colors.push("#FFFF00");
                chart.fill_colors.push("#1EB41E");
                chart.fill_colors.push("#00D2FF");
                chart.fill_colors.push("#3737C8");
              }}
            />
          {/* </ScrollBox> */}
        </FlexBox>
      </FlexContainer>
    </>
  );
}

export default StyleEditor;