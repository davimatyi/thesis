import { NavigateBefore, SaveAltOutlined, SaveOutlined, Fullscreen, FullscreenExit } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Button, IconButton, Menu, MenuItem } from '@mui/material';
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



const Overview: React.FC<{ chart: ChartData }> = ({ chart }) => {

  const [fileDownloadUrl, setDownloadUrl] = useState<string>("");
  const saveButton = useRef<HTMLAnchorElement>(null);
  const [backgroundColor, setBackground] = useState<string>(chart.background);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(true);


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
    <div style={{ width: "100%", height: "100vh", background: backgroundColor }}>
      <LinkButton to="/style" startIcon={<NavigateBefore />}>Back</LinkButton>
      <div style={{float: "right", margin: "10px", backgroundColor: "#1976d2", borderRadius: "25px"}}>
        <IconButton aria-label="hide controls" component="span" onClick={() => setDetailsOpen(!detailsOpen)}>
          {detailsOpen ? <Fullscreen fontSize='large' htmlColor="white"/> : <FullscreenExit fontSize='large' htmlColor="white"/>}
        </IconButton>
      </div>
      <FlexContainer>
        <div style={{transition: "width 0.2s ease-in-out", width: (detailsOpen ? "0" : "35%")}}></div>
        <FlexBox flexAmount='65%' height='80vh'>
          <ChartView data={chart} doExport={doExport} />
        </FlexBox>
        <FlexBox flexAmount='35%' height='80vh'>
          <div style={{ position: "absolute", width: "35vw", left: detailsOpen ? "calc(65% + 5px)" : "100%", transition: "left 0.2s ease-in-out" }}>
            {fun}
          </div>
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
              <LoadingButton
                id="export-button"
                onClick={handleExportClick}
                style={{ fontSize: '20px', position: 'absolute', bottom: '10px', right: '30px' }}
                variant='contained'
                startIcon={<SaveAltOutlined />}
                aria-controls={exportOpen ? 'export-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={exportOpen ? 'true' : undefined}
                loading={exportOpen}
              >
                Export
              </LoadingButton>
              <Menu
                id="export-menu"
                anchorEl={anchor}
                open={exportOpen}
                onClose={handleExportClose}
                MenuListProps={{
                  'aria-labelledby': 'export-button'
                }}
                style={{top: "-50px"}}
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