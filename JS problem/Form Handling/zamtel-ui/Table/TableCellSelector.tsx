/* eslint-disable no-nested-ternary */
import { Grid, IconButton, TableCell, Radio, Checkbox } from "@mui/material"
import { Column, Row } from "app/models/Table"
import { ReactComponent as UpArrow } from "assets/images/upArrow.svg"
import { ReactComponent as DownArrow } from "assets/images/downArrow.svg"
import { ReactComponent as UpArrowDisable } from "assets/images/upArrowDisable.svg"
import { ReactComponent as DownArrowDisable } from "assets/images/downArrowDisable.svg"

import "./TableCellSelector.scss"

interface IProps {
  columnName: string
  rowData: Row
  align?: "center" | "left" | "right" | "justify" | "inherit" | undefined
  index: number
  executeAction?: (index: number) => void
  activeActionItems?: boolean[]
  totalRowCount: number
  rowPriorityHandler?: (index1: number, index2: number) => void
  totalCount?: number | null
  currentPage?: number | null
}

function TableCellSelector({
  columnName,
  rowData,
  totalRowCount,
  index,
  executeAction,
  activeActionItems,
  rowPriorityHandler,
  totalCount,
  currentPage,
}: IProps) {
  function SxSelector(row: Row) {
    let statusColor = ""
    if (row.activated) {
      statusColor = "#009943"
    }
    if (
      (row.uploadStatus === "Alert" ||
        row.uploadStatus === "Failure" ||
        row.uploadStatus === "Error") &&
      row.isTagFlow === true
    )
      statusColor = "red"
    return statusColor
  }

  function statusClassSelector(status: any, row: any) {
    let finalStatus: any = ""
    if (status && status !== null) {
      finalStatus =
        // eslint-disable-next-line no-nested-ternary
        status?.toUpperCase() === "COMPLETED" ||
        status?.toUpperCase() === "APPROVED" ||
        status?.toUpperCase() === "SUCCESS" ||
        status?.toUpperCase() === "VALID" ||
        (status?.toUpperCase() === "ACTIVE" && row?.fromRoleMatrix) ||
        status?.toUpperCase() === "ACTIVE" ||
        status?.toUpperCase() === "APPROVED BY BO" ||
        status?.toUpperCase() === "PUBLISHED" ||
        status?.toUpperCase().includes("APPROVED") ||
        status?.toUpperCase() === "VALIDATION_COMPLETED" ||
        status?.toUpperCase() === "COMPLETE_PAYMENT" ||
        status?.toUpperCase() === "ACTIVATED"
          ? "green"
          : status?.toUpperCase() === "PENDING" ||
            status?.toUpperCase() === "SCHEDULED" ||
            status?.toUpperCase() === "DUPLICATE" ||
            status?.toUpperCase() === "PENDING AT BO" ||
            status?.toUpperCase() === "PARKED" ||
            status?.toUpperCase().includes("PENDING") ||
            status?.toUpperCase() === "DRAFT" ||
            status?.toUpperCase() === "PROCESSING" ||
            status?.toUpperCase() === "SEND_FOR_APPROVAL" ||
            status?.toUpperCase() === "INITIATED" ||
            status?.toUpperCase() === "INITIATE PAYMENT"
          ? "yellow"
          : status?.replace(/[^a-zA-Z0-9]/g, "").toUpperCase() === "NA"
          ? "grey"
          : "red"
    } else {
      finalStatus = "red"
    }
    return finalStatus
  }

  switch (columnName) {
    case "publishStatus":
      return (
        <TableCell
          align="left"
          key={columnName}
          className="tableCell"
          style={{ paddingLeft: 0 }}
        >
          <Grid
            container
            alignItems="flex-start"
            spacing={1}
            className="tableCellStatus"
          >
            <Grid item>
              <IconButton
                sx={{ padding: "3.3px" }}
                className={`indicator${
                  // eslint-disable-next-line no-nested-ternary
                  rowData[columnName] === "Published" ? "green" : "red"
                }`}
              />
            </Grid>
            <Grid item>{rowData[columnName]}</Grid>
          </Grid>
        </TableCell>
      )
    case "processingStatus":
      return (
        <TableCell
          align="left"
          key={columnName}
          className="tableCell"
          style={{ paddingLeft: 0 }}
        >
          <Grid
            container
            alignItems="flex-start"
            spacing={1}
            className="tableCellStatus"
          >
            <Grid item>
              <IconButton
                sx={{ padding: "3.3px" }}
                className={`indicator${
                  // eslint-disable-next-line no-nested-ternary
                  rowData[columnName] === "completed"
                    ? "green"
                    : rowData[columnName] === "error"
                    ? "red"
                    : "blue"
                }`}
              />
            </Grid>
            <Grid item>{rowData[columnName]}</Grid>
          </Grid>
        </TableCell>
      )
    case "whitelistedStatus":
      return (
        <TableCell
          align="left"
          key={columnName}
          className="tableCell"
          style={{ paddingLeft: 0 }}
        >
          <Grid
            container
            alignItems="flex-start"
            spacing={1}
            className="tableCellStatus"
          >
            <Grid item>
              <IconButton
                sx={{ padding: "3.3px" }}
                className={`indicator${
                  // eslint-disable-next-line no-nested-ternary
                  rowData[columnName] === "WHITELISTED"
                    ? "green"
                    : rowData[columnName] === "PENDING"
                    ? "yellow"
                    : ""
                }`}
              />
            </Grid>
            <Grid item>{rowData[columnName]}</Grid>
          </Grid>
        </TableCell>
      )
    case "status":
    case "refundStatus":
      return (
        <TableCell align="left" key={columnName} className="tableCell">
          <Grid
            className="tableCellStatus"
            container
            alignItems="flex-start"
            spacing={1}
          >
            <Grid item>
              <IconButton
                sx={{ padding: "3.3px" }}
                className={`indicator${statusClassSelector(
                  rowData[columnName],
                  rowData,
                )}`}
              />
            </Grid>
            <Grid
              item
              sx={{
                color: () => {
                  return SxSelector(rowData)
                },
              }}
            >
              {rowData[columnName]}
            </Grid>
          </Grid>
        </TableCell>
      )
    case "approvalStatus":
      return (
        <TableCell align="left" key={columnName} className="tableCell">
          <Grid
            container
            alignItems="flex-start"
            spacing={1}
            className="tableCellStatus"
          >
            <Grid item>
              <IconButton
                sx={{ padding: "3.3px" }}
                className={`indicator${
                  // eslint-disable-next-line no-nested-ternary
                  rowData[columnName]?.toUpperCase() === "APPROVED" ||
                  rowData[columnName] === "Activated" ||
                  rowData[columnName]?.toUpperCase() === "ACTIVE" ||
                  rowData[columnName]?.toUpperCase() === "REVERSED" ||
                  rowData[columnName]?.toUpperCase() ===
                    "VALIDATION_COMPLETED" ||
                  rowData[columnName]?.toUpperCase() === "COMPLETED"
                    ? "green"
                    : rowData[columnName]?.toUpperCase() === "SUSPENDED" ||
                      rowData[columnName]?.toUpperCase() === "CANCELLED"
                    ? "grey"
                    : rowData[columnName]?.toUpperCase() ===
                        "REVERSED_REJECTED" ||
                      rowData[columnName]?.toUpperCase() === "REJECTED" ||
                      rowData[columnName]?.toUpperCase() === "DISCARDED" ||
                      rowData[columnName]?.toUpperCase() === "CANCEL" ||
                      rowData[columnName]?.toUpperCase() === "REVERSAL REJECTED"
                    ? "red"
                    : "yellow"
                }`}
              />
            </Grid>
            <Grid item sx={rowData?.activated ? { color: "#009943" } : {}}>
              {rowData[columnName]}
            </Grid>
          </Grid>
        </TableCell>
      )
    case "appMgmtApprovalStatus":
      return (
        <TableCell align="left" key={columnName} className="tableCell">
          <Grid
            container
            alignItems="flex-start"
            spacing={1}
            className="tableCellStatus"
          >
            <Grid item>
              <IconButton
                sx={{ padding: "3.3px" }}
                className={`indicator${
                  rowData[columnName]?.includes("APPROVED")
                    ? "green"
                    : rowData[columnName]?.includes("PENDING")
                    ? "yellow"
                    : "red"
                }`}
              />
            </Grid>
            <Grid item sx={rowData?.activated ? { color: "#009943" } : {}}>
              {rowData[columnName]}
            </Grid>
          </Grid>
        </TableCell>
      )
    case "collectionServiceApprovalStatus":
      return (
        <TableCell align="left" key={columnName} className="tableCell">
          <Grid
            container
            alignItems="flex-start"
            spacing={1}
            className="tableCellStatus"
          >
            <Grid item>
              <IconButton
                sx={{ padding: "3.3px" }}
                className={`indicator${
                  rowData[columnName]?.includes("APPROVED")
                    ? "green"
                    : rowData[columnName]?.includes("PENDING")
                    ? "yellow"
                    : "red"
                }`}
              />
            </Grid>
            <Grid item sx={rowData?.activated ? { color: "#009943" } : {}}>
              {rowData[columnName]}
            </Grid>
          </Grid>
        </TableCell>
      )
    case "addMoneyApprovalStatus":
      return (
        <TableCell align="left" key={columnName} className="tableCell">
          <Grid
            container
            alignItems="flex-start"
            spacing={1}
            className="tableCellStatus"
          >
            <Grid item>
              <IconButton
                sx={{ padding: "3.3px" }}
                className={`indicator${
                  rowData[columnName]?.toUpperCase()?.includes("APPROVED")
                    ? "green"
                    : rowData[columnName]?.toUpperCase()?.includes("PENDING")
                    ? "yellow"
                    : "red"
                }`}
              />
            </Grid>
            <Grid item sx={rowData?.activated ? { color: "#009943" } : {}}>
              {rowData[columnName]?.toUpperCase() === "APPROVED"
                ? "Approved"
                : rowData[columnName]?.toUpperCase() === "PENDING"
                ? "Approval Pending"
                : rowData[columnName]?.toUpperCase() ===
                  "REACTIVATIONAPPROVALPENDING"
                ? "Re-Activation Approval Pending"
                : rowData[columnName]?.toUpperCase() === "REJECTED"
                ? "Rejected"
                : rowData[columnName]}
            </Grid>
          </Grid>
        </TableCell>
      )

    case "currentStatus":
      return (
        <TableCell align="left" key={columnName} className="tableCell">
          <Grid
            container
            alignItems="flex-start"
            spacing={1}
            className="tableCellStatus"
          >
            <Grid item>
              <IconButton
                sx={{ padding: "3.3px" }}
                className={`indicator${
                  // eslint-disable-next-line no-nested-ternary
                  rowData[columnName] === "Approved" ||
                  rowData[columnName] === "Activated"
                    ? "green"
                    : "grey"
                }`}
              />
            </Grid>
            <Grid item sx={rowData?.activated ? { color: "#009943" } : {}}>
              {rowData[columnName]}
            </Grid>
          </Grid>
        </TableCell>
      )

    case "batchStatus":
      return (
        <TableCell
          align="left"
          key={columnName}
          className="tableCell"
          sx={{ minWidth: 150 }}
        >
          <Grid
            container
            alignItems="flex-start"
            spacing={1}
            className="tableCellStatus"
          >
            <Grid item>
              <IconButton
                sx={{ padding: "3.3px" }}
                className={`indicator${
                  // eslint-disable-next-line no-nested-ternary
                  rowData[columnName].toUpperCase() === "APPROVED" ||
                  rowData[columnName].toUpperCase() === "APPROVED BY BO" ||
                  rowData[columnName].toUpperCase().includes("COMPLETED")
                    ? "green"
                    : // eslint-disable-next-line no-nested-ternary
                    rowData[columnName].toUpperCase() === "REJECTED" ||
                      rowData[columnName].toUpperCase() === "REJECTED BY BO" ||
                      rowData[columnName].toUpperCase() === "DISCARD" ||
                      rowData[columnName].toUpperCase() === "DISCARDED"
                    ? "grey"
                    : rowData[columnName] === "PENDING_APPROVAL" ||
                      rowData[columnName] === "Pending Approval" ||
                      rowData[columnName].toUpperCase() === "PENDING AT BO" ||
                      rowData[columnName].toUpperCase().includes("PENDING") ||
                      rowData[columnName]?.toUpperCase() === "DRAFT" ||
                      rowData[columnName].toUpperCase() === "APPROVAL PENDING"
                    ? "grey"
                    : "grey"
                }`}
              />
            </Grid>
            <Grid item>{rowData[columnName]}</Grid>
          </Grid>
        </TableCell>
      )
    case "executionStatus":
      return (
        <TableCell
          align="left"
          key={columnName}
          className="tableCell"
          sx={{ minWidth: 210 }}
        >
          <Grid
            container
            alignItems="flex-start"
            spacing={1}
            className="tableCellStatus"
          >
            <Grid item>
              <IconButton
                sx={{ padding: "3.3px" }}
                className={`indicator${
                  // eslint-disable-next-line no-nested-ternary
                  rowData[columnName].toUpperCase() === "APPROVED" ||
                  rowData[columnName].toUpperCase() === "APPROVED BY BO" ||
                  rowData[columnName].toUpperCase().includes("COMPLETED")
                    ? "green"
                    : // eslint-disable-next-line no-nested-ternary
                    rowData[columnName].toUpperCase() === "REJECTED" ||
                      rowData[columnName].toUpperCase() === "REJECTED BY BO" ||
                      rowData[columnName].toUpperCase() === "DISCARD" ||
                      rowData[columnName].toUpperCase() === "DISCARDED"
                    ? "grey"
                    : rowData[columnName] === "PENDING_APPROVAL" ||
                      rowData[columnName] === "Pending Approval" ||
                      rowData[columnName].toUpperCase() === "PENDING AT BO" ||
                      rowData[columnName].toUpperCase().includes("PENDING") ||
                      rowData[columnName]?.toUpperCase() === "DRAFT" ||
                      rowData[columnName].toUpperCase() === "APPROVAL PENDING"
                    ? "grey"
                    : "grey"
                }`}
              />
            </Grid>
            <Grid item>{rowData[columnName]}</Grid>
          </Grid>
        </TableCell>
      )
    case "limitHeadChild":
      return (
        <TableCell align="left" key={columnName} className="tableCell">
          {rowData[columnName].length === 1 && (
            <Grid>{rowData[columnName][0].childLimitHeadNameEn}</Grid>
          )}
          {rowData[columnName].length > 1 && (
            <Grid>{`${rowData[columnName].length} Transaction Tagged`}</Grid>
          )}
        </TableCell>
      )
    case "actionOptions":
      if (rowData[columnName].isSelector) {
        const checked = activeActionItems ? activeActionItems[index] : false
        if (rowData[columnName].selectorType === "radio") {
          return (
            <TableCell key={columnName}>
              <Radio
                checked={checked}
                onClick={() => {
                  if (executeAction) executeAction(index)
                }}
              />
            </TableCell>
          )
        }
        if (rowData[columnName].selectorType === "checkbox") {
          return (
            <TableCell key={columnName}>
              <Checkbox
                checked={checked}
                onClick={() => {
                  if (executeAction) executeAction(index)
                }}
              />
            </TableCell>
          )
        }
      }
      return <Grid />
    case "saveBillDisplayAttribute":
      return (
        <TableCell align="left" key={columnName}>
          {rowData[columnName] !== undefined && (
            <Radio
              checked={rowData[columnName]}
              onClick={() => {
                if (executeAction) executeAction(index)
              }}
            />
          )}
        </TableCell>
      )

    case "visibleToUser":
    case "isVisibleTouser":
    case "isVisibleToUser":
    case "printInReceipt":
    case "isPrintInReceipt":
    case "partOfSavedBill":
    case "isPrintReceipt":
    case "isPartOfSavedBill":
      return (
        <TableCell align="left" key={columnName} className="tableCell">
          <Checkbox disabled checked={rowData[columnName]} />
        </TableCell>
      )

    case "disbursementPriceCode":
    case "smsCode":
      // case "priceCode":
      return (
        <TableCell
          align="left"
          key={columnName}
          className="tableCell"
          onClick={rowData[columnName]?.onClick}
          sx={{
            color: "#4D74EF",
            textDecoration: "underLine",
            cursor: "pointer",
          }}
        >
          {rowData[columnName]?.cellValue}
        </TableCell>
      )
    case "migrationStatus":
    case "validationStatus":
      return (
        <TableCell align="left" key={columnName} className="tableCell">
          <Grid
            container
            alignItems="flex-start"
            spacing={1}
            className="tableCellStatus"
          >
            <Grid item>
              <IconButton
                sx={{ padding: "3.3px" }}
                className={`indicator${statusClassSelector(
                  rowData[columnName],
                  rowData,
                )}`}
              />
            </Grid>
            <Grid
              item
              sx={{
                color: () => {
                  return SxSelector(rowData)
                },
              }}
            >
              {rowData[columnName]}
            </Grid>
          </Grid>
        </TableCell>
      )
    case "disbursementStatus":
      return (
        <TableCell align="left" key={columnName} className="tableCell">
          <Grid
            container
            alignItems="flex-start"
            spacing={1}
            flexWrap="nowrap"
            className="tableCellStatus"
          >
            <Grid item>
              <IconButton
                sx={{ padding: "3.3px" }}
                className={
                  rowData[columnName]
                    ? `indicator${
                        // eslint-disable-next-line no-nested-ternary
                        rowData[columnName] === "Success" ||
                        rowData[columnName] === "success" ||
                        rowData[columnName] === "SUCCESS" ||
                        rowData[columnName] === "COMPLETED" ||
                        rowData[columnName]?.toLowerCase() === "completed"
                          ? "green"
                          : rowData[columnName]
                              ?.toUpperCase()
                              ?.includes("PENDING") ||
                            rowData[columnName] === "SCHEDULED"
                          ? "yellow"
                          : "red"
                      }`
                    : ""
                }
              />
            </Grid>
            <Grid item>{rowData[columnName]}</Grid>
          </Grid>
        </TableCell>
      )
    case "sortOrder":
      return (
        <TableCell align="left" key={columnName} className="tableCell">
          <IconButton>
            {index === 0 ? (
              <UpArrowDisable className="icon" />
            ) : (
              <UpArrow
                className="icon"
                onClick={() => {
                  if (rowPriorityHandler) {
                    rowPriorityHandler(index - 1, index)
                  }
                }}
              />
            )}
          </IconButton>
          <IconButton>
            {totalRowCount === index + 1 ? (
              <DownArrowDisable />
            ) : (
              <DownArrow
                className="icon"
                onClick={() => {
                  if (rowPriorityHandler) {
                    rowPriorityHandler(index + 1, index)
                  }
                }}
              />
            )}
          </IconButton>
        </TableCell>
      )

    case "sortOrderWithPagination":
      return (
        <TableCell align="left" key={columnName} className="tableCell">
          <IconButton disabled={rowData.isReorderEnabled === false}>
            {(index === 0 && currentPage === 1) ||
            rowData.isReorderEnabled === false ? (
              <UpArrowDisable className="icon" />
            ) : (
              <UpArrow
                className="icon"
                onClick={() => {
                  if (rowPriorityHandler) {
                    rowPriorityHandler(index - 1, index)
                  }
                }}
              />
            )}
          </IconButton>
          <IconButton disabled={rowData.isReorderEnabled === false}>
            {totalCount === index + 1 || rowData.isReorderEnabled === false ? (
              <DownArrowDisable className="icon" />
            ) : (
              <DownArrow
                className="icon"
                onClick={() => {
                  if (rowPriorityHandler) {
                    rowPriorityHandler(index + 1, index)
                  }
                }}
              />
            )}
          </IconButton>
        </TableCell>
      )
    case "visibility":
      return (
        <TableCell align="left" key={columnName} className="tableCell">
          <Grid
            container
            alignItems="flex-start"
            spacing={1}
            className="tableCellStatus"
          >
            <Grid item>
              <IconButton
                sx={{ padding: "3.3px" }}
                className={`indicator${
                  // eslint-disable-next-line no-nested-ternary
                  rowData[columnName]?.toUpperCase() === "ACTIVE"
                    ? "green"
                    : // eslint-disable-next-line no-nested-ternary
                    rowData[columnName]?.toUpperCase() === "INACTIVE"
                    ? "red"
                    : rowData[columnName] === "SCHEDULED"
                    ? "blue"
                    : "grey"
                }`}
              />
            </Grid>
            <Grid item>{rowData[columnName]}</Grid>
          </Grid>
        </TableCell>
      )
    default:
      if (typeof rowData[columnName] === "object") {
        return (
          <TableCell
            align={rowData[columnName]?.align}
            key={columnName}
            style={{
              cursor: rowData[columnName]?.onClick ? "pointer" : "initial",
              padding: 0,
              ...rowData[columnName]?.style,
            }}
            onClick={rowData[columnName]?.onClick}
            colSpan={rowData[columnName]?.colSpan}
            rowSpan={rowData[columnName]?.rowSpan}
            width={rowData[columnName]?.width}
          >
            {rowData[columnName]?.cellValue}
          </TableCell>
        )
      }
      return (
        <TableCell
          key={columnName}
          colSpan={rowData[columnName]?.colSpan}
          sx={{
            color: () => {
              return SxSelector(rowData)
            },
          }}
          // rowData?.activated ? { color: "#009943" } : { color: "" }}
        >
          {rowData[columnName]}
        </TableCell>
      )
  }
}

TableCellSelector.defaultProps = {
  align: "left",
  executeAction: () => {},
  rowPriorityHandler: () => {},
  activeActionItems: [],
  totalCount: null,
  currentPage: null,
}

export default TableCellSelector
export function HeadCellSelector(column: Column) {
  const { label, icon, colSpan, align, width, dateFilter, tooltip } = column

  const handleChangePage = () => {
    dateFilter()
  }

  return (
    <TableCell
      align={align}
      className="tableHeadCell"
      colSpan={colSpan}
      style={{
        cursor:
          label === "Date" || label === "Requested On" ? "pointer" : "initial",
        padding: 0,
        minWidth: width,
      }}
      onClick={() => {
        if (label === "Date" || label === "Requested On") handleChangePage()
      }}
      width={width}
      title={tooltip}
    >
      {label} {icon}
    </TableCell>
  )
}

HeadCellSelector.defaultProps = {
  icon: null,
}
