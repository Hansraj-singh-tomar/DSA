import "./PDFViewer.scss"
import { Box, Grid, Typography, InputLabel } from "@mui/material"
import { ReactComponent as CloseCircle } from "../../../../assets/images/close_circle.svg"

type TPDFViewer = {
  uploadedPDFFile: File | string | undefined | null
  handleClick: () => void
  name: string
  label: string
  isClosedIconDisabled: boolean
  isModal: boolean
  height?: string
  isFileBig?: boolean
  fileClass?: string
}

function PDFViewer({
  uploadedPDFFile,
  handleClick,
  name,
  label,
  isModal,
  isClosedIconDisabled,
  height,
  isFileBig,
  fileClass,
}: TPDFViewer) {
  function base64ToBlob(base64: any, type = "application/octet-stream") {
    const binStr = atob(base64)
    const len = binStr.length
    const arr = new Uint8Array(len)
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < len; i++) {
      arr[i] = binStr.charCodeAt(i)
    }
    return new Blob([arr], { type })
  }
  let fileObj: any = ""
  if (!uploadedPDFFile) {
    return null
  }
  if (typeof uploadedPDFFile === "string") {
    if (isFileBig) {
      const blob = base64ToBlob(uploadedPDFFile, "application/pdf")
      const url = URL.createObjectURL(blob)
      fileObj = url
    } else {
      fileObj = uploadedPDFFile
    }
  } else {
    fileObj = URL.createObjectURL(uploadedPDFFile)
  }

  return (
    <>
      <InputLabel htmlFor={name}>
        <Box sx={{ pb: 1 }}>
          <Typography
            className="MaterialUiFields-label"
            variant={isModal ? "body1" : "label"}
          >
            {label}
          </Typography>
        </Box>
      </InputLabel>
      <Grid
        height={height || "80vh"}
        container
        className={`${fileClass} "pdf-container"`}
        justifyContent="center"
        alignItems="center"
      >
        {!isClosedIconDisabled && (
          <div className="pdf-container_closeicon">
            <CloseCircle onClick={handleClick} />
          </div>
        )}
        <Grid item xs={12} className="pdf-container_object">
          <object
            style={{ width: "100%", height: "100%" }}
            type="application/pdf"
            // data={`data:application/pdf;base64,${fileObj} #toolbar=0`}
            data={fileObj}
            aria-label="pdf-file"
          />
        </Grid>
      </Grid>
    </>
  )
}
export default PDFViewer

PDFViewer.defaultProps = {
  height: undefined,
  isFileBig: false,
  fileClass: "",
}
