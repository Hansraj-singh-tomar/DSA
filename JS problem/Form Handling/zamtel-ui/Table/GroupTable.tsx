/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/require-default-props */

"use client"

import React, { useState } from "react"
import {
  Checkbox,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { Column } from "app/models/Table"
import TableCellSelector from "./TableCellSelector"
import "./Tables.scss"
import GlobalPagination from "../muiPagination/Pagination1"

interface GroupTablesProps {
  columns: Column[]
  rowData: any[]
  totalCount: number
  isTableHeader?: boolean
  isCheckboxSelector?: boolean
  isRadioSelector?: boolean
  isLoading?: boolean
  isError?: boolean
  executeAction?: (index: number) => void
  activeActionItems?: boolean[]
  rowPriorityHandler?: (index1: number, index2: number) => void
  radioHeaderLabel?: string
  stickyHeader?: boolean
  isBorderBottomRequired?: boolean
  maxHeight?: string | undefined
  isPagination?: boolean
  page?: number
  totalPages?: number
  pageChange?: (value: number) => void
  showTablePagination?: boolean
  tablePagination?: string
  pageSize?: number
  handleChangeRowsPerPage?: (pageSize: number) => void
  isRowPerPageManualOptions?: boolean
  rowPerPageManualOptions?: number[]
  errorMessage?: string
}

const GroupTables: React.FC<GroupTablesProps> = ({
  columns,
  rowData,
  totalCount,
  isTableHeader = true,
  isCheckboxSelector = false,
  isRadioSelector = false,
  isLoading = false,
  isError = false,
  executeAction,
  activeActionItems,
  rowPriorityHandler,
  radioHeaderLabel,
  stickyHeader = false,
  isBorderBottomRequired = true,
  maxHeight,
  isPagination = false,
  page = 0,
  totalPages = 0,
  pageChange,
  showTablePagination = false,
  tablePagination = "",
  pageSize = 10,
  handleChangeRowsPerPage,
  isRowPerPageManualOptions = false,
  rowPerPageManualOptions = [],
  errorMessage = "",
}) => {
  const [isHeaderCheckboxChecked, setIsHeaderCheckboxChecked] = useState(false)
  const [isIndexCheckboxChecked, setIsIndexCheckboxChecked] = useState<
    boolean[]
  >([])

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const getMaxDepth = (columns: Column[]): number => {
    return Math.max(
      ...columns.map((col) =>
        col.children && col.children.length > 0
          ? 1 + getMaxDepth(col.children)
          : 1,
      ),
    )
  }

  const renderHeaderRows = (
    // eslint-disable-next-line @typescript-eslint/no-shadow
    columns: Column[],
    depth = 0,
    maxDepth?: number,
    allColumns?: Column[],
  ): JSX.Element[] => {
    const rows: JSX.Element[] = []

    const currentRow = (
      <TableRow key={`header-row-${depth}`}>
        {isCheckboxSelector && depth === 0 && (
          <TableCell
            key="checkbox-header"
            width="80px"
            rowSpan={maxDepth}
            align="center"
            sx={{
              verticalAlign: "middle",
              backgroundColor: "#0000000A",
              borderRight: "1px solid #e0e0e0 !important",
              textAlign: "center",
            }}
          >
            <Checkbox
              checked={isHeaderCheckboxChecked}
              onChange={(event) => {
                if (rowData && rowData.length > 0) {
                  const checkboxCheckedList: boolean[] = [
                    ...isIndexCheckboxChecked.map(() => event.target.checked),
                  ]
                  setIsIndexCheckboxChecked(checkboxCheckedList)
                  setIsHeaderCheckboxChecked(event.target.checked)
                }
              }}
            />
          </TableCell>
        )}
        {columns.map((col, index) => {
          const hasChildren = col.children && col.children.length > 0

          // Determine border logic
          let borderRight = "1px solid #e0e0e0 !important"

          if (depth === 0) {
            // For parent columns (debit, credit), only remove border from the last group
            const isLastGroup = index === columns.length - 1 && !isRadioSelector
            borderRight = isLastGroup
              ? "none !important"
              : "1px solid #e0e0e0 !important"
          } else {
            // For child columns, add border only after the last child of each parent group
            const topLevelColumns = allColumns || columns
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            const flatColumns = flattenColumns(topLevelColumns)
            const isLastColumn =
              flatColumns[flatColumns.length - 1]?.id === col.id &&
              !isRadioSelector

            // Check if this is the last child of a parent group
            let isLastChildOfGroup = false
            topLevelColumns.forEach((parent) => {
              if (parent.children && parent.children.length > 0) {
                const lastChildId =
                  parent.children[parent.children.length - 1].id
                if (lastChildId === col.id) {
                  isLastChildOfGroup = true
                }
              }
            })

            if (isLastColumn) {
              borderRight = "none !important"
            } else if (isLastChildOfGroup) {
              borderRight = "1px solid #e0e0e0 !important"
            } else {
              borderRight = "none"
            }
          }

          return (
            <TableCell
              key={`${col.label}-${index}`}
              align="center"
              colSpan={hasChildren ? col.children!.length : 1}
              rowSpan={hasChildren ? 1 : maxDepth ? maxDepth - depth : 1}
              sx={{
                fontWeight: "middle !important",
                verticalAlign: "middle",
                backgroundColor: "#0000000A",
                borderBottom: "1px solid #e0e0e0",
                borderRight,
                textAlign: "center !important",
                textAlignLast: "center !important",
                justifyContent: "center !important",
                alignItems: "center !important",
                display: "table-cell",
                "& > *": {
                  textAlign: "center !important",
                },
              }}
            >
              {col.label}
            </TableCell>
          )
        })}
        {isRadioSelector && depth === 0 && (
          <TableCell
            key="radio-header"
            rowSpan={maxDepth}
            align="center"
            sx={{
              fontWeight: "bold",
              verticalAlign: "middle",
              backgroundColor: "#0000000A",
              textAlign: "center",
            }}
          >
            {radioHeaderLabel}
          </TableCell>
        )}
      </TableRow>
    )

    rows.push(currentRow)

    const childCols = columns.flatMap((col) => col.children || [])
    if (childCols.length > 0) {
      rows.push(
        ...renderHeaderRows(
          childCols,
          depth + 1,
          maxDepth,
          allColumns || columns,
        ),
      )
    }

    return rows
  }

  const flattenColumns = (cols: Column[]): Column[] => {
    return cols.flatMap((col) =>
      col.children && col.children.length > 0
        ? flattenColumns(col.children)
        : col,
    )
  }

  // ---------- Pagination ----------
  // ---------- Render ----------
  return (
    <Grid
      container
      direction="column"
      spacing={1}
      flexWrap="nowrap"
      className="fixedTable"
    >
      <TableContainer
        sx={{
          border: "1px solid rgba(114, 111, 111, 0.12)",
          borderRadius: "5px",
          maxHeight: maxHeight || "none",
        }}
        className="last-column-header"
      >
        <Table
          stickyHeader={stickyHeader}
          sx={{
            "& .MuiTableCell-root": {
              borderBottom: isBorderBottomRequired ? "" : "none",
              borderRight: "1px solid rgba(114, 111, 111, 0.12)", // Remove default borders, we'll handle them manually
            },
            "& .MuiTableCell-root:last-child": {
              borderRight: "none",
            },
          }}
        >
          {isTableHeader && (
            <TableHead sx={{ backgroundColor: "#0000000A" }}>
              {renderHeaderRows(columns, 0, getMaxDepth(columns), columns)}
            </TableHead>
          )}

          <TableBody>
            {isError ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  Something went wrong!
                </TableCell>
              </TableRow>
            ) : isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : rowData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No records found
                </TableCell>
              </TableRow>
            ) : (
              rowData.map((row, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <TableRow key={index}>
                  {isCheckboxSelector && (
                    <TableCell width="80px">
                      <Checkbox
                        checked={isIndexCheckboxChecked[index] || false}
                        onChange={(event) => {
                          const updatedList = [...isIndexCheckboxChecked]
                          updatedList[index] = event.target.checked
                          setIsIndexCheckboxChecked(updatedList)
                        }}
                      />
                    </TableCell>
                  )}
                  {flattenColumns(columns).map((column, colIndex) => (
                    <TableCellSelector
                      index={index}
                      key={`${column.id}-${colIndex}`}
                      columnName={column.id}
                      rowData={row}
                      totalRowCount={rowData.length}
                      executeAction={executeAction}
                      activeActionItems={activeActionItems}
                      rowPriorityHandler={rowPriorityHandler}
                      totalCount={totalCount}
                      currentPage={page}
                    />
                  ))}
                  {isRadioSelector && (
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid item>
        {!errorMessage && isPagination && (
          <GlobalPagination
            count={totalPages}
            page={page}
            showTablePagination={showTablePagination}
            paginationClass={tablePagination}
            totalCount={totalCount}
            onClickPageChange={pageChange || (() => {})}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            pageSize={pageSize}
            isRowPerPageManualOptions={isRowPerPageManualOptions}
            rowPerPageManualOptions={rowPerPageManualOptions}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default GroupTables
