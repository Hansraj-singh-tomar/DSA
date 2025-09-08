import { Button, ClickAwayListener, Grow, Paper, Popper } from "@mui/material"
// import { ReactComponent as FilterIconWhite } from "assets/images/filtericonnew.svg"
import { RefObject, useEffect, useRef } from "react"
import { UseFormReturn } from "react-hook-form"
import { ReactComponent as SortIcon } from "assets/images/sortIcon.svg"
// import StyledButton from "app/components/zamtel-ui/styled/StyledButton"

interface IProps {
  methods?: UseFormReturn
  isFilterSelected: boolean
  filterMenuItem: any
  tableLoaded?: boolean
  open: boolean
  handleToggle: () => void
  setOpen: (val: boolean) => void
}

type TFilterButtonType = {
  anchorRef: RefObject<HTMLButtonElement>
  open: boolean
  isFilterSelected: boolean
  handleToggle: () => void
}

function FilterButton({
  anchorRef,
  open,
  isFilterSelected,
  handleToggle,
}: TFilterButtonType) {
  if (isFilterSelected) {
    return (
      <Button
        style={{
          // borderRadius: "15px",
          border: "none",
          // textTransform: "none",
          // color: "#000",
          // textAlign: "center",
          // fontSize: "12px",
          // fontStyle: "normal",
          // fontWeight: "500",
          // lineHeight: "100%" /* 12px */,
          // width: "112px",
          // height: "42px",
        }}
        // className="filterSelectedButton"
        ref={anchorRef}
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        variant="outlined"
        startIcon={
          <SortIcon
            style={{
              width: "20px", // Set your desired width
              height: "30px", // Set your desired height
              // position: "relative",
              boxSizing: "content-box",
              // marginRight: "2",
            }}
          />
        }
      >
        {/* Filter */}
      </Button>
    )
  }
  return (
    <Button
      style={{
        // color: "#000000DE",
        // borderRadius: "15px",
        border: "none",
        // textTransform: "none",
        // textAlign: "center",
        // fontSize: "12px",
        // fontStyle: "normal",
        // fontWeight: "500",
        // width: "112px",
        // height: "42px",
      }}
      ref={anchorRef}
      aria-controls={open ? "composition-menu" : undefined}
      aria-expanded={open ? "true" : undefined}
      aria-haspopup="true"
      onClick={handleToggle}
      variant="outlined"
      startIcon={
        <SortIcon
          style={{
            width: "20px", // Set your desired width
            height: "30px", // Set your desired height
            // position: "relative",
            boxSizing: "content-box",
            // marginRight: "2",
          }}
        />
      }
    >
      {/* Filter */}
    </Button>
  )
}

function Filter({
  methods,
  isFilterSelected,
  filterMenuItem,
  tableLoaded,
  open,
  setOpen,
  handleToggle,
}: IProps) {
  // const { watch } = methods
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const values = watch()
  console.log(methods)
  // const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)

  // const handleToggle = () => {
  //   setOpen((prevOpen) => !prevOpen)
  // }

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }

    setOpen(false)
  }

  useEffect(() => {
    if (tableLoaded) {
      setOpen(false)
    }
  }, [tableLoaded])

  return (
    <div style={{ float: "right" }} className="filterbutton">
      <FilterButton
        anchorRef={anchorRef}
        open={open}
        isFilterSelected={isFilterSelected}
        handleToggle={handleToggle}
      />
      <Popper
        className="filterPopper"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        style={{ zIndex: 1 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                {/* <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  style={{ opacity: 1 }}
                  ref={menuListRef}
                > */}
                <div>{filterMenuItem}</div>
                {/* </MenuList> */}
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}

Filter.defaultProps = {
  tableLoaded: false,
  methods: {},
}

export default Filter
