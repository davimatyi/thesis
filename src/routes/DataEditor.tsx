import { ArrowLeftOutlined, ArrowRightOutlined, FileOpenOutlined } from '@mui/icons-material';
import { Button, CssBaseline } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Column } from 'react-table';
import LinkButton from '../components/buttons/linkbutton/LinkButton';
import CheckBox from '../components/checkbox/CheckBox';
import DataTable from '../components/datatable/DataTable';
import FlexBox from '../components/layout/flexbox/FlexBox';
import FlexContainer from '../components/layout/flexbox/FlexContainer';
import { ChartData } from '../types/ChartDataType';
import parseCSV from '../utils/CSVparser';

function useForcedUpdate() {
  const [, setValue] = useState(0);
  return () => setValue(value => value + 1);
}

const DataEditor: React.FC<{ chart: ChartData }> = ({ chart }) => {

  const inputFile = useRef<HTMLInputElement>(null);
  const forcedUpdate = useForcedUpdate();

  const [xChecked, setXChecked] = useState<boolean>(true);
  const [yChecked, setYChecked] = useState<boolean>(true);

  const [canProceed, setCanProceed] = useState<boolean>(false);

  const onOpenButton = () => {
    inputFile.current?.click();
  }

  const data = chart.values[0].map((_, i) => {
    const obj: any = {};
    obj['row'] = chart.x_axis_labels[i];
    chart.values.map((arr, j) => obj["col" + j] = arr[i]);
    return obj;
  });


  const columns = React.useMemo<Column[]>(
    () => [
      {
        Header: 'Row',
        columns: [
          {
            Header: chart.y_axis_labels[0],
            accessor: 'row'
          }
        ]
      },
      {
        Header: 'Values',
        columns: chart.y_axis_labels.slice(1).map((val, i) => { return { Header: val, accessor: "col" + i } })
      }
    ], [chart.y_axis_labels]
  );

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
        const { xheaders, yheaders, data } = parseCSV(text, xChecked, yChecked);
        if (xheaders === undefined || yheaders === undefined || data === undefined
          || xheaders.length === 0 || yheaders.length === 0 || data.length === 0) {
          throw new Error("Could not parse input file");
        }
        console.log(xheaders);
        console.log(yheaders);
        console.log(data);
        chart.x_axis_labels = xheaders;
        chart.y_axis_labels = yheaders;
        chart.values = data;
        forcedUpdate();
        console.log(chart);
        setCanProceed(true);
      } catch (e) {
        alert(e);
      }
    }
    if (e.target.files !== null)
      reader.readAsText(e.target.files[0]);
  }

  useEffect(() => {
    if (chart.x_axis_labels === undefined || chart.y_axis_labels === undefined || chart.values === undefined
      || chart.x_axis_labels.length === 0 || chart.y_axis_labels.length === 0 || chart.values.length === 0) {
      setCanProceed(false);
    } else setCanProceed(true);
  }, [canProceed, chart.values, chart.x_axis_labels, chart.y_axis_labels]);

  return (
    <>
      <LinkButton to="/" startIcon={<ArrowLeftOutlined />}>Cancel</LinkButton>
      <FlexContainer>
        <FlexBox flexAmount='75%'>
          <CssBaseline />
          <DataTable columns={columns} data={data} />
        </FlexBox>
        <FlexBox flexAmount='25%'>
          <div style={{ paddingLeft: "20px" }}>
            <Button variant="contained" style={{ margin: "10px", fontSize: "20px" }} endIcon={<FileOpenOutlined />} onClick={onOpenButton}>Import file</Button>
            <input type="file" id="file" ref={inputFile} style={{ display: "none" }} onChange={(e) => parseFile(e)} />
            <CheckBox
              callBack={setYChecked}
              isChecked={yChecked}
              text="Headers included"
            />
            <CheckBox
              callBack={setXChecked}
              isChecked={xChecked}
              text="Row names included"
            />
          </div>

          <LinkButton to="/style" align="bottom" disabled={!canProceed} endIcon={<ArrowRightOutlined />}>Next</LinkButton>
        </FlexBox>
      </FlexContainer>
    </>
  );
}

export default DataEditor;