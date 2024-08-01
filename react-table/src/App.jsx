import { useTable, useSortBy, usePagination } from "react-table";
import "./App.css";
import data from "./assets/data.json";
import { VideoPlayer } from '6pp';
import { useState } from "react";

const columns = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Salary",
    accessor: "salary",
  },
];

function App() {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state: {pageIndex},
    pageCount,
    gotoPage
  } = useTable(
    {
      columns,
      data,
      initialState: {pageIndex: 0, pageSize: 5},
    },
    useSortBy,
    usePagination
  );

  const [quality, setQuality] = useState(480);

  return (
    <div className="container">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((hg, index) => (
            <tr key={index} {...hg.getHeaderGroupProps()}>
              {hg.headers.map((column, colIndex) => (
                <th
                  key={colIndex}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  {column.isSorted && (
                    <span>{column.isSortedDesc ? " ⬇️" : " ⬆️"}</span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr key={rowIndex} {...row.getRowProps()}>
                {row.cells.map((cell, cellIndex) => (
                  <td key={cellIndex} {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="btn-container">
        <button disabled={pageIndex === 0} onClick={() => gotoPage(0)}>First</button>
        <button disabled={!canPreviousPage} onClick={() => previousPage()}>Prev</button>
        <span>{pageIndex + 1} of {pageCount}</span>
        <button disabled={!canNextPage} onClick={() => nextPage()}>Next</button>
        <button disabled={pageIndex === pageCount - 1} onClick={() => gotoPage(pageCount - 1)}>Last</button>
      </div>
      <div className="video-container">
        <div className="video-player">
          <VideoPlayer
          src="http://localhost:5000/video"
          setQuality={setQuality}
          />
      </div>
    </div>
    </div>
  );
}

export default App;
