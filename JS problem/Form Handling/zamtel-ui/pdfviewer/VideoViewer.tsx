import "./PDFViewer.scss"
import { Box, Grid, Typography, InputLabel } from "@mui/material"
import { ReactNode } from "react"
import { ReactComponent as CloseCircle } from "../../../../assets/images/close_circle.svg"

type TVideoViewer = {
  name: string
  label: string | ReactNode
  isClosedIconDisabled?: boolean
  fileURL?: string
  handleClick?: () => void
}

function VideoViewer({
  name,
  label,
  isClosedIconDisabled,
  fileURL,
  handleClick,
}: TVideoViewer) {
  return (
    <>
      <InputLabel htmlFor={name}>
        <Box sx={{ pb: 1 }}>
          <Typography className="MaterialUiFields-label" variant="label">
            {label}
          </Typography>
        </Box>
      </InputLabel>
      <Grid
        container
        className="image-container"
        justifyContent="center"
        alignItems="center"
      >
        {!isClosedIconDisabled && (
          <div className="pdf-container_closeicon">
            <CloseCircle onClick={handleClick} />
          </div>
        )}
        <Grid
          item
          container
          xs={11}
          justifyContent="center"
          alignItems="center"
        >
          <video autoPlay={false} controls height="270px" width="430px">
            <source
              type="video/mp4"
              src={fileURL}
              //    alt={<>Image Unavailable</>}
            />
            <track kind="captions" />
          </video>
        </Grid>
      </Grid>
    </>
  )
}
VideoViewer.defaultProps = {
  isClosedIconDisabled: true,
  handleClick: () => {},
  fileURL: "",
}
export default VideoViewer
