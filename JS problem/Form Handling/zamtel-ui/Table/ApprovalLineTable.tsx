/* eslint-disable no-nested-ternary */
import { useState, useEffect } from "react"
import { Grid, IconButton } from "@mui/material"
import { Column, Row } from "app/models/Table"
import { transactionStatusTable } from "app/api/transactionManagement/SystemWalletLifting/systemWalletLifting"
import { createDate12HourFormatTime } from "app/utils/commonFunctions"
import { AlertModalType } from "app/models/apiDataModel"
import AlertModal from "app/templates/alertModal/AlertModalNew"
import Tables from "./Tables"

function ApprovalLineTable({ approvalCode }: { approvalCode: string }) {
  const [errorMessage, setErrorMessage] = useState("")
  const [tableLoaded, setTableLoaded] = useState(false)
  const [rowData, setRowData] = useState<Array<Row>>([])
  const [alertModalData, setAlertModalData] = useState<AlertModalType>(null)

  const columns: Column[] = [
    { id: "serialNum", label: "S. No.", align: "left" },
    { id: "approverLevel", label: "Approved Line" },
    { id: "approvalStatusValue", label: "Approval Status" },
    { id: "approverUserCode", label: "Approved By" },
    { id: "updatedTimestamp", label: "Approval Date" },
    { id: "createdTimestamp", label: "Request Date" },
  ]
  function createData(data: any) {
    return { ...data }
  }

  function statusClassSelector(status: string) {
    if (status) {
      switch (status.toUpperCase()) {
        case "APPROVED":
          return "green"
        case "PENDING":
          return "yellow"
        case "REJECTED":
          return "red"
        default:
          return "grey"
      }
    }
    return "grey"
  }

  const fetchData = async () => {
    try {
      setTableLoaded(true)
      setErrorMessage("")

      const payload: {
        approvalCode: string
      } = {
        approvalCode,
      }
      const response = await transactionStatusTable(payload)

      if (response.status.toUpperCase() === "SUCCESS" && response.data) {
        const rows = response.data?.map((fields: Row, index: number) => {
          return createData({
            serialNum: index + 1,
            ...fields,
            createdTimestamp:
              fields.createdTimestamp &&
              createDate12HourFormatTime(fields.createdTimestamp),
            updatedTimestamp:
              fields.updatedTimestamp &&
              createDate12HourFormatTime(fields.updatedTimestamp),
            approvalStatusValue: fields.status
              ? {
                  cellValue: (
                    <Grid item display="flex" columnGap="4px">
                      <Grid item xs={2}>
                        <IconButton
                          sx={{ padding: "3.3px" }}
                          className={`indicator${statusClassSelector(
                            fields.status,
                          )}`}
                        />
                      </Grid>
                      <Grid item>
                        {fields.status[0] +
                          fields.status.slice(1).toLowerCase()}
                      </Grid>
                    </Grid>
                  ),
                }
              : "",
          })
        })
        setRowData(rows)
      } else if (response?.message) {
        setErrorMessage(response?.message || response)
      } else {
        setErrorMessage("No Records Found")
      }
    } catch (error: any) {
      setErrorMessage(error?.message || error)
      setAlertModalData({
        alertType: "error",
        message: error?.message || error || "Something Went Wrong!",
        header: "Error",
        toggleAction: () => {
          setAlertModalData(null)
        },
      })
    } finally {
      setTableLoaded(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [approvalCode])

  return (
    <>
      {alertModalData && <AlertModal modalInfo={alertModalData} />}

      <Tables
        columns={columns}
        rowData={rowData}
        isPagination={false}
        errorMessage={errorMessage}
        isLoading={tableLoaded}
      />
    </>
  )
}

export default ApprovalLineTable
