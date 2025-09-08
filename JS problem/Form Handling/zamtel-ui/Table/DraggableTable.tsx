/* eslint-disable no-nested-ternary */
import { useEffect, useState } from "react"
import {
  Grid,
  Table,
  TableBody,
  TableRow,
  TableContainer,
  TableHead,
  TableCell,
  Checkbox,
} from "@mui/material"
import { uuid } from "app/utils/commonFunctions"
import { Column, Row } from "app/models/Table"
import Radio from "@mui/material/Radio"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { DragIndicator } from "@mui/icons-material"

import TableCellSelector, { HeadCellSelector } from "./TableCellSelector"
import GlobalPagination from "../muiPagination/Pagination1"
import "./Tables.scss"
import Loader from "../Loader/Loader"

interface IProps {
  columns: Column[]
  rowData: Array<Row>
  isPagination: boolean
  page?: number | undefined
  totalPages?: number | undefined
  totalCount?: number | undefined
  pageChange?: (value: number) => void
  isStyles?: boolean
  isTableHeader?: boolean
  stickyHeader?: boolean
  isBorderBottomRequired?: boolean
  showTablePagination?: boolean
  isLoading?: boolean
  errorMessage?: string
  isPageStartsFromZero?: boolean
  handleChangeRowsPerPage?: (pageSize: number) => void
  pageSize?: number
  isCheckboxSelector?: boolean
  setSelectedIndex?: (selectedIndex: number[]) => void
  setSelectedRowData?: (selectedRow: Row[]) => void
  dateFilter?: () => void
  maxHeight?: string | undefined
  executeAction?: (index: number) => void
  rowPriorityHandler?: (index1: number, index2: number) => void
  activeActionItems?: boolean[]
  isRadioSelector?: boolean
  setSelectedRow?: (selectedRow: Row | null) => void
  radioHeaderLabel?: string
  emptySelectedIndex?: boolean
  tableSize?: "small" | "medium" | undefined
  isRowPerPageManualOptions?: boolean
  rowPerPageManualOptions?: number[]
  isInitialallyChecked?: boolean
  setRowData: any
  draggableId: string
  onOrderChange?: (updatedData: Row[]) => void
  tableClass?: string
  tablePagination?: string
}

