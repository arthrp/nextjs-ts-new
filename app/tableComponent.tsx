'use client'

import React from 'react';
import { useTable, Column } from 'react-table';

type Data = {
  id: number;
  name: string;
  age: number;
};

const TableComponent: React.FC = () => {
  const data = React.useMemo<Data[]>(
    () => [
      { id: 1, name: 'John', age: 25 },
      { id: 2, name: 'Jane', age: 30 },
      { id: 3, name: 'Doe', age: 28 }
    ],
    []
  );

  const columns = React.useMemo<Column<Data>[]>(
    () => [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Age',
        accessor: 'age'
      }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()}>
      <thead>
      {headerGroups.map((headerGroup, headerGroupIndex) => (
        <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIndex}>
            {headerGroup.headers.map((column, columnIndex) => (
            <th {...column.getHeaderProps()} key={columnIndex}>{column.render('Header')}</th>
            ))}
        </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
      {rows.map(row => {
        prepareRow(row);
        return (
            <tr {...row.getRowProps()} key={row.id}>
            {row.cells.map((cell, cellIndex) => (
                <td {...cell.getCellProps()} key={cellIndex}>{cell.render('Cell')}</td>
            ))}
            </tr>
        );
        })}
      </tbody>
    </table>
  );
};

export default TableComponent;