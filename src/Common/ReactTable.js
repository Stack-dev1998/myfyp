import React from "react";
import ReactTableStyle from "./ReactTable.module.css";
import { InputGroup, Form, Button, Table } from "react-bootstrap";
import { useTable, useSortBy, usePagination } from "react-table";
/**
 * As in the previous versions, any react table needs colums where at the core we have a field Header, and accessor
 * As in the previous versions, a react table has data that consist of an array of JSONs
 */
const ReactTable = ({ columns, data }) => {
  // you can get the react table functions by using the hook useStable
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    pageSize,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
    },
    // hook for sorting
    useSortBy,
    usePagination
  );
  return (
    <div>
      <div>
        <select
          style={{
            float: "left",
            border: "1px solid black",
            height: "30px",
          }}
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>

      <div className={ReactTableStyle.my_table}>
        <Table bordered {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  // three new addition to column: isSorted, isSortedDesc, getSortByToggleProps
                  const {
                    render,
                    getHeaderProps,
                    isSorted,
                    getSortByToggleProps,
                  } = column;
                  const extraClass = isSorted ? "desc" : "asc";

                  return (
                    <th
                      className={extraClass + "text-center"}
                      // getHeaderProps now receives a function
                      {...getHeaderProps(getSortByToggleProps())}
                    >
                      {render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? "🔽"
                            : "🔼"
                          : ""}
                      </span>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <div className={ReactTableStyle.mainDIV}>
        <div className={ReactTableStyle.leftDIV}>
          <Button
            className="btn btn-sm btn-outline-primary"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {"<<"}
          </Button>{" "}
          <Button
            className="btn btn-sm btn-outline-primary"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {"<"}
          </Button>
        </div>
        <div className={ReactTableStyle.middleDIV}>
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | Go to page:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
          </span>{" "}
        </div>

        <div className={ReactTableStyle.rightDIV}>
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            {">"}
          </button>{" "}
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReactTable;
