import { ArrowLeftOutlined, SaveAltOutlined, SaveOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import LinkButton from '../components/buttons/linkbutton/LinkButton';
import FlexBox from '../components/layout/flexbox/FlexBox';
import FlexContainer from '../components/layout/flexbox/FlexContainer';
import BarChartControls from '../controls/BarChartControls';
import LineChartControls from '../controls/LineChartControls';
import PieChartControls from '../controls/PieChartControls';
import ChartView from '../rendering/ChartView';
import { ChartData } from '../types/ChartDataType';



const Overview: React.FC<{chart: ChartData}> = ({chart}) => {

  const [fileDownloadUrl, setDownloadUrl] = useState<string>("");
  const saveButton = useRef<HTMLAnchorElement>(null);

  const [doExport, setExport] = useState<{value: boolean}>({value: false});

  function switchControls() {
    switch(chart.type) {
      case 'bar': return <BarChartControls chart={chart}/>;
      case 'line': return <LineChartControls chart={chart}/>;
      case 'pie': return <PieChartControls chart={chart}/>;
    }
  } 

  const fun = switchControls();

  const saveProject = () => {
    const blob = new Blob([JSON.stringify(chart)]);
    const downloadUrl = URL.createObjectURL(blob);
    setDownloadUrl(downloadUrl);
  }
  
  useEffect(() => {
    if(fileDownloadUrl !== "") {
      console.log(fileDownloadUrl);
      saveButton.current?.click();
      URL.revokeObjectURL(fileDownloadUrl);
      setDownloadUrl("");
    }
  }, [fileDownloadUrl]);

  return (
    <>
      <LinkButton to="/style" startIcon={<ArrowLeftOutlined/>}>Back</LinkButton>
      <FlexContainer>
        <FlexBox flexAmount='65%' height='80vh'>
          <ChartView data={chart} doExport={doExport} />
        </FlexBox>
        <FlexBox flexAmount='35%' height='80vh'>
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
              <a 
                style={{display: 'none'}}
                download={"file.json"}
                href={fileDownloadUrl}
                ref={saveButton}
              >save</a>
            </FlexBox>
            <FlexBox>
              <Button
                onClick={() => setExport({value: true})}
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