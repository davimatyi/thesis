import { Create, OpenInBrowser } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import FlexBox from '../components/layout/flexbox/FlexBox';
import FlexContainer from '../components/layout/flexbox/FlexContainer';
import FileList from '../components/filelist/FileList';
import { ChartData } from '../types/ChartDataType';
import { LoadingButton } from '@mui/lab';

const Welcome: React.FC<{ chart: ChartData, setChart: React.Dispatch<React.SetStateAction<ChartData>>, prevFilesList: File[] }>
  = ({ chart, setChart, prevFilesList }) => {

    const inputFile = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const onOpenButton = () => {
      inputFile.current?.click();
    }

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

    const parseFile = (file: File) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target === null || e.target.result === null) {
          alert("File read error");
          return;
        }
        try {
          const text: string = (e.target.result).toString();
          const temp: ChartData = JSON.parse(text);
          console.log(temp);
          setChart(temp);
          navigate("/editor");
        } catch (e) {
          alert(e);
        }
      }
      reader.readAsText(file);
      
    }

    const onFileOpened = async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.target.files !== null) {
        const file = e.target.files[0];
        parseFile(file);
        prevFilesList.push(file);
        if(prevFilesList.length > 5) prevFilesList.splice(0, prevFilesList.length - 5);
        localStorage.setItem("prevFiles", JSON.stringify(prevFilesList));
      }
      
    }

    return (
      <>
        <h1 style={{ fontFamily: "Segoe UI" }}>Graphite</h1>
        <FlexContainer>
          <FlexBox flexAmount='60%'>
            <h3>Recent projects</h3>
            <FileList list={prevFilesList} func={parseFile} />
          </FlexBox>
          <FlexBox flexAmount='40%' >
            <div style={{ flexDirection: "column" }}>
              <Button
                variant="contained"
                style={{ margin: "10px", fontSize: "20px", width: "300px", marginTop: "calc(50% - 150px)" }}
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
        <input 
          type="file" 
          id="file" 
          ref={inputFile} 
          style={{ display: "none" }} 
          onChange={(e) => { setDialogOpen(false); onFileOpened(e);}}
          accept="json"
        />

      </>
    );
  }

export default Welcome;