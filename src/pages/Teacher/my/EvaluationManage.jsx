import React from "react";
import styled from "styled-components";
import MyPageForm from "../../../component/MyPageForm";
import { useTable } from "react-table";

const TableBlock = styled.div`
height: 70vh;
width: 54.5vw;
display: flex;
margin-top: 3vh;
`;

const EvaluationBlock = styled.div`
width: 100%;
overflow-y: auto; /* 내용많으면 스크롤됨 */

&::-webkit-scrollbar-thumb {
  background: #D9D9D9;
}
&::-webkit-scrollbar-track {
  background: none;
}

table {
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  font-weight: 600;
}
thead {
  position: sticky;
  top: 0;
  height: 5vh;
  border-top: 1px solid #5A5A5A;
  border-bottom: 1px solid #5A5A5A;
}
td{
  height: 5vh;
}
tbody td:nth-child(3) {
  width: 45%;
  text-align: start;
  padding-left: 2vw;
}
tbody tr:nth-child(2n+1) {
  background-color: #F4F4F4;
}
tbody tr:nth-child(2n) {
  background-color: white;
}
`;

export default function EvaluationtManage( { columns, data } ) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <>
      <MyPageForm  userType={"teacher"} page={"채점 관리"} />
      <TableBlock>
        <EvaluationBlock>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr key={row.id} {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </EvaluationBlock>
      </TableBlock>
    </>
  );
}