import { Clear, FileOpenOutlined, NavigateBefore, NavigateNext, PlusOne } from '@mui/icons-material';
import { Button, CssBaseline } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Column } from 'react-table';
import LinkButton from '../components/buttons/linkbutton/LinkButton';
import CheckBox from '../components/checkbox/CheckBox';
import DataTable from '../components/datatable/DataTable';
import FlexBox from '../components/layout/flexbox/FlexBox';
import FlexContainer from '../components/layout/flexbox/FlexContainer';
import ScrollBox from '../components/layout/scrollbox/ScrollBox';
import { ChartData } from '../types/ChartDataType';
import parseCSV from '../utils/CSVparser';

function useForcedUpdate() {
  const [, setValue] = useState(0);
  return () => setValue(value => value + 1);
}

const DataEditor: React.FC<{ chart: ChartData, prevFilesList: { name: string, path: string }[] }> = ({ chart, prevFilesList }) => {

  const inputFile = useRef<HTMLInputElement>(null);
  const forcedUpdate = useForcedUpdate();

  const [xChecked, setXChecked] = useState<boolean>(true);
  const [yChecked, setYChecked] = useState<boolean>(true);

  const [canProceed, setCanProceed] = useState<boolean>(false);


  const onOpenButton = () => {
    inputFile.current?.click();
  }

  let data = chart.values[0].map((_, i) => {
    const obj: any = {};
    obj['row'] = chart.x_axis_labels[i];
    chart.values.map((arr, j) => obj["col" + j] = arr[i]);
    return obj;
  });


  let columns = React.useMemo<Column[]>(
    () => chart.y_axis_labels.map((val, i) => { return { Header: val, accessor: (i === 0 ? "row" : ("col" + (i - 1))) } })
    , [chart.y_axis_labels]
  );

  const RebuildTable = () => {
    columns = React.useMemo<Column[]>(
      () => chart.y_axis_labels.map((val, i) => { return { Header: val, accessor: (i === 0 ? "row" : ("col" + (i - 1))) } })
      , []
    );
    data = chart.values[0].map((_, i) => {
      const obj: any = {};
      obj['row'] = chart.x_axis_labels[i];
      chart.values.map((arr, j) => obj["col" + j] = arr[i]);
      return obj;
    });
  }

  const addRow = () => {
    for (let i = 0; i < chart.values.length; i++) {
      chart.values[i].push(0);
    }
    chart.x_axis_labels.push("");
    forcedUpdate();
  }

  const addColumn = () => {
    chart.values.push([]);
    for (let i = 0; i < chart.values[0].length; i++) {
      chart.values[chart.values.length - 1][i] = 0;
    }
    chart.y_axis_labels.push("");
    RebuildTable();
    forcedUpdate();
  }

  const clearTable = () => {
    chart.x_axis_labels = []
    chart.y_axis_labels = []
    chart.values = [[]];
    forcedUpdate();
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
        const { xheaders, yheaders, data } = parseCSV(text, xChecked, yChecked);
        if (xheaders === undefined || yheaders === undefined || data === undefined
          || xheaders.length === 0 || yheaders.length === 0 || data.length === 0) {
          throw new Error("Could not parse input file");
        }
        // console.log(xheaders);
        // console.log(yheaders);
        // console.log(data);
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
      <LinkButton to="/" startIcon={<NavigateBefore />}>Cancel</LinkButton>
      <FlexContainer>
        <FlexBox flexAmount='75%'>
          <ScrollBox>
            <CssBaseline />
            {canProceed && <DataTable columns={columns} data={data} chart={chart} />}
          </ScrollBox>
        </FlexBox>
        <FlexBox flexAmount='25%'>
          <div style={{ paddingLeft: "20px" }}>
            <Button
              variant="contained"
              style={{ margin: "10px 0", fontSize: "20px" }}
              startIcon={<FileOpenOutlined />}
              onClick={onOpenButton}
            >
              Import file
            </Button>
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

          <Button
            variant="outlined"
            style={{ margin: "5px", fontSize: "18px", marginLeft: "20px" }}
            startIcon={<PlusOne />}
            onClick={addRow}
          >
            Add row
          </Button>
          <br />
          <Button
            variant="outlined"
            style={{ margin: "5px", fontSize: "18px", marginLeft: "20px" }}
            startIcon={<PlusOne />}
            onClick={addColumn}
          >
            Add column
          </Button>
          <br />
          <Button
            variant="outlined"
            style={{ margin: "5px", fontSize: "18px", marginLeft: "20px" }}
            startIcon={<Clear />}
            onClick={clearTable}
          >
            Clear table
          </Button>

          <LinkButton to="/style" align="bottom" disabled={!canProceed} endIcon={<NavigateNext />}>Next</LinkButton>
        </FlexBox>
      </FlexContainer>
    </>
  );
}

export default DataEditor;