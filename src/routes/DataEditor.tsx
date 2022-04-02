import { CssBaseline } from '@mui/material';
import React from 'react';
import { Column } from 'react-table';
import LinkButton from '../components/buttons/linkbutton/LinkButton';
import DataTable from '../components/datatable/DataTable';
import { ChartData } from '../types/ChartDataType';

const DataEditor: React.FC<{chart: ChartData}> = ({chart}) => {

  const data = chart.values[0].map((_, i) => {
    const obj: any = {};
    obj['row'] = chart.x_axis_labels[i];
    chart.values.map((arr, j) => obj["col"+j] = arr[i]);
    return obj;
  });


  const columns = React.useMemo<Column[]>(
    () => [
      {
        Header: 'Row',
        accessor: 'row'
      },
      {
        Header: 'Values',
        columns: chart.y_axis_labels.map((val, i) => {return {Header: val, accessor: "col"+i}})
      }
    ], [chart.y_axis_labels]
  );

  return (
    <>
      Editor
      <LinkButton to="/">Back</LinkButton>
      <LinkButton to="/style">Next</LinkButton>
      <CssBaseline/>
      <DataTable columns={columns} data={data} />
    </>
  );
}

export default DataEditor;