import { Box, Grid, Typography } from "@mui/material"

import ModalWrapper from "app/components/material-ui/modal/Modal"
import CustomButton from "app/components/zamtel-ui/button/CustomButton"
import StyledButton from "app/components/zamtel-ui/styled/StyledButton"

interface ModalInterface {
  message: string
  onClose: any
  onsubmit: any
  isOpen: boolean
}

function Modal({ message, onClose, onsubmit, isOpen }: ModalInterface) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} maxWidth="30%">
      <>
        <Grid item sm={12} className="modal_body_text">
          <Typography variant="body2">{message}</Typography>
        </Grid>
        <Grid
          item
          sm={12}
          container
          direction="row"
          justifyContent="center"
          className="basic_details_form_buttons"
        >
          <Box display="flex" justifyContent="flex-end" mr={2}>
            <StyledButton
              type="button"
              onClick={onClose}
              variant="outlined"
              fullWidth
            >
              Cancel
            </StyledButton>
          </Box>

          <Box onClick={onsubmit}>
            <CustomButton
              type="button"
              text="Yes"
              variant="contained"
              onClick={() => {
                console.log("test")
              }}
              isDisabled={false}
            />
          </Box>
        </Grid>
      </>
    </ModalWrapper>
  )
}

export default Modal
