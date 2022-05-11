import { Create, OpenInBrowser } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router';
import FlexBox from '../components/layout/flexbox/FlexBox';
import FlexContainer from '../components/layout/flexbox/FlexContainer';
import FileList from '../components/filelist/FileList';
import { ChartData } from '../types/ChartDataType';

const Welcome: React.FC<{ chart: ChartData, setChart: React.Dispatch<React.SetStateAction<ChartData>>, prevFilesList: { name: string, path: string }[] }>
  = ({ chart, setChart, prevFilesList }) => {

    const inputFile = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

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

    const parseFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
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
      if (e.target.files !== null) {
        reader.readAsText(e.target.files[0]);
        prevFilesList.push({ name: e.target.files[0].name, path: e.target.files[0].webkitRelativePath });
      }
    }

    return (
      <>
        <h1 style={{ fontFamily: "Segoe UI" }}>Graphite</h1>
        <FlexContainer>
          <FlexBox flexAmount='60%'>
            <h3>Recent projects</h3>
            <FileList list={prevFilesList} />
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
              <Button
                variant="contained"
                style={{ margin: "10px", fontSize: "20px", width: "300px" }}
                startIcon={<OpenInBrowser />}
                onClick={onOpenButton}
              >
                Open project
              </Button>
            </div>
          </FlexBox>
        </FlexContainer>
        <input type="file" id="file" ref={inputFile} style={{ display: "none" }} onChange={(e) => parseFile(e)} />

      </>
    );
  }

export default Welcome;