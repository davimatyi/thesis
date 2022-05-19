import { Add, Clear, Create, NavigateBefore, NavigateNext, OpenInNew, Remove } from '@mui/icons-material';
import { Button, CssBaseline } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import LinkButton from '../components/buttons/linkbutton/LinkButton';
import CheckBox from '../components/checkbox/CheckBox';
import DataTable from '../components/datatable/DataTable';
import FlexBox from '../components/layout/flexbox/FlexBox';
import FlexContainer from '../components/layout/flexbox/FlexContainer';
import ScrollBox from '../components/layout/scrollbox/ScrollBox';
import PopupDialog from '../components/popupdialog/PopupDialog';
import { ChartData } from '../types/ChartDataType';
import parseCSV from '../utils/CSVparser';

function useForcedUpdate() {
  const [, setValue] = useState(0);
  return () => setValue(value => value + 1);
}

const DataEditor: React.FC<{ chart: ChartData, prevFilesList: File[] }> = ({ chart, prevFilesList }) => {

  const inputFile = useRef<HTMLInputElement>(null);
  const forcedUpdate = useForcedUpdate();

  const [xChecked, setXChecked] = useState<boolean>(true);
  const [yChecked, setYChecked] = useState<boolean>(true);

  const [canProceed, setCanProceed] = useState<boolean>(false);

  let closeFileDialog: { fun: Function | null } = { fun: null };


  const onOpenButton = () => {
    inputFile.current?.click();
  }

  let data = chart.values[0].map((_, i) => {
    const obj: any = {};
    obj['row'] = chart.x_axis_labels[i];
    chart.values.map((arr, j) => obj["col" + j] = arr[i]);
    return obj;
  });

  let columns = chart.y_axis_labels.map((val, i) => { return { Header: val, accessor: (i === 0 ? "row" : ("col" + (i - 1))) } });

  const addRow = () => {
    for (let i = 0; i < chart.values.length; i++) {
      chart.values[i].push(0);
    }
    chart.x_axis_labels.push((chart.x_axis_labels.length + 1) + "");
    forcedUpdate();
  }

  const addColumn = () => {
    chart.values.push([]);
    for (let i = 0; i < chart.values[0].length; i++) {
      chart.values[chart.values.length - 1][i] = 0;
    }
    chart.y_axis_labels.push("value " + (chart.y_axis_labels.length));
    forcedUpdate();
  }

  const removeColumn = () => {
    if (chart.values.length > 1) {
      chart.values.splice(chart.values.length - 1, 1);
      chart.y_axis_labels.splice(chart.y_axis_labels.length - 1, 1);
    }
    forcedUpdate();
  }

  const removeRow = () => {
    if (chart.values[0].length > 1) {
      for (let i = 0; i < chart.values.length; i++) {
        chart.values[i].splice(chart.values[i].length - 1, 1);
      }
      chart.x_axis_labels.splice(chart.x_axis_labels.length - 1, 1);
    }
    forcedUpdate();
  }

  const clearTable = () => {
    chart.x_axis_labels = []
    chart.y_axis_labels = []
    chart.values = [[]];
    forcedUpdate();
  }

  const createTable = () => {
    chart.x_axis_labels = ["1"]
    chart.y_axis_labels = ["", "value"]
    chart.values = [[0]];
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
        <FlexBox flexAmount='calc(100% - 320px)'>
          <ScrollBox>
            <CssBaseline />
            {canProceed && <DataTable columns={columns} data={data} chart={chart} />}
          </ScrollBox>
        </FlexBox>
        <FlexBox flexAmount='320px'>
          <div style={{ paddingLeft: "20px" }}>
            <PopupDialog title="Choose a file to import" closeFunction={closeFileDialog}>
              <Button
                variant="contained"
                style={{ margin: "10px 0", fontSize: "20px" }}
                startIcon={<OpenInNew />}
                onClick={onOpenButton}
              >
                Choose file
              </Button>
              <input
                type="file"
                id="file"
                ref={inputFile}
                style={{ display: "none" }}
                onChange={(e) => {
                  parseFile(e);
                  if (closeFileDialog.fun !== null) closeFileDialog.fun();
                }}
                accept="csv"
                onAbort={() => { if (closeFileDialog.fun !== null) closeFileDialog.fun() }}
              />
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
            </PopupDialog>
          </div>

          {chart.values[0].length !== 0 &&
            <>
              <Button
                variant="outlined"
                style={{ margin: "5px", fontSize: "18px", marginLeft: "20px", width: "280px" }}
                startIcon={<Clear />}
                onClick={clearTable}
              >
                Clear table
              </Button>
              <div style={{ margin: "5px 20px 0 20px" }}>
                <span style={{ fontWeight: "600", margin: "5px auto" }}>Rows</span>
                <FlexContainer>
                  <FlexBox flexAmount="50%">
                    <Button
                      variant="outlined"
                      style={{ fontSize: "18px", width: "140px" }}
                      startIcon={<Add />}
                      onClick={addRow}
                    >
                      Add
                    </Button>
                  </FlexBox>
                  <FlexBox flexAmount="50%">
                    <Button
                      variant="outlined"
                      style={{ fontSize: "18px", width: "140px" }}
                      startIcon={<Remove />}
                      onClick={removeRow}
                    >
                      Remove
                    </Button>
                  </FlexBox>
                </FlexContainer>
              </div>
              <div style={{ margin: "5px 20px 5px 20px" }}>
              <span style={{ fontWeight: "600", margin: "5px auto" }}>Columns</span>
                <FlexContainer>
                  <FlexBox flexAmount="50%">
                    <Button
                      variant="outlined"
                      style={{ fontSize: "18px", width: "140px" }}
                      startIcon={<Add />}
                      onClick={addColumn}
                    >
                      Add
                    </Button>
                  </FlexBox>
                  <FlexBox flexAmount="50%">
                    <Button
                      variant="outlined"
                      style={{ fontSize: "18px", width: "140px" }}
                      startIcon={<Remove />}
                      onClick={removeColumn}
                    >
                      Remove
                    </Button>
                  </FlexBox>
                </FlexContainer>
              </div>
            </>
          }
          {
            chart.values[0].length === 0 &&
            <>
              <Button
                variant="outlined"
                style={{ margin: "5px", fontSize: "18px", marginLeft: "20px", width: "280px" }}
                startIcon={<Create />}
                onClick={createTable}
              >
                Create empty table
              </Button>
            </>
          }

          <LinkButton to="/style" align="bottom" disabled={!canProceed} endIcon={<NavigateNext />}>Next</LinkButton>
        </FlexBox>
      </FlexContainer>
    </>
  );
}

export default DataEditor;