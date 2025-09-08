import { Grid, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { ReactComponent as SuccessIcon } from "assets/images/tick_circle.svg"
import "./SuccessModal.scss"
import RhfSelector from "app/components/material-ui/react-hook-form/RhfSelector"
import Modal from "./Modal"

interface SuccessProps {
  open: boolean
  modalMessage: string
  handleClose: () => void
}
function SuccessModal({ open, modalMessage, handleClose }: SuccessProps) {
  const methods = useForm<any, any>({
    mode: "onChange",
    reValidateMode: "onChange",
  })

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      width="auto"
      height="auto"
      methods={methods}
    >
      <Grid container direction="column">
        <Grid item container alignItems="center" pl={2} pr={2}>
          <Grid item pt={1}>
            <SuccessIcon />
          </Grid>
          <Grid item>
            <Typography variant="placeholder" pl={1} fontWeight={500}>
              Submitted Successfully
            </Typography>
          </Grid>
        </Grid>
        <Grid item pt={2} pl={2} pr={2}>
          <Typography variant="label">{modalMessage}</Typography>
        </Grid>
        <Grid
          item
          pt={4}
          pl={2}
          pr={2}
          pb={2}
          container
          justifyContent="flex-end"
        >
          <Grid item className="basic_details_form_buttons">
            <RhfSelector
              selector="button"
              rest={{
                type: "button",
                text: "OKAY",
                onClick: () => {
                  handleClose()
                },
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default SuccessModal
