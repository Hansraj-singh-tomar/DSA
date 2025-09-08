import { Grid, Typography } from "@mui/material"
import RhfSelector from "app/components/material-ui/react-hook-form/RhfSelector"
import FieldsRender from "app/components/zamtel-ui/fieldsRender/FieldsRender"
import Modal from "app/components/zamtel-ui/modal/Modal"
import StyledButton from "app/components/zamtel-ui/styled/StyledButton"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import schema from "app/components/zamtel-ui/validation/MerchantPortal/bulkQRCodeSchema"

import { useEffect } from "react"
import { useForm, FormProvider } from "react-hook-form"
import "./BulkQR.scss"

interface ApprovalModalProps {
  open: boolean
  batchId: string
  handleSubmit: (rejectRemarks: any) => void
  handleClose: () => void
  setRemarkValue: any
}

function ApprovalModal({
  open,
  handleClose,
  handleSubmit,
  batchId,
  setRemarkValue,
}: ApprovalModalProps) {
  let validationSchema: any = yup.object()
  validationSchema = schema("ApprovalModal")
  const methods = useForm<any, any>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { approveRemarks: "" },
    resolver: yupResolver(validationSchema),
  })
  const { watch } = methods
  const { approveRemarks } = watch()

  const submitHandler = (data: any) => {
    handleSubmit(data.approveRemarks)
  }

  useEffect(() => {
    setRemarkValue(approveRemarks)
  }, [approveRemarks])

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      methods={methods}
      height="50%"
      width="35%"
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submitHandler)}>
          <Grid container>
            <Grid item sm={12} className="modal_container_header">
              <Typography variant="placeholder" ml={2} fontWeight={500}>
                Submit Batch {batchId} for Approval?
              </Typography>
            </Grid>

            <Grid item sm={12} pl={2} mt={2} mb={3} pr={2}>
              <FieldsRender
                fieldDetails={[
                  {
                    selector: "textarea",
                    label: "Remarks",
                    isEndLabel: true,
                    endLabel: `${watch("approveRemarks").length}/128`,
                    placeholder: "",
                    name: "approveRemarks",
                    xs: 12,
                    xsModalPage: 12,
                    rows: 2,
                    maxLength: 128,
                    required: true,
                  },
                ]}
              />
            </Grid>

            <Grid
              item
              xs={12}
              container
              direction="row"
              justifyContent="flex-end"
              className="basic_details_form_buttons"
              spacing={1}
            >
              <Grid item md={4.6} sm={12} xs={12} onClick={handleClose}>
                <StyledButton variant="outlined" type="button">
                  CANCEL
                </StyledButton>
              </Grid>

              <Grid item md={4.8} sm={12} xs={12}>
                <RhfSelector
                  selector="button"
                  rest={{
                    type: "submit",
                    text: "SUBMIT",
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Modal>
  )
}

export default ApprovalModal
