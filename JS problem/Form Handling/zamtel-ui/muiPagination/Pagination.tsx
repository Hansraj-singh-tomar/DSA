import TablePagination from "@mui/material/TablePagination"
// import PopupState, { bindPopper } from "material-ui-popup-state"
import {
  Grid,
  Pagination,
  TableFooter,
  // Popper,
  // Fade,
  // Paper,
  // ClickAwayListener,
} from "@mui/material"
import React from "react"

interface PaginationProps {
  count: number | undefined
  page: number | undefined
  totalCount?: number | undefined
  fromMerchantCategory?: boolean
  // onClickPageChange?: (value: number) => void
}

function GlobalPagination({
  count,
  page,
  totalCount,
  fromMerchantCategory,
}: // onClickPageChange,
// onPageChange,
PaginationProps) {
  // const [open, setOpen] = useState(false)
  // const anchorRef = useRef<HTMLButtonElement>(null)
  const [pageValue, setPageValue] = React.useState(page)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    console.log(newPage)
    // onClickPageChange(newPage)
    // setPageValue(newPage)
  }

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number,
  ) => {
    setPageValue(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPageValue(0)
  }

  return (
    <Grid container alignItems="center" justifyContent="space-between">
      {fromMerchantCategory === true ? null : (
        <Grid item xs={6}>
          <TableFooter>
            {/* <PopupState variant="popper" popupId="pagination-popper">
            {(popupState) => ( */}
            {/* <Popper {...bindPopper(popupState)} transition>
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={180}> */}

            {/* <Popper open={open} anchorEl={anchorRef.current} placement="bottom">
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <Grid onClick={handleToggle}> */}
            <TablePagination
              rowsPerPageOptions={[10, 15, 20]}
              component="div"
              backIconButtonProps={{
                style: { display: "none" },
              }}
              nextIconButtonProps={{
                style: { display: "none" },
              }}
              showFirstButton={false}
              showLastButton={false}
              count={totalCount || 0}
              page={pageValue || 0}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {/* </Grid>
              </ClickAwayListener>
            </Paper>
          </Popper> */}
            {/* </Fade>
                )}
              </Popper>
            )} */}
            {/* </PopupState> */}
          </TableFooter>
        </Grid>
      )}
      {/* <Grid item> */}
      <Grid
        container
        justifyContent="flex-end"
        xs={fromMerchantCategory ? 12 : 6}
      >
        <Pagination
          count={count}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </Grid>
      {/* </Grid> */}
    </Grid>
  )
}

export default GlobalPagination

GlobalPagination.defaultProps = {
  fromMerchantCategory: false,
  totalCount: 0,
  // onClickPageChange: () => {},
}
