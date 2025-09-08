import { Grid, Typography } from "@mui/material"
import ModalWrapper from "app/components/material-ui/modal/Modal"
import StyledButton from "app/components/zamtel-ui/styled/StyledButton"
import StyledButtonOutline from "../styled/StyledButtonOutlineSecondary"

interface IProps {
  isModalOpen: boolean
  handleSubmit: () => void
  handleClose: () => void
  message: string
  maxWidth?: string
  confirmText?: string
  cancelText?: string
}
function ConfirmModal({
  isModalOpen,
  handleSubmit,
  handleClose,
  message,
  maxWidth,
  confirmText,
  cancelText,
}: IProps) {
  return (
    <ModalWrapper
      isOpen={isModalOpen}
      onClose={handleClose}
      maxWidth={maxWidth}
    >
      <Grid container>
        <Grid item sm={12} className="modal_container_header">
          <Typography variant="subtitle2" fontWeight={500}>
            Enable Maintenance Mode
          </Typography>
        </Grid>
        <Grid item sm={12} className="modal_body_text">
          <Typography variant="subtitle2">{message}</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          container
          direction="row"
          justifyContent="center"
          className="basic_details_form_buttons"
        >
          <Grid item md={3.5} sm={12} xs={12} onClick={handleClose}>
            <StyledButtonOutline variant="outlined" type="button">
              {cancelText}
            </StyledButtonOutline>
          </Grid>

          <Grid item md={2} sm={12} xs={12}>
            <StyledButton
              variant="contained"
              type="submit"
              onClick={handleSubmit}
              style={{
                height: "40px",
                fontWeight: 400,
                marginLeft: "20px",
              }}
            >
              {confirmText}
            </StyledButton>
            {/* <StyledButton
              selector="button"
              rest={{
                type: "submit",
                text: "SUBMIT",
                onClick: handleSubmit,
              }}
            /> */}
          </Grid>
        </Grid>
      </Grid>
    </ModalWrapper>
  )
}

ConfirmModal.defaultProps = {
  maxWidth: "900px",
  confirmText: "Save",
  cancelText: "Cancel",
}

export default ConfirmModal
