import { CssBaseline } from '@mui/material';
import React, { useState } from 'react';
import { Column } from 'react-table';
import LinkButton from '../components/buttons/linkbutton/LinkButton';
import DataTable from '../components/datatable/DataTable';
import { ChartData } from '../types/ChartDataType';
import parseCSV from '../utils/CSVparser';

function useForcedUpdate() {
  const [, setValue] = useState(0);
  return () => setValue(value => value + 1);
}

const DataEditor: React.FC<{ chart: ChartData }> = ({ chart }) => {

  const forcedUpdate = useForcedUpdate();

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
        const { xheaders, yheaders, data } = parseCSV(text, true);
        chart.x_axis_labels = xheaders;
        chart.y_axis_labels = yheaders;
        chart.values = data;
        forcedUpdate();
        console.log(chart);
      } catch (e) {
        alert(e);
      }
    }
    if (e.target.files !== null)
      reader.readAsText(e.target.files[0]);
  }

  return (
    <>
      <h2>Editor</h2>
      <LinkButton to="/">Back</LinkButton>
      <LinkButton to="/style">Next</LinkButton>
      <CssBaseline />
      <DataTable columns={columns} data={data} />
      <div>
        <input type="file" onChange={(e) => parseFile(e)} />
      </div>
    </>
  );
}

export default DataEditor;