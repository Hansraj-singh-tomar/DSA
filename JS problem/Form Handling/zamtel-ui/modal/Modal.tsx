import {
  // Box,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { FormProvider, UseFormReturn } from "react-hook-form"
import { ReactElement } from "react"

// interface ModalProps {
//   open: boolean
//   handleClose: () => void
//   methods: UseFormReturn<any>
//   children?: ReactElement
//   width?: string
//   height?: string
//   minWidth?: string
//   header?: any
//   dialogClass?: string
// }

// function Modal({
//   open,
//   handleClose,
//   methods,
//   children,
//   width,
//   height,
//   minWidth,
//   header,
//   dialogClass,
// }: ModalProps) {
//   return (
//     <Dialog
//       open={open}
//       onClose={handleClose}
//       maxWidth="xl"
//       // fullScreen
//       // fullWidth

//       // PaperProps={{
//       //   sx: {
//       //     width: { width },
//       //     height: { height },
//       //   },
//       // }}
//       sx={{
//         // height: { height },
//         padding: 1,
//         margin: 0,
//         width: "100%",
//         height: "100%",
//         "& .MuiDialog-container": {
//           "& .MuiDialog-paper": {
//             position: "relative",
//             width: { width },
//             height: { height },
//             margin: 0,
//             minWidth: { minWidth },
//             borderRadius: 3,
//           },
//         },
//         //   },
//       }}
//       style={{ background: "none" }}
//       className={dialogClass}
//     >
//       <DialogContent
//         sx={{
//           padding: 0,
//         }}
//       >
//         <Grid container direction="column">
//           <Box
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             m={2}
//             mx={2}
//             className="modalHeader"
//           >
//             <Typography variant="h6" fontWeight="bold">
//               {header}
//             </Typography>
//             <IconButton
//               sx={{
//                 width: 24,
//                 height: 24,
//                 backgroundColor: "#ffffff",
//                 p: 0.5,
//               }}
//               aria-label="close"
//               onClick={handleClose}
//             >
//               <CloseIcon />
//             </IconButton>
//           </Box>
//           {/* <Grid item>
//             <Typography>{header}</Typography>
//           </Grid>
//           <Grid item container justifyContent="flex-end" minHeight="20px">
//             <IconButton
//               sx={{
//                 position: "absolute",
//                 width: "24px",
//                 height: "24px",
//                 backgroundColor: "#ffffff",
//                 zIndex: 1,
//                 p: 0.5,
//               }}
//               aria-label="close"
//               onClick={handleClose}
//             >
//               <CloseIcon />
//             </IconButton>
//           </Grid> */}
//           <Grid item width="100%" padding={0} margin={0}>
//             <Divider
//               sx={{ backgroundColor: "#f2f2f2", p: 0, m: 0, width: "100%" }}
//             />
//           </Grid>

//           <Grid item>
//             <FormProvider {...methods}>{children}</FormProvider>
//           </Grid>
//         </Grid>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default Modal

// Modal.defaultProps = {
//   children: () => <> </>,
//   width: "55%",
//   height: "60%",
//   minWidth: "0",
//   header: "",
//   dialogClass: "",
// }

// ------------------------------------------------

function Modal({
  open,
  handleClose,
  methods,
  children,
  width,
  height,
  minWidth,
  maxHeight,
  header,
  dialogClass,
}: ModalProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xl"
      sx={{
        padding: 1,
        margin: 0,
        width: "100%",
        height: "100%",
        "& .MuiDialog-container": {
          "& .MuiDialog-paper": {
            position: "relative",
            width: { width },
            height: { height },
            maxHeight: { maxHeight },
            margin: 0,
            minWidth: { minWidth },
            borderRadius: 3,
            overflow: "hidden", // Prevent content overflow
          },
        },
      }}
      style={{ background: "none" }}
      className={dialogClass}
    >
      <DialogContent
        sx={{
          padding: 0,
          height: "100%",
          overflow: "scroll",
        }}
      >
        <Grid container>
          <Grid
            item
            container
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            m={2}
            className="modalHeader"
          >
            <Grid item xs={10}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "18px",
                }}
              >
                {header}
              </Typography>
            </Grid>
            <IconButton
              sx={{
                width: 24,
                height: 24,
                backgroundColor: "#ffffff",
                p: 0.5,
              }}
              aria-label="close"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Grid>

          <Grid item width="100%" padding={0} margin={0}>
            <Divider
              sx={{ backgroundColor: "#f2f2f2", p: 0, m: 0, width: "100%" }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormProvider {...methods}>{children}</FormProvider>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

// Update the interface to include maxHeight
interface ModalProps {
  open: boolean
  handleClose: () => void
  methods: UseFormReturn<any>
  children?: ReactElement
  width?: string
  height?: string
  minWidth?: string
  maxHeight?: string
  header?: any
  dialogClass?: string
}

Modal.defaultProps = {
  children: () => <> </>,
  width: "55%",
  height: "60%",
  minWidth: "0",
  maxHeight: "none",
  header: "",
  dialogClass: "",
}

export default Modal
