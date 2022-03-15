import React from 'react';
import LinkButton from '../components/buttons/linkbutton/LinkButton';
import FlexBox from '../components/layout/flexbox/FlexBox';
import FlexContainer from '../components/layout/flexbox/FlexContainer';
import BarChartControls from '../controls/BarChartControls';
import LineChartControls from '../controls/LineChartControls';
import ChartView from '../rendering/ChartView';
import { ChartData } from '../types/ChartDataType';



const Overview: React.FC<{chart: ChartData}> = ({chart}) => {

  function switchControls() {
    switch(chart.type) {
      case 'bar': return <BarChartControls chart={chart}/>;
      case 'line': return <LineChartControls chart={chart}/>;
    }
  } 

  const fun = switchControls();

  return (
    <>
      Overview
      <LinkButton to="/style">Back</LinkButton>
      <FlexContainer>
        <FlexBox flexAmount='75%'>
          <ChartView data={chart} />
        </FlexBox>
        <FlexBox flexAmount='25%'>
          {
            fun
          }
        </FlexBox>
      </FlexContainer>
    </>
  );
}

export default Overview;