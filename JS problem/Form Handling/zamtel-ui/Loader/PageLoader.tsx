import CircularProgress from "@mui/material/CircularProgress"
import ModalWrapper from "app/components/material-ui/modal/Modal"

interface SuccessProps {
  open: boolean
  onClose: () => void
}
function PageLoader({ open, onClose }: SuccessProps) {
  return (
    <ModalWrapper isOpen={open} onClose={onClose} isLoading>
      <CircularProgress />
    </ModalWrapper>
  )
}

export default PageLoader
