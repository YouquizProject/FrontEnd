import React from "react";
import styled from "styled-components";
import MyPageForm from "../../../component/MyPageForm";
import { useTable } from "react-table";

const TableBlock = styled.div`
height: 65vh;
width: 54.5vw;
display: flex;
flex-direction: column;
align-items:center;
margin-top: 1vh;
`;
const TableWrapper = styled.div`
width: 100%;
overflow-y: auto; /* 내용많으면 스크롤됨 */
padding-right: 1vw;

&::-webkit-scrollbar {
  width: .7vw;
}
&::-webkit-scrollbar-thumb {
  background: #E5E5E5;
}
&::-webkit-scrollbar-track {
  background: none;
}
table {
  width: 100%;
  height: 100%;
  text-align: center;
  border-collapse: collapse;
}

td{
  height: 5vh;
  border: 1px solid white;
}
thead {
  font-weight: bold;
  position: sticky;
  top: 0;
  height: 5vh;
  background-color: white;
}
th {
  font-weight: 600;
}
tbody tr:nth-child(2n+1) {
  background-color: #E5E5E5;
}
tbody tr:nth-child(2n) {
  background-color: white;
}
`;

export default function StudyManage( { columns, data } ) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      <MyPageForm  userType={"teacher"} page={"학습 관리"} />
      <TableBlock>
        <TableWrapper>
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
          </TableWrapper>
      </TableBlock>
    </>
  );
}

