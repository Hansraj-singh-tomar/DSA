import { Grid } from "@mui/material"
import { ReactNode } from "react"
import CommonCard from "../card/Card"

type ColumnType = {
  columnHeight?: number
  columnComponent?: ReactNode
  belowGapHeight?: number
  bodyComponent?: ReactNode
  footerComponent?: ReactNode
}
type TProps = {
  columns: ColumnType[]
  wrapperClass?: string
  wrapperCardClass?: string
  tableColumnClass?: string
}

// const CustomToolbar2 = styled(Toolbar)({
//   display: "flex",
//   width: "100%",
//   background: "#F2F2F2",
// })

function ColumnWrapper({
  columns,
  wrapperClass,
  wrapperCardClass,
  tableColumnClass,
}: TProps) {
  let totalColumnHeight = 0
  const renderColumn = () => {
    const columnArray: any[] = []
    for (let i = 0; i < columns.length; i += 1) {
      if (i === columns.length - 1) {
        columnArray.push(
          <CommonCard cardClass={tableColumnClass}>
            <Grid
              container
              direction="column"
              justifyContent="space-between"
              style={{
                height: `calc(86% - ${totalColumnHeight}px)`,
                flexWrap: "nowrap",
              }}
              key={i}
            >
              <Grid item>{columns[i]?.bodyComponent}</Grid>
              <Grid item>{columns[i]?.footerComponent}</Grid>
            </Grid>
          </CommonCard>,
        )
      } else {
        totalColumnHeight +=
          (columns[i]?.columnHeight || 0) + (columns[i]?.belowGapHeight || 0)
        columnArray.push(
          <CommonCard cardClass={wrapperCardClass}>
            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
                height: columns[i].columnHeight,
              }}
            >
              {columns[i].columnComponent}
            </Grid>
            {/* <Grid item>
              <CustomToolbar2
                style={{
                  minHeight: columns[i].belowGapHeight,
                  height: columns[i].belowGapHeight,
                }}
              />
            </Grid> */}
          </CommonCard>,
        )
      }
    }
    return columnArray
  }

  return (
    <Grid
      container
      direction="column"
      rowGap={2}
      className={wrapperClass}
      // justifyContent="center"
      // flexWrap="nowrap"
    >
      {renderColumn()}
    </Grid>
  )
}

ColumnWrapper.defaultProps = {
  wrapperClass: "",
  wrapperCardClass: "",
  tableColumnClass: "",
}

export default ColumnWrapper
