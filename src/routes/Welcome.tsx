import { Button } from '@mui/material';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router';
import LinkButton from '../components/buttons/linkbutton/LinkButton';
import { ChartData } from '../types/ChartDataType';

const Welcome: React.FC<{ chart: ChartData, setChart: React.Dispatch<React.SetStateAction<ChartData>> }> = ({ chart, setChart }) => {

  const inputFile = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const onOpenButton = () => {
    inputFile.current?.click();
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
    if (e.target.files !== null)
      reader.readAsText(e.target.files[0]);
  }

  return (
    <>
      <h2>Welcome</h2>
      {/* <LinkButton to="/editor">Next</LinkButton> */}
      <LinkButton to="/editor" >New</LinkButton>
      <Button onClick={onOpenButton} >Open project</Button>
      <input type="file" id="file" ref={inputFile} style={{ display: "none" }} onChange={(e)=> parseFile(e)}/>

    </>
  );
}

export default Welcome;