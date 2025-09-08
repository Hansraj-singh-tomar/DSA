import { Grid } from "@mui/material"
import StyledButton from "app/components/zamtel-ui/styled/StyledButton"
import Tables1 from "app/components/zamtel-ui/Table/Tables1"
import { Column, Row } from "app/models/Table"
import { useEffect, useState } from "react"
import StyledButtonOutline from "app/components/zamtel-ui/styled/StyledButtonOutlineSecondary"

interface IProps {
  tableColumns: Column[]
  allRowDataList: Row[]
  handleBack: () => void
  saveRowChanges: (data?: any) => void
  hideColumnList: string[]
  tableLoaded?: boolean
  errorMessage?: string
  orderKeyName?: string
}

const swapElements = (
  arr: any,
  i1: number,
  i2: number,
  orderKeyName: string | undefined,
) => {
  if (orderKeyName) {
    ;[arr[i1][orderKeyName], arr[i2][orderKeyName]] = [
      arr[i2][orderKeyName],
      arr[i1][orderKeyName],
    ]
  }
  // arr[i2].order = arr[i1].order
  const temp = arr[i1]
  arr[i1] = arr[i2]
  arr[i2] = temp
  return arr
}

function ReorderTableWithStaticPagination({
  tableColumns,
  hideColumnList,
  allRowDataList,
  handleBack,
  saveRowChanges,
  tableLoaded,
  errorMessage,
  orderKeyName,
}: IProps) {
  const pageSize = 999999
  const [column, setColumn] = useState<Column[]>([])
  const [totalRowData, setTotalRowData] = useState<Row[]>(allRowDataList)
  const [rowData, setRowData] = useState<Row[]>([])
  const [paginationData, setPaginationData] = useState({
    currentPage: 0,
    totalRecordsPerPage: pageSize,
    totalRecords: allRowDataList.length,
    totalPages: Math.round(allRowDataList.length / pageSize),
  })
  //  const [tableLoaded, setIsTableLoading] = useState(false)
  // const [tableErrorMessage, setTableErrorMessage] = useState("")

  const handleChangeRowsPerPage = () => {
    const startIndex = 0
    const endIndex = startIndex + pageSize
    const rowDataSliced = totalRowData.slice(startIndex, endIndex)

    setRowData([...rowDataSliced])
    setPaginationData((data) => {
      return {
        ...data,
        currentPage: 0,
        totalRecordsPerPage: pageSize,
        totalPages: Math.ceil(data.totalRecords / pageSize),
      }
    })
  }

  const rowPriorityHandler = (index1: number, index2: number) => {
    const startIndex =
      paginationData.currentPage * paginationData.totalRecordsPerPage
    const endIndex = startIndex + paginationData.totalRecordsPerPage
    let newAddAttribute1 = [...totalRowData]
    const i1 =
      paginationData.currentPage * paginationData.totalRecordsPerPage + index1
    const i2 =
      paginationData.currentPage * paginationData.totalRecordsPerPage + index2
    if (
      newAddAttribute1[i1].isReorderEnabled !== false &&
      newAddAttribute1[i2].isReorderEnabled !== false
    )
      newAddAttribute1 = swapElements(newAddAttribute1, i1, i2, orderKeyName)
    setTotalRowData([...newAddAttribute1])
    // row data added
    const rowDataSliced = newAddAttribute1.slice(startIndex, endIndex)
    setRowData([...rowDataSliced])
  }

  useEffect(() => {
    handleChangeRowsPerPage()
    const filteredColumnList: Column[] =
      tableColumns?.filter((data) => !hideColumnList.includes(data.id)) || []
    setColumn([
      {
        id: "sortOrderWithPagination",
        label: "Row Order",
        align: "left",
        width: "12%",
      },
      ...filteredColumnList,
    ])
    // setTotalRowData((data) => [...data.sort((a, b) => a.order - b.order)])
  }, [])

  const handlePageChange = (pageSelected: number) => {
    const startIndex = pageSelected * paginationData.totalRecordsPerPage
    const endIndex = startIndex + paginationData.totalRecordsPerPage
    const rowDataSliced = totalRowData.slice(startIndex, endIndex)
    setRowData([...rowDataSliced])
    setPaginationData((data) => {
      return { ...data, currentPage: pageSelected }
    })
  }

  return (
    <>
      <Tables1
        columns={column}
        rowData={rowData}
        isPagination={false}
        page={paginationData.currentPage + 1}
        totalPages={paginationData.totalPages}
        pageChange={handlePageChange}
        totalCount={paginationData.totalRecords}
        pageSize={paginationData.totalRecordsPerPage}
        errorMessage={errorMessage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        isLoading={tableLoaded}
        rowPriorityHandler={rowPriorityHandler}
      />
      <Grid item display="flex" justifyContent="flex-start" gap={2} p={2}>
        <StyledButtonOutline
          variant="outlined"
          type="reset"
          onClick={handleBack}
          style={{
            height: "40px",
            fontWeight: 400,
          }}
        >
          Cancel
        </StyledButtonOutline>
        <StyledButton
          variant="contained"
          type="submit"
          style={{
            height: "40px",
            fontWeight: 400,
          }}
          onClick={() => {
            if (!tableLoaded && rowData.length !== 0) {
              saveRowChanges(totalRowData)
            }
          }}
          disabled={rowData.length === 0 || tableLoaded}
        >
          Save
        </StyledButton>
      </Grid>
    </>
  )
}

ReorderTableWithStaticPagination.defaultProps = {
  tableLoaded: false,
  errorMessage: "",
  orderKeyName: "priority",
}

export default ReorderTableWithStaticPagination
