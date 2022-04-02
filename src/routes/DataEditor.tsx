import { CssBaseline } from '@mui/material';
import React from 'react';
import LinkButton from '../components/buttons/linkbutton/LinkButton';
import DataTable from '../components/datatable/DataTable';

const data = [
  {
    row: 1,
    value: 1
  },
  {
    row: 2,
    value: 22
  }
]

const DataEditor: React.FC = () => {
  return (
    <>
      Editor
      <LinkButton to="/">Back</LinkButton>
      <LinkButton to="/style">Next</LinkButton>
      <CssBaseline/>
      <DataTable data={data} />
    </>
  );
}

export default DataEditor;