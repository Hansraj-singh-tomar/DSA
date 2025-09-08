import TablePagination from "@mui/material/TablePagination"
import { Box, Grid, Pagination } from "@mui/material"
import React from "react"

interface PaginationProps {
  count: number | undefined
  page: number | undefined
  totalCount?: number | undefined
  showTablePagination?: boolean
  onClickPageChange: (value: number) => void
  handleChangeRowsPerPage?: (pageSize: number) => void
  pageSize: number | undefined
  isRowPerPageManualOptions?: boolean
  rowPerPageManualOptions?: number[]
  paginationClass?: string
}

function GlobalPagination({
  count,
  page,
  totalCount,
  showTablePagination,
  onClickPageChange,
  handleChangeRowsPerPage,
  pageSize,
  isRowPerPageManualOptions,
  rowPerPageManualOptions,
  paginationClass,
}: PaginationProps) {
  const [pageValue, setPageValue] = React.useState(page)
  const [pageSizeValue, setPageSizeValue] = React.useState(pageSize)

  // Keep pageValue in sync with page prop (convert 0-based to 1-based)
  React.useEffect(() => {
    setPageValue(page)
  }, [page])

  // Keep pageSizeValue in sync with pageSize prop
  React.useEffect(() => {
    setPageSizeValue(pageSize)
  }, [pageSize])
  const handleChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    onClickPageChange(newPage - 1)
    setPageValue(newPage)
  }
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number,
  ) => {
    setPageValue(newPage)
  }
  const onRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newPageSize = parseInt(event.target.value, 10)
    setPageSizeValue(newPageSize)
    handleChangeRowsPerPage?.(newPageSize)
  }
  // Calculate the effective page size to display (rounded up to nearest 10 if limited by total records)
  const getEffectivePageSize = (): number => {
    if (!pageSizeValue || !totalCount) return pageSizeValue || 10

    const limitedByRecords = totalCount < pageSizeValue
    if (limitedByRecords) {
      // Round up to nearest 10 (42 records → 50 page size)
      return Math.ceil(totalCount / 10) * 10
    }
    return pageSizeValue
  }

  const getPerPageOptions = (): number[] => {
    let pages = []
    if (isRowPerPageManualOptions && rowPerPageManualOptions) {
      pages = rowPerPageManualOptions
    } else {
      // Generate standard options in gaps of 10, limited by total count
      const standardOptions = [10, 20, 30, 40, 50, 100, 200, 500]

      if (totalCount && totalCount > 0) {
        // Round up total count to nearest 10 (e.g., 55 → 60)
        const maxReasonableOption = Math.ceil(totalCount / 10) * 10

        // Filter standard options to only include those up to the max reasonable option
        pages = standardOptions.filter(
          (option) => option <= maxReasonableOption,
        )

        // Add the max reasonable option if it's not already included
        if (
          !pages.includes(maxReasonableOption) &&
          maxReasonableOption <= 10000
        ) {
          pages.push(maxReasonableOption)
        }
      } else {
        // If no total count, use all standard options
        pages = [...standardOptions]
      }

      // Add the effective page size if it's not already in the options
      const effectivePageSize = getEffectivePageSize()
      if (effectivePageSize > 0 && !pages.includes(effectivePageSize)) {
        pages.push(effectivePageSize)
      }

      // Sort the pages in ascending order
      pages.sort((a, b) => a - b)
    }
    return pages
  }
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      className={paginationClass}
    >
      <Grid item>
        {showTablePagination === true ? null : (
          <TablePagination
            rowsPerPageOptions={getPerPageOptions()}
            component={Box}
            backIconButtonProps={{
              style: { display: "none" },
            }}
            nextIconButtonProps={{
              style: { display: "none" },
            }}
            showFirstButton={false}
            showLastButton={false}
            count={totalCount || 0}
            page={pageValue ? pageValue - 1 : 0}
            onPageChange={handleChangePage}
            rowsPerPage={getEffectivePageSize()}
            onRowsPerPageChange={onRowsPerPageChange}
            SelectProps={{
              native: true,
              inputProps: {
                "aria-label": "page number",
              },
            }}
            labelDisplayedRows={({ from, to, count: total }) =>
              `${from}-${to} of ${total} items`
            }
          />
        )}
      </Grid>
      <Grid item>
        <Pagination
          count={count}
          page={pageValue || 1}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
          color="primary"
        />
      </Grid>
    </Grid>
  )
}

export default GlobalPagination

GlobalPagination.defaultProps = {
  showTablePagination: true,
  totalCount: 0,
  handleChangeRowsPerPage: () => {},
  isRowPerPageManualOptions: false,
  rowPerPageManualOptions: [],
  paginationClass: "",
}
