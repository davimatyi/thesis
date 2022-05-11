import { NavigateBefore, SaveAltOutlined, SaveOutlined } from '@mui/icons-material';
import { Button, Menu, MenuItem } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import LinkButton from '../components/buttons/linkbutton/LinkButton';
import FlexBox from '../components/layout/flexbox/FlexBox';
import FlexContainer from '../components/layout/flexbox/FlexContainer';
import BarChart3DControls from '../controls/BarChart3DControls';
import BarChartControls from '../controls/BarChartControls';
import LineChartControls from '../controls/LineChartControls';
import PieChartControls from '../controls/PieChartControls';
import ChartView from '../rendering/ChartView';
import { ChartData } from '../types/ChartDataType';



const Overview: React.FC<{ chart: ChartData, prevFilesList: { name: string, path: string }[] }> = ({ chart, prevFilesList }) => {

  const [fileDownloadUrl, setDownloadUrl] = useState<string>("");
  const saveButton = useRef<HTMLAnchorElement>(null);
  const [backgroundColor, setBackground] = useState<string>(chart.background);

  const [doExport, setExport] = useState<{ value: boolean, fileType: string }>({ value: false, fileType: "png" });

  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
  const exportOpen = Boolean(anchor);
  const handleExportClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchor(e.currentTarget);
  }
  const handleExportClose = () => {
    setAnchor(null);
  }

  function switchControls() {
    switch (chart.type) {
      case 'bar': return <BarChartControls chart={chart} backgroundSetter={setBackground} />;
      case 'line': return <LineChartControls chart={chart} backgroundSetter={setBackground} />;
      case 'pie': return <PieChartControls chart={chart} backgroundSetter={setBackground} />;
      case '3dbar': return <BarChart3DControls chart={chart} backgroundSetter={setBackground} />;
    }
  }

  const fun = switchControls();

  const saveProject = () => {
    const blob = new Blob([JSON.stringify(chart)]);
    const downloadUrl = URL.createObjectURL(blob);
    setDownloadUrl(downloadUrl);
  }

  useEffect(() => {
    if (fileDownloadUrl !== "") {
      console.log(fileDownloadUrl);
      saveButton.current?.click();
      URL.revokeObjectURL(fileDownloadUrl);
      setDownloadUrl("");
    }
  }, [fileDownloadUrl]);

  return (
    <div style={{width: "100%", height: "100vh", background: backgroundColor }}>
      <LinkButton to="/style" startIcon={<NavigateBefore />}>Back</LinkButton>
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
                style={{ fontSize: '20px', position: 'absolute', bottom: '10px', right: '180px' }}
                variant='contained'
                startIcon={<SaveOutlined />}
              >
                Save
              </Button>
              <a
                style={{ display: 'none' }}
                download={"file.json"}
                href={fileDownloadUrl}
                ref={saveButton}
              >save</a>
            </FlexBox>
            <FlexBox>
              <Button
                id="export-button"
                onClick={handleExportClick}
                style={{ fontSize: '20px', position: 'absolute', bottom: '10px', right: '30px' }}
                variant='contained'
                startIcon={<SaveAltOutlined />}
                aria-controls={exportOpen ? 'export-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={exportOpen ? 'true' : undefined}
              >
                Export
              </Button>
              <Menu
                id="export-menu"
                anchorEl={anchor}
                open={exportOpen}
                onClose={handleExportClose}
                MenuListProps={{
                  'aria-labelledby': 'export-button'
                }}
              >
                <MenuItem
                  onClick={() => { handleExportClose(); setExport({ value: true, fileType: 'png' }) }}
                >
                  Save as PNG
                </MenuItem>
                <MenuItem
                  onClick={() => { handleExportClose(); setExport({ value: true, fileType: 'jpg' }) }}
                >
                  Save as JPG
                </MenuItem>
              </Menu>
            </FlexBox>
          </FlexContainer>

        </FlexBox>
      </FlexContainer>
    </div>
  );
}

export default Overview;