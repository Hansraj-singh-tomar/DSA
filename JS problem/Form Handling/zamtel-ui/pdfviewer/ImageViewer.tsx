// eslint-disable-next-line import/no-extraneous-dependencies
import { ReactNode } from "react"
import { Player } from "@lottiefiles/react-lottie-player"
import { Box, Grid, Typography, InputLabel } from "@mui/material"
import { ReactComponent as CloseCircle } from "../../../../assets/images/close_circle.svg"
import pdfIcon from "../../../../assets/images/pdf-file-icon.svg"
import "./PDFViewer.scss"

type TImageViewer = {
  uploadedFile: string
  name: string
  label: string | ReactNode
  isClosedIconDisabled?: boolean
  fileURL?: string | undefined
  handleClick?: () => void
  height?: string
  fileName?: string
  width?: string
  imgUrl?: string
  imgClass?: string
  directurl?: any
}

function ImageViewer({
  uploadedFile,
  name,
  label,
  height,
  width,
  imgUrl,
  fileName,
  isClosedIconDisabled,
  fileURL,
  directurl,
  handleClick,
  imgClass,
}: TImageViewer) {
  const imageSrc =
    imgUrl !== "" ? imgUrl : `data:application/pdf;base64,${uploadedFile}`
  const isPdf = fileName?.toLowerCase().endsWith(".pdf")

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
        className={`${imgClass} image-container`}
        justifyContent="center"
        alignItems="center"
        style={{ height: "auto" }}
        p={2}
        //    width={width}
      >
        {!isClosedIconDisabled && (
          <div className="pdf-container_closeicon">
            <CloseCircle onClick={handleClick} />
          </div>
        )}
        {isPdf ? (
          <Grid
            item
            container
            xs={11}
            justifyContent="center"
            alignItems="center"
          >
            <img alt="pdf Icon" src={pdfIcon} height={height} width={width} />
          </Grid>
        ) : (
          <Grid
            item
            container
            xs={11}
            justifyContent="center"
            alignItems="center"
          >
            {(fileURL &&
              fileURL.substring(fileURL.lastIndexOf(".") + 1).trim() ===
                "json") ||
            (imgUrl &&
              imgUrl.substring(imgUrl.lastIndexOf(".") + 1).trim() ===
                "json") ? (
              <Player
                src={imgUrl || fileURL || ""}
                className="player"
                loop
                autoplay
                speed={10}
              />
            ) : (
              <img
                alt={`${name} not available`}
                src={imageSrc || directurl}
                height={height}
                width={width}
              />
            )}
          </Grid>
        )}
      </Grid>
    </>
  )
}

ImageViewer.defaultProps = {
  width: "230px",
  height: "210px",
  imgUrl: "",
  isClosedIconDisabled: true,
  handleClick: () => {},
  fileURL: undefined,
  fileName: "",
  imgClass: "",
  directurl: "",
}

export default ImageViewer
