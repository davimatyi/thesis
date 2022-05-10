import React from "react";
import { Column, useTable } from "react-table";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import './Table.css';
import { ChartData } from "../../types/ChartDataType";

const DataTable: React.FC<{ columns: readonly Column<{}>[], data: {}[], chart: ChartData }> = ({ columns, data, chart }) => {

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
              {row.cells.map((cell, j) => {
                return (
                  <TableCell 
                    {...cell.getCellProps()}  
                    contentEditable={true} 
                    onInput={(e: any) => {
                      try{
                      chart.values[j-1][i] = +e.target.innerHTML;
                      } catch(e) {
                        alert("An error has occured");
                      }
                      // console.log(e.target.innerHTML);
                    }} 
                  >
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