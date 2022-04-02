import React from "react";
import { Column, useTable } from "react-table";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import './Table.css';


const DataTable: React.FC<{ data: {}[] }> = ({ data }) => {

  const columns = React.useMemo<Column[]>(
    () => [
      {
        Header: 'Row',
        columns: [
          {
            Header: 'Row',
            accessor: 'row'
          }
        ]
      },
      {
        Header: 'Value',
        columns: [
          {
            Header: 'Value',
            accessor: 'value'
          }
        ]
      }
    ], []
  );

  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data
    }
  );

  return (
    <Table {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell {...column.getHeaderProps()}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  );
}

export default DataTable;