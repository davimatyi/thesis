import { ArrowLeftOutlined, SaveAltOutlined, SaveOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';
import LinkButton from '../components/buttons/linkbutton/LinkButton';
import FlexBox from '../components/layout/flexbox/FlexBox';
import FlexContainer from '../components/layout/flexbox/FlexContainer';
import BarChartControls from '../controls/BarChartControls';
import LineChartControls from '../controls/LineChartControls';
import PieChartControls from '../controls/PieChartControls';
import ChartView from '../rendering/ChartView';
import { ChartData } from '../types/ChartDataType';



const Overview: React.FC<{chart: ChartData}> = ({chart}) => {

  function switchControls() {
    switch(chart.type) {
      case 'bar': return <BarChartControls chart={chart}/>;
      case 'line': return <LineChartControls chart={chart}/>;
      case 'pie': return <PieChartControls chart={chart}/>;
    }
  } 

  const fun = switchControls();

  const saveProject = () => {
    // const { remote } = require('electron').remote;
    // const mainProcess = remote.require('./main.ts');
    // var electronFS = remote.require('fs');
    // electronFS.writeFile("./project.json", JSON.stringify(chart), (e: any) => {
    //   if(e) alert(e);
    // });
    // mainProcess.saveFile("./project.json", JSON.stringify(chart));
  }

  return (
    <>
      <LinkButton to="/style" startIcon={<ArrowLeftOutlined/>}>Back</LinkButton>
      <FlexContainer>
        <FlexBox flexAmount='65%' height='0.8vw'>
          <ChartView data={chart} />
        </FlexBox>
        <FlexBox flexAmount='35%' height='0.8vh'>
          {
            fun
          }
          <FlexContainer>
            <FlexBox>
              <Button
                onClick={saveProject}
                style={{fontSize: '20px', position: 'absolute', bottom: '10px', right: '180px'}} 
                variant='contained'
                endIcon={<SaveOutlined/>}
              >
                Save
              </Button>
            </FlexBox>
            <FlexBox>
              <Button
                // onClick={saveProject}
                style={{fontSize: '20px', position: 'absolute', bottom: '10px', right: '30px'}} 
                variant='contained'
                endIcon={<SaveAltOutlined/>}
              >
                Export
              </Button>
            </FlexBox>
          </FlexContainer>

        </FlexBox>
      </FlexContainer>
      
    </>
  );
}

export default Overview;