import { Create, OpenInBrowser } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import FlexBox from '../components/layout/flexbox/FlexBox';
import FlexContainer from '../components/layout/flexbox/FlexContainer';
import FileList from '../components/filelist/FileList';
import { ChartData } from '../types/ChartDataType';
import { LoadingButton } from '@mui/lab';
const { ipcRenderer } = window.require('electron');
const fs = window.require('fs');

const Welcome: React.FC<{ chart: ChartData, setChart: React.Dispatch<React.SetStateAction<ChartData>>, prevFilesList: string[] }>
  = ({ chart, setChart, prevFilesList }) => {

    const navigate = useNavigate();
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);


    const onNewButton = () => {
      chart.values = [[]];
      chart.x_axis_labels = [];
      chart.y_axis_labels = [];
      chart.background = "#ffffff";
      chart.axis_line_color = "#000000";
      chart.fill_colors.splice(0, chart.fill_colors.length);
      chart.fill_colors.push("#005097");
      chart.fill_colors.push("#007CE9");
      chart.fill_colors.push("#3EA5FF");
      navigate("/editor");
    }

    
    const parseFile = useCallback((file: string) => {
      try {
        const data = fs.readFileSync(file).toString();
        setChart(JSON.parse(data));
        navigate("/editor");
      } catch (e) {
        alert(e);
      }
    }, [navigate, setChart]);

    const onOpenButton = () => {
      ipcRenderer.send('show-open-dialog');
      setDialogOpen(true);
    }

    useEffect(() => {
      ipcRenderer.on('file-open-reply', (event: any, result: any) => {
        console.log(result);
        setDialogOpen(false);
        if (!result.canceled) {
          if(!prevFilesList.includes(result.filePaths[0]))
            prevFilesList.push(result.filePaths[0]);
          if (prevFilesList.length > 5) prevFilesList.splice(0, prevFilesList.length - 5);
          parseFile(result.filePaths[0]);
          localStorage.setItem("prevFiles", JSON.stringify(prevFilesList));
        }
      });
      return () => {
        ipcRenderer.removeAllListeners('file-open-reply');
      };
    }, [parseFile, prevFilesList]);


    return (
      <div style={{width: '100%', maxWidth: '700px', margin: "100px auto"}}>
        <div style={{ fontFamily: "Segoe UI", fontWeight: 500, fontSize: '32px' }}>Graphite</div>
        <FlexContainer>
          <FlexBox flexAmount='60%'>
            <div style={{fontWeight: 400, margin: '10px', fontSize: '20px'}}>Recent projects</div>
            <FileList list={prevFilesList} func={parseFile} />
          </FlexBox>
          <FlexBox flexAmount='40%' >
            <div style={{ flexDirection: "column" }}>
              <Button
                variant="contained"
                style={{ margin: "10px", fontSize: "20px", width: "300px", marginTop: "calc(70% - 150px)" }}
                startIcon={<Create />}
                onClick={onNewButton}
              >
                New project
              </Button>
            </div>
            <div style={{ flexDirection: "column" }}>
              <LoadingButton
                variant="contained"
                style={{ margin: "10px", fontSize: "20px", width: "300px" }}
                startIcon={<OpenInBrowser />}
                onClick={onOpenButton}
                loading={dialogOpen}
              >
                Open project
              </LoadingButton>
            </div>
          </FlexBox>
        </FlexContainer>
      </div>
    );
  }

export default Welcome;