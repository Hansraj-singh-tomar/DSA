import { Box, Typography, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { ReactComponent as SuccessIcon } from "assets/images/tick_circle.svg"
import "./SuccessModal.scss"

interface SuccessProps {
  open: boolean
  modalMessage: string
  handleClose: () => void
}

function AlertAtTopModal({ open, modalMessage, handleClose }: SuccessProps) {
  if (!open) return null

  return (
    <Box
      sx={{
        position: "fixed",
        top: "50px",
        left: "700px",
        width: "320px",
        height: "56px",
        background: "#DAF7E7",
        borderRadius: "8px",
        padding: "16px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        zIndex: 9999,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <SuccessIcon style={{ width: "24px", height: "24px", flexShrink: 0 }} />

      <Typography
        variant="placeholder"
        sx={{
          fontWeight: 500,
          fontSize: "14px",
          color: "#000",
          flexGrow: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {modalMessage}
      </Typography>

      <IconButton
        onClick={handleClose}
        sx={{
          width: "24px",
          height: "24px",
          padding: 0,
          color: "#666",
          flexShrink: 0,
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        }}
      >
        <CloseIcon sx={{ fontSize: "16px" }} />
      </IconButton>
    </Box>
  )
}

export default AlertAtTopModal