function DraggableTable({
  columns,
  rowData,
  isPagination,
  page,
  totalPages,
  totalCount,
  pageChange,
  isStyles,
  isTableHeader,
  stickyHeader,
  isBorderBottomRequired,
  showTablePagination,
  isLoading,
  errorMessage,
  handleChangeRowsPerPage,
  pageSize,
  isCheckboxSelector,
  setSelectedIndex,
  setSelectedRowData,
  dateFilter,
  maxHeight,
  executeAction,
  // rowPriorityHandler,
  activeActionItems,
  isRadioSelector,
  setSelectedRow,
  radioHeaderLabel = "Action",
  emptySelectedIndex,
  isRowPerPageManualOptions,
  rowPerPageManualOptions,
  isInitialallyChecked,
  setRowData,
  onOrderChange,
  tableClass,
  tablePagination,
}: IProps) {
  const [globalColSpan, setGlobalColSpan] = useState<number>(0)
  const [selectedRadioRow, setSelectedRadioRow] = useState<Row | null>(null)
  const [checkedRadioIndexs, setCheckedRadioIndexs] = useState<boolean[]>([])
  const [isHeaderCheckboxChecked, setIsHeaderCheckboxChecked] = useState(false)
  const [isIndexCheckboxChecked, setIsIndexCheckboxChecked] = useState<
    boolean[]
  >([])

  const handleDragEnd = (result: any) => {
    if (!result.destination) return
    if (result.destination.index === result.source.index) return

    setRowData((prev: any) => {
      const temp = [...prev]
      const [movedItem] = temp.splice(result.source.index, 1)
      temp.splice(result.destination.index, 0, movedItem)

      // Update displayOrder while keeping dragId stable
      const updatedData = temp.map((row, index) => ({
        ...row,
        currentDisplayOrder: index + 1,
        displayOrder: index + 1,
      }))

      if (onOrderChange) {
        onOrderChange(updatedData)
      }

      return updatedData
    })
  }

  //

  useEffect(() => {
    let allChecked = false
    const selectedCheckBoxIndexs: number[] = []
    if (isIndexCheckboxChecked.length > 0) {
      allChecked = true
      isIndexCheckboxChecked?.forEach((value: boolean, index: number) => {
        if (!value) {
          allChecked = false
        } else {
          selectedCheckBoxIndexs.push(index)
        }
      })
    }
    setIsHeaderCheckboxChecked(allChecked)
    if (setSelectedIndex) {
      setSelectedIndex(selectedCheckBoxIndexs)
    }
    if (setSelectedRowData) {
      setSelectedRowData(
        rowData.filter((_val: any, index: number) =>
          selectedCheckBoxIndexs.includes(index),
        ),
      )
    }
  }, [isIndexCheckboxChecked])

  useEffect(() => {
    if (rowData?.length > 0) {
      const checkboxCheckedList: boolean[] = [
        ...rowData.map(() => {
          return !!isInitialallyChecked
        }),
      ]
      setIsIndexCheckboxChecked(checkboxCheckedList)
    } else {
      if (setSelectedIndex) setSelectedIndex([])
      if (setSelectedRowData) {
        setSelectedRowData([])
      }
      setIsHeaderCheckboxChecked(false)
    }

    // reset previous selection if user applies filters or search
    setSelectedRadioRow(null)
    setCheckedRadioIndexs(Array(rowData?.length).fill(false))
  }, [rowData])

  useEffect(() => {
    if (setSelectedRow) setSelectedRow(selectedRadioRow)
  }, [selectedRadioRow])

  useEffect(() => {
    let totalColumns = columns.length

    if (isCheckboxSelector) totalColumns += 1

    if (isRadioSelector) totalColumns += 1

    setGlobalColSpan(totalColumns)
  }, [columns, isCheckboxSelector, isRadioSelector])

  useEffect(() => {
    if (rowData?.length > 0) {
      const checkboxCheckedList: boolean[] = [
        ...rowData.map(() => {
          return false
        }),
      ]
      setIsIndexCheckboxChecked(checkboxCheckedList)
      setIsHeaderCheckboxChecked(false)
    }
  }, [emptySelectedIndex])

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Grid
        container
        direction="column"
        spacing={1}
        flexWrap="nowrap"
        className="fixedTable background-white"
      >
        <Grid item>
          <Grid container direction="column" spacing={0}>
            <TableContainer
              sx={{
                border: isStyles ? "1px solid #0000001F" : "none",
                borderRadius: "0px",
                maxHeight: maxHeight || "none",
              }}
              className={tableClass}
            >
              <Table
                stickyHeader={stickyHeader}
                sx={{
                  "& .MuiTableCell-root": {
                    borderBottom: isBorderBottomRequired ? "" : "none",
                  },
                }}
              >
                {isTableHeader && (
                  <TableHead sx={{ backgroundColor: "#0000000A" }}>
                    <TableRow>
                      {isCheckboxSelector && (
                        <TableCell key={uuid()}>
                          <Checkbox
                            checked={isHeaderCheckboxChecked}
                            onChange={(event) => {
                              if (rowData && rowData?.length > 0) {
                                const checkboxCheckedList: boolean[] = [
                                  ...isIndexCheckboxChecked.map(() => {
                                    return event.target.checked
                                  }),
                                ]
                                setIsIndexCheckboxChecked(checkboxCheckedList)
                                setIsHeaderCheckboxChecked(event.target.checked)
                              }
                            }}
                          />
                        </TableCell>
                      )}
                      {columns?.map((column) => {
                        column.dateFilter = dateFilter
                        return <HeadCellSelector key={uuid()} {...column} />
                      })}
                      {isRadioSelector && (
                        <HeadCellSelector
                          key={uuid()}
                          id="action"
                          label={radioHeaderLabel}
                        />
                      )}
                    </TableRow>
                  </TableHead>
                )}
                {isLoading ? (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={globalColSpan}>
                        <Loader />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ) : errorMessage ? (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={globalColSpan}>
                        {errorMessage}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ) : !rowData?.length ? (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={globalColSpan}>
                        No Data Found
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ) : (
                  <Droppable droppableId="droppable-operator-table">
                    {(provided: any) => (
                      <TableBody
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {rowData?.map((row, index) => {
                          // Use row.id as the unique identifier instead of index
                          const uniqueId = `draggable-row-${row.id}`
                          return (
                            <Draggable
                              key={uniqueId}
                              draggableId={uniqueId}
                              index={index}
                            >
                              {(provided2: any, snapshot: any) => (
                                <TableRow
                                  ref={provided2.innerRef}
                                  {...provided2.draggableProps}
                                  style={{
                                    ...provided2.draggableProps.style,
                                    background: snapshot.isDragging
                                      ? "rgba(245,245,245, 0.75)"
                                      : "none",
                                    position: "relative",
                                    zIndex: snapshot.isDragging ? 1000 : "auto",
                                    opacity: snapshot.isDragging ? 0 : 1,
                                  }}
                                >
                                  <TableCell>
                                    <div {...provided2.dragHandleProps}>
                                      <Grid
                                        item
                                        sx={{
                                          display: "flex",
                                          cursor: "grab",
                                          "&:active": {
                                            cursor: "grabbing",
                                          },
                                          "& svg": {
                                            color: "#666",
                                            "&:hover": {
                                              color: "#4D74EF",
                                            },
                                          },
                                        }}
                                        alignItems="center"
                                      >
                                        <DragIndicator />
                                      </Grid>
                                    </div>
                                  </TableCell>
                                  {isCheckboxSelector && (
                                    <TableCell key={uuid()}>
                                      <Checkbox
                                        checked={isIndexCheckboxChecked[index]}
                                        onChange={(event) => {
                                          const checkboxCheckedList: boolean[] =
                                            [
                                              ...isIndexCheckboxChecked.map(
                                                (
                                                  value: boolean,
                                                  valueIndex,
                                                ) => {
                                                  if (valueIndex === index) {
                                                    return event.target.checked
                                                  }
                                                  return value
                                                },
                                              ),
                                            ]
                                          setIsIndexCheckboxChecked(
                                            checkboxCheckedList,
                                          )
                                        }}
                                      />
                                    </TableCell>
                                  )}
                                  {columns.map(
                                    (column) =>
                                      column.id !== "reorder" && (
                                        <TableCellSelector
                                          index={index}
                                          key={column.id}
                                          columnName={column.id}
                                          rowData={row}
                                          totalRowCount={rowData.length}
                                          executeAction={executeAction}
                                          activeActionItems={activeActionItems}
                                        />
                                      ),
                                  )}
                                  {isRadioSelector && (
                                    <TableCell key={uuid()}>
                                      <Radio
                                        name="radio"
                                        value={index}
                                        checked={checkedRadioIndexs[index]}
                                        onChange={() => {
                                          let currentSelectedRow = null
                                          const updatedRadioList =
                                            checkedRadioIndexs.map(
                                              (_value, idx) => {
                                                if (idx === index) {
                                                  currentSelectedRow =
                                                    rowData[index]
                                                  return true
                                                }
                                                return false
                                              },
                                            )
                                          setCheckedRadioIndexs(
                                            updatedRadioList,
                                          )
                                          setSelectedRadioRow(
                                            currentSelectedRow,
                                          )
                                        }}
                                      />
                                    </TableCell>
                                  )}
                                </TableRow>
                              )}
                            </Draggable>
                          )
                        })}
                        <div style={{ display: "none" }}>
                          {provided.placeholder}
                        </div>
                      </TableBody>
                    )}
                  </Droppable>
                )}
              </Table>
            </TableContainer>
          </Grid>
          <Grid item>
            {!isLoading &&
            !errorMessage &&
            isPagination &&
            Boolean(rowData?.length) ? (
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
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </Grid>
    </DragDropContext>
  )
}

export default DraggableTable

DraggableTable.defaultProps = {
  page: 0,
  totalPages: 0,
  totalCount: 0,
  isStyles: false,
  isTableHeader: true,
  stickyHeader: false,
  isBorderBottomRequired: true,
  showTablePagination: false,
  isLoading: false,
  errorMessage: "",
  pageChange: () => {},
  isPageStartsFromZero: false,
  handleChangeRowsPerPage: () => {},
  pageSize: 10,
  isCheckboxSelector: false,
  setSelectedIndex: () => {},
  setSelectedRowData: () => {},
  dateFilter: () => {},
  maxHeight: undefined,
  executeAction: () => {},
  rowPriorityHandler: () => {},
  activeActionItems: [],
  isRadioSelector: false,
  setSelectedRow: () => {},
  radioHeaderLabel: "Action",
  emptySelectedIndex: false,
  tableSize: "medium",
  isRowPerPageManualOptions: false,
  rowPerPageManualOptions: [],
  isInitialallyChecked: false,
  tableClass: "",
  tablePagination: "",
  onOrderChange: () => {},
}
