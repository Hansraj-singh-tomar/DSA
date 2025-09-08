import React, { useEffect, useState } from "react"
import {
  Box,
  FormHelperText,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
  Grid,
  CircularProgress,
  Tooltip,
} from "@mui/material"
import _ from "lodash"
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import Label from "app/components/zamtel-ui/label/Label"
import {
  imageUpload,
  staticFileContentDelete,
  staticFileContentUpload,
} from "app/utils/commonUploadAPIFunction"
import TrashIcon from "app/components/zamtel-ui/paylessIcons/Common/TrashIcon"
// import { boolean } from "yup"
import { useAppSelector, useAppDispatch } from "store/hook"
import {
  CustomerImageDetailsUpdate,
  CustomerImageDetailsDelete,
} from "store/slices/customer/customerRegistrationSlice"
import {
  AgentImageDetailsDelete,
  AgentImageDetailsUpdate,
} from "store/slices/agent/agentRegisterationSlice"
import {
  MerchantImageDetailsDelete,
  MerchantImageDetailsUpdate,
} from "store/slices/merchant/merchantRegisterationSlice"
import { getImageCust } from "app/templates/MerchantCommonFunctions"
import { converToBase64 } from "../../../utils"
import {
  IDefaultValueObject,
  TRhfFileAttachOnbording,
} from "../../../models/formFields"
// import { ReactComponent as TrashIcon } from "../../../../assets/images/trash.svg"
import CropModal from "../modal/CropModal/CropModal"
// import CropModal from "../modal/CropModal/CropModal"
function FilePreview({
  file,
  isDisabled,
  isStaticFileUpload,
  isDocUpload,
  deleteUploadedContent,
  clearField,
  previewUrl,
  openModal = false, // Hard coded value for Open Modal
  registrationType,
}: FilePreviewProps & { previewUrl?: string | null | boolean }) {
  // Define initialUploadImageState as an empty object or with your desired initial structure
  const initialUploadImageState: Record<string, any> = {
    imageCode1: null,
    imageCode2: null,
    // add more expected keys if needed
  }

  const fileName = file?.name || file?.fileName
  const hasImageExtension =
    fileName && /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(fileName)
  const formValues: IDefaultValueObject = useAppSelector((state) => {
    if (registrationType === "agent") {
      return openModal
        ? state.agent.agentRegistration.bulkRegFormValues
        : state.agent.agentRegistration.singleRegFormValues
    }

    if (registrationType === "merchant") {
      return openModal
        ? state.merchant.merchantRegistration.bulkRegFormValues
        : state.merchant.merchantRegistration.singleRegFormValues
    }

    return openModal
      ? state.customer.customerRegistration.bulkRegFormValues
      : state.customer.customerRegistration.singleRegFormValues
  })
  // If file.fileUrl is not available, try building it from fileId or your CDN logic
  const [uploadedImages, setUploadedImages] = useState(initialUploadImageState)
  useEffect(() => {
    const fetchImages = async () => {
      const uploadedImagesKeys = Object.keys(initialUploadImageState)

      if (formValues?.versionJson?.documents) {
        await Promise.all(
          uploadedImagesKeys.map(async (key) => {
            const doc = formValues.versionJson.documents[key]
            if (doc) {
              const newImage = await getImageCust(key, doc)
              if (newImage?.status) {
                const fileType =
                  newImage?.resourcePath?.slice(-4) === ".pdf" ? "pdf" : "image"
                const label =
                  newImage?.imageType?.replaceAll("_", " ") || "Unknown"

                setUploadedImages((prev) => ({
                  ...prev,
                  [key]: {
                    data: newImage.data,
                    type: fileType,
                    label,
                  },
                }))
              }
            }
          }),
        )
      }
    }

    fetchImages()
  }, []) // run only on mount

  console.log("uploadedImages----====", uploadedImages)
  // const imageSrc2 = `data:application/pdf;base64,${uploadedImages?.imageCode1?.data}`
  const base64Data = uploadedImages?.imageCode1?.data
  const imageSrc2 =
    base64Data && typeof base64Data === "string"
      ? `data:application/pdf;base64,${base64Data}`
      : null

  const imageSrc = previewUrl || imageSrc2
  // const base64Data = uploadedImages?.imageCode1?.data
  //   const imageSrc2 =
  //     base64Data && typeof base64Data === "string"
  //       ? `data:application/pdf;base64,${base64Data}`
  //       : null

  //   const imageSrc = previewUrl || imageSrc2
  // file?.fileUrl ||
  // (hasImageExtension && file?.base64String) ||
  // (hasImageExtension && file?.fileId
  //   ? `https://your-cdn.com/files/${file.fileId}`
  //   : undefined)

  const isImage = hasImageExtension && Boolean(imageSrc)
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mt: 0,
        p: 1.5,
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        gap: 2,
        width: "100%",
      }}
    >
      {isImage && (
        <img
          src={imageSrc || undefined}
          alt="preview"
          style={{
            width: 40,
            height: 40,
            objectFit: "cover",
            borderRadius: 4,
            marginRight: 10,
          }}
        />
      )}

      {/* File Name */}

      {/* <Typography variant="body2" sx={{ flex: 1 }} className="uplodedfileName">
        <span title={fileName}>{fileName}</span>
      </Typography> */}
      <Tooltip title={fileName} arrow placement="top">
        <Typography
          variant="body2"
          sx={{
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          // className="uplodedfileName"
        >
          {fileName}
        </Typography>
      </Tooltip>

      {/* Delete Icon */}
      {!isDisabled && (
        <TrashIcon
          svgProps={{
            style: { cursor: "pointer" },
            onClick: () => {
              if (isStaticFileUpload && !isDocUpload) {
                deleteUploadedContent()
              } else {
                clearField()
              }
            },
          }}
        />
      )}
    </Box>
  )
}
// function RhfFileAttach({
//   name,
//   label,
//   isDisabled,
//   valueType,
//   isModal,
//   accept,
//   isHelperText,
//   helperText,
//   isInstantUpload,
//   size = 1,
//   apiImageType = "",
//   isCropModal,
//   isStaticFileUpload,
//   uploadToCustomSystemLiftingAPI,
//   isDocUpload,
//   userCode,
//   isSoftDelete,
//   addImagesToDelete = () => {},
//   userType,
//   registrationType,
// }: TRhfFileAttach) {
//   console.log("hello")
//   const {
//     control,
//     setError,
//     formState: { errors },
//   } = useFormContext()
//   const showError = !!errors[name]
//   const errorMessage: any = _.has(errors, `${name}.message`)
//     ? _.get(errors, `${name}.message`)
//     : ""

//   const [openCropModal, setOpenCropModal] = useState(false)
//   const [file2, setFile2] = useState<File | undefined>()
//   const uploadRef = React.createRef<HTMLInputElement>()
//   const { t } = useTranslation()
//   const calculatedFileSize = size * 1024 * 1024
//   const [loading, setLoading] = useState(false)
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null)
//   const dispatch = useAppDispatch()
//   useEffect(() => {
//     return () => {
//       if (previewUrl) {
//         URL.revokeObjectURL(previewUrl)
//       }
//     }
//   }, [previewUrl])
//   const handleChange = async (
//     field: {
//       onChange: any
//     },
//     file: File | null,
//   ) => {
//     if (uploadRef.current) {
//       const { files } = uploadRef.current

//       let tempFile
//       if (file) {
//         tempFile = file
//       } else if (files && files?.length === 1) {
//         const file1 = files[0]
//         tempFile = file1
//       }
//       if (tempFile) {
//         if (tempFile.type.startsWith("image/")) {
//           if (previewUrl) {
//             URL.revokeObjectURL(previewUrl) // Clean up previous URL
//           }
//           const objectUrl = URL.createObjectURL(tempFile)
//           setPreviewUrl(objectUrl)
//         }
//         const fileName = tempFile?.name
//         const fileSize = tempFile?.size
//         const fileType = tempFile?.type
//         if (fileName.includes(" ")) {
//           setError(name, { type: "custom", message: "Invalid File Name" })
//         } else if (accept !== "*.*" && !accept.includes(fileType))
//           setError(name, { type: "custom", message: "Invalid File Format" })
//         else if (fileSize > calculatedFileSize)
//           setError(name, { type: "custom", message: "Invalid File Size" })
//         else if (valueType === "bin") {
//           if (isInstantUpload) {
//             setLoading(true)
//             let filesList
//             if (file && tempFile) {
//               filesList = [tempFile]
//             } else if (tempFile && files && files.length >= 1) {
//               filesList = files
//             }
//             if (filesList) {
//               const imageUploadSuccess = await imageUpload(
//                 filesList,
//                 apiImageType,
//                 name,
//                 userType,
//               )
//               setLoading(false)
//               if (imageUploadSuccess.status) {
//                 const imageData = {
//                   fileName,
//                   fileId: imageUploadSuccess?.data?.imageId,
//                   fileSize,
//                   fileUrl: imageUploadSuccess?.data?.fileUrl,
//                 }

//                 field.onChange(imageData)
//                 // Use the correct objectUrl for imageSrc, fallback to previewUrl if not available
//                 if (registrationType === "customer") {
//                   dispatch(CustomerImageDetailsUpdate(imageData))
//                 } else if (registrationType === "agent") {
//                   dispatch(AgentImageDetailsUpdate(imageData))
//                 } else if (registrationType === "merchant") {
//                   dispatch(MerchantImageDetailsUpdate(imageData))
//                 }
//               } else {
//                 setError(name, {
//                   type: "custom",
//                   message: imageUploadSuccess?.message ?? "Please try again",
//                 })
//               }
//             }
//           } else if (isStaticFileUpload) {
//             setLoading(true)
//             // setOpenCropModal(false)
//             const fileUploadSuccess = await staticFileContentUpload(
//               [tempFile],
//               uploadToCustomSystemLiftingAPI || false,
//               isDocUpload,
//               userCode || "",
//               apiImageType,
//             )
//             console.log(fileUploadSuccess)
//             if (fileUploadSuccess.status) {
//               field.onChange({
//                 fileUrl: fileUploadSuccess?.data?.fileUrl || "",
//                 fileName,
//               })

//               setError(name, { type: "custom", message: "" })
//             } else {
//               const fileErrorMessage = fileUploadSuccess.message
//               setError(name, { type: "custom", message: fileErrorMessage })
//             }
//             setLoading(false)
//           } else {
//             field.onChange(tempFile)
//           }
//         } else {
//           const base64String = await converToBase64(tempFile)
//           field.onChange({ fileName, fileSize, fileType, base64String })
//         }
//       }
//     }
//   }
//   const dispatchDeleteByRegistrationType = (fileId: string) => {
//     if (registrationType === "customer") {
//       dispatch(CustomerImageDetailsDelete(fileId))
//     } else if (registrationType === "agent") {
//       dispatch(AgentImageDetailsDelete(fileId))
//     } else if (registrationType === "merchant") {
//       dispatch(MerchantImageDetailsDelete(fileId))
//     }
//   }

//   const deleteUploadedContent = async (field: any) => {
//     if (!isSoftDelete) {
//       if (field.value?.fileName) {
//         console.log("file id delteion ", field)
//         const fileDeleteSuccess = await staticFileContentDelete(
//           field.value.fileName,
//         )
//         if (
//           fileDeleteSuccess.status ||
//           fileDeleteSuccess?.message === "File Not Found"
//         ) {
//           if (field.value?.fileId) {
//             dispatchDeleteByRegistrationType(field.value.fileId)
//           }
//           field.onChange(null)
//         } else {
//           setError(name, {
//             type: "custom",
//             message: fileDeleteSuccess.message ?? "Please try again",
//           })
//         }
//       }
//     } else if (field.value?.fileId) {
//       dispatchDeleteByRegistrationType(field.value.fileId)
//     }
//     if (isInstantUpload) {
//       addImagesToDelete({ type: "generic", data: field.value?.fileId })
//     } else if (isStaticFileUpload || isCropModal) {
//       addImagesToDelete({ type: "static", data: field.value?.fileId })
//     }
//   }

//   return (
//     <Controller
//       name={name}
//       defaultValue=""
//       control={control}
//       render={(props) => {
//         const { field } = props
//         return (
//           <>
//             <CropModal
//               isOpen={openCropModal}
//               onClose={() => {
//                 setOpenCropModal(false)
//               }}
//               handleUpload={(file) => {
//                 handleChange(field, file)
//                 setOpenCropModal(false)
//               }}
//               file={file2}
//             />
//             <section className="fileAttach">
//               <InputLabel htmlFor={name}>
//                 <Box sx={{ pb: 1 }}>
//                   {/* <Typography
//                   className="MaterialUiFields-label"
//                   variant={isModal ? "body1" : "label"}
//                 >
//                   {label}
//                 </Typography> */}
//                   <Label
//                     label={label}
//                     isDisabled={isDisabled || loading}
//                     isModal={isModal}
//                   />
//                 </Box>
//               </InputLabel>
//               <input
//                 {...field}
//                 ref={uploadRef}
//                 value=""
//                 onChange={(e) => {
//                   if (isCropModal) {
//                     setOpenCropModal(true)
//                     if (e.target.files && e.target.files.length > 0)
//                       setFile2(e.target.files[0])
//                   } else {
//                     handleChange(field, null)
//                   }
//                 }}
//                 type="file"
//                 style={{ display: "none" }}
//                 disabled={isDisabled || loading}
//                 accept={accept !== "*.*" ? accept : ""}
//                 // md={6}
//               />
//               <Box>
//                 <Box
//                   sx={{
//                     border: "2px dotted #aaa",
//                     borderRadius: "8px",
//                     p: 0.5,
//                     width: 240,
//                     backgroundColor: isDisabled ? "#f5f5f5" : "#fff",
//                     cursor: isDisabled ? "not-allowed" : "pointer",
//                   }}
//                   onClick={() => {
//                     if (!isDisabled) {
//                       if (uploadRef.current) {
//                         uploadRef.current.click()
//                       }
//                     }
//                   }}
//                 >
//                   <TextField
//                     id={name}
//                     variant="outlined"
//                     value=""
//                     error={showError}
//                     fullWidth
//                     autoComplete="off"
//                     disabled={isDisabled}
//                     InputProps={{
//                       readOnly: true,
//                       sx: {
//                         "& .MuiOutlinedInput-notchedOutline": {
//                           border: "none",
//                         },
//                         backgroundColor: "transparent",
//                         pl: 1,
//                       },
//                       startAdornment: (
//                         <Grid container wrap="nowrap" alignItems="center">
//                           <Grid item xs="auto">
//                             <button
//                               className={
//                                 isDisabled
//                                   ? "fileAttach_chooseButtonDisabled"
//                                   : "fileAttach_chooseButton"
//                               }
//                               type="button"
//                               style={{
//                                 all: "unset",
//                                 color: "#4D74EF",
//                                 cursor: "pointer",
//                                 fontSize: "12px",
//                                 fontWeight: "500",
//                                 fontFamily: "inherit",
//                                 textAlign: "center",
//                                 display: "block", // make button behave like block to respect width
//                                 width: "100px", // or '100%' or your preferred width
//                               }}
//                             >
//                               Browse
//                             </button>
//                           </Grid>
//                           <Grid item xs="auto" sx={{ ml: -3 }}>
//                             <Typography
//                               variant={isModal ? "body1" : "label"}
//                               className={
//                                 isDisabled
//                                   ? "disabledLabel"
//                                   : "fileAttach_noFileChosen"
//                               }
//                               style={{
//                                 color: "#A9ABB0",
//                               }}
//                               fontSize={14}
//                             >
//                               Or drop file here
//                             </Typography>
//                           </Grid>
//                         </Grid>
//                       ),
//                       endAdornment: loading && (
//                         <InputAdornment position="end">
//                           <CircularProgress size={20} />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                 </Box>

//                 {/* Image Preview Section */}
//                 {field.value && (
//                   <FilePreview
//                     file={field.value}
//                     isDisabled={isDisabled ?? false}
//                     isStaticFileUpload={isStaticFileUpload ?? false}
//                     isDocUpload={isDocUpload ?? false}
//                     deleteUploadedContent={() => deleteUploadedContent(field)}
//                     clearField={() => {
//                       if (field.value?.fileId) {
//                         dispatchDeleteByRegistrationType(field.value.fileId)
//                       }
//                       field.onChange(null)
//                     }}
//                     previewUrl={previewUrl}
//                     registrationType={registrationType ?? null}
//                   />
//                 )}
//               </Box>

//               {isHelperText && !showError && (
//                 <FormHelperText className="HelperText">
//                   {helperText}
//                 </FormHelperText>
//               )}
//               <FormHelperText className="ErrorTextField" error={showError}>
//                 {t(errorMessage, { name: label })}
//               </FormHelperText>
//             </section>
//           </>
//         )
//       }}
//     />
//   )
// }

function RhfFileAttachOnbording({
  name,
  label,
  isDisabled,
  valueType,
  isModal,
  accept,
  isHelperText,
  helperText,
  isInstantUpload,
  size = 1,
  apiImageType = "",
  isCropModal,
  isStaticFileUpload,
  uploadToCustomSystemLiftingAPI,
  isDocUpload,
  userCode,
  isSoftDelete,
  addImagesToDelete = () => {},
  userType,
  registrationType,
}: TRhfFileAttachOnbording) {
  const {
    control,
    setError,
    formState: { errors },
  } = useFormContext()
  const showError = !!errors[name]
  const errorMessage: any = _.has(errors, `${name}.message`)
    ? _.get(errors, `${name}.message`)
    : ""

  const [openCropModal, setOpenCropModal] = useState(false)
  const [file2, setFile2] = useState<File | undefined>()
  const uploadRef = React.createRef<HTMLInputElement>()
  const { t } = useTranslation()
  const calculatedFileSize = size * 1024 * 1024
  const [loading, setLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dispatch = useAppDispatch()
  const method = useFormContext()
  const { trigger } = method

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const handleChange = async (
    field: {
      onChange: any
    },
    file: File | null,
  ) => {
    if (uploadRef.current) {
      let tempFile = file

      if (!tempFile && uploadRef.current.files?.length === 1) {
        // eslint-disable-next-line prefer-destructuring
        tempFile = uploadRef.current.files[0]
      }

      if (tempFile) {
        if (tempFile.type.startsWith("image/")) {
          if (previewUrl) URL.revokeObjectURL(previewUrl)
          const objectUrl = URL.createObjectURL(tempFile)
          setPreviewUrl(objectUrl)
        }

        const { name: fileName, size: fileSize, type: fileType } = tempFile

        if (fileName.includes(" ")) {
          setError(name, { type: "custom", message: "Invalid File Name" })
          setTimeout(() => {
            trigger(name)
          }, 5000) // 1 seconds = 10000 milliseconds
        } else if (accept !== "*.*" && !accept.includes(fileType)) {
          setError(name, { type: "custom", message: "Invalid File Format" })
          setTimeout(() => {
            trigger(name)
          }, 1000) //
        } else if (fileSize > calculatedFileSize) {
          setError(name, { type: "custom", message: "Invalid File Size" })
          setTimeout(() => {
            trigger(name)
          }, 1000) //
        } else if (valueType === "bin") {
          if (isInstantUpload) {
            setLoading(true)
            const imageUploadSuccess = await imageUpload(
              [tempFile],
              apiImageType,
              name,
              userType,
            )
            setLoading(false)
            setTimeout(() => {
              trigger(name)
            }, 1000) //

            if (imageUploadSuccess.status) {
              const imageData = {
                fileName,
                fileId: imageUploadSuccess?.data?.imageId,
                fileSize,
                fileUrl: imageUploadSuccess?.data?.fileUrl,
              }
              field.onChange(imageData)

              if (registrationType === "customer") {
                dispatch(CustomerImageDetailsUpdate(imageData))
              } else if (registrationType === "agent") {
                dispatch(AgentImageDetailsUpdate(imageData))
              } else if (registrationType === "merchant") {
                dispatch(MerchantImageDetailsUpdate(imageData))
              }
            } else {
              setError(name, {
                type: "custom",
                message: imageUploadSuccess?.message ?? "Please try again",
              })
            }
          } else if (isStaticFileUpload) {
            setLoading(true)
            const fileUploadSuccess = await staticFileContentUpload(
              [tempFile],
              uploadToCustomSystemLiftingAPI || false,
              isDocUpload,
              userCode || "",
              apiImageType,
            )
            setLoading(false)

            if (fileUploadSuccess.status) {
              field.onChange({
                fileUrl: fileUploadSuccess?.data?.fileUrl || "",
                fileName,
              })
              setError(name, { type: "custom", message: "" })
            } else {
              setError(name, {
                type: "custom",
                message: fileUploadSuccess.message ?? "Please try again",
              })
            }
          } else {
            field.onChange(tempFile)
          }
        } else {
          const base64String = await converToBase64(tempFile)
          field.onChange({ fileName, fileSize, fileType, base64String })
        }
      }
    }
  }

  const dispatchDeleteByRegistrationType = (fileId: string) => {
    if (registrationType === "customer") {
      dispatch(CustomerImageDetailsDelete(fileId))
    } else if (registrationType === "agent") {
      dispatch(AgentImageDetailsDelete(fileId))
    } else if (registrationType === "merchant") {
      dispatch(MerchantImageDetailsDelete(fileId))
    }
  }

  const deleteUploadedContent = async (field: any) => {
    if (!isSoftDelete) {
      if (field.value?.fileName) {
        const fileDeleteSuccess = await staticFileContentDelete(
          field.value.fileName,
        )
        if (
          fileDeleteSuccess.status ||
          fileDeleteSuccess?.message === "File Not Found"
        ) {
          if (field.value?.fileId) {
            dispatchDeleteByRegistrationType(field.value.fileId)
          }
          field.onChange(null)
        } else {
          setError(name, {
            type: "custom",
            message: fileDeleteSuccess.message ?? "Please try again",
          })
        }
      }
    } else if (field.value?.fileId) {
      dispatchDeleteByRegistrationType(field.value.fileId)
    }

    if (isInstantUpload) {
      addImagesToDelete({ type: "generic", data: field.value?.fileId })
    } else if (isStaticFileUpload || isCropModal) {
      addImagesToDelete({ type: "static", data: field.value?.fileId })
    }
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>, field: any) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const droppedFiles = e.dataTransfer.files
    if (droppedFiles && droppedFiles.length > 0) {
      await handleChange(field, droppedFiles[0])
    }
  }

  return (
    <Controller
      name={name}
      defaultValue=""
      control={control}
      render={({ field }) => (
        <>
          <CropModal
            isOpen={openCropModal}
            onClose={() => setOpenCropModal(false)}
            handleUpload={(file) => {
              handleChange(field, file)
              setOpenCropModal(false)
            }}
            file={file2}
          />
          <section className="fileAttach">
            <InputLabel htmlFor={name}>
              <Box sx={{ pb: 0.5 }}>
                <Label
                  label={label}
                  isDisabled={isDisabled || loading}
                  isModal={isModal}
                />
              </Box>
            </InputLabel>
            <input
              {...field}
              ref={uploadRef}
              value=""
              onChange={(e) => {
                if (isCropModal) {
                  setOpenCropModal(true)
                  if (e.target.files && e.target.files.length > 0) {
                    setFile2(e.target.files[0])
                  }
                } else {
                  handleChange(field, null)
                }
                if (isStaticFileUpload && !isDocUpload) {
                  deleteUploadedContent(field)
                } else {
                  if (field.value?.fileId) {
                    dispatchDeleteByRegistrationType(field.value.fileId)
                  }
                  field.onChange(null)
                }
              }}
              type="file"
              style={{ display: "none" }}
              disabled={isDisabled || loading}
              accept={accept !== "*.*" ? accept : ""}
            />
            <Box
              onClick={() => {
                if (!isDisabled && uploadRef.current) {
                  uploadRef.current.click()
                }
              }}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, field)}
              sx={{
                border: isDragging ? "2px dashed #4D74EF" : "2px dotted #aaa",
                borderRadius: "8px",
                p: 0.5,
                width: 240,
                backgroundColor: isDisabled ? "#f5f5f5" : "#fff",
                cursor: isDisabled ? "not-allowed" : "pointer",
                transition: "border 0.2s ease-in-out",
              }}
            >
              <TextField
                id={name}
                variant="outlined"
                value=""
                error={showError}
                fullWidth
                autoComplete="off"
                disabled={isDisabled}
                InputProps={{
                  readOnly: true,
                  sx: {
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                    backgroundColor: "transparent",
                    pl: 1,
                  },
                  startAdornment: (
                    <Grid container wrap="nowrap" alignItems="center">
                      <Grid item xs="auto">
                        <button
                          className={
                            isDisabled
                              ? "fileAttach_chooseButtonDisabled"
                              : "fileAttach_chooseButton"
                          }
                          type="button"
                          style={{
                            all: "unset",
                            color: "#4D74EF",
                            cursor: "pointer",
                            fontSize: "12px",
                            fontWeight: "500",
                            fontFamily: "inherit",
                            textAlign: "center",
                            display: "block",
                            width: "100px",
                          }}
                        >
                          Browse
                        </button>
                      </Grid>
                      <Grid item xs="auto" sx={{ ml: -3 }}>
                        <Typography
                          variant={isModal ? "body1" : "label"}
                          className={
                            isDisabled
                              ? "disabledLabel"
                              : "fileAttach_noFileChosen"
                          }
                          style={{ color: "#A9ABB0" }}
                          fontSize={14}
                        >
                          Or drop file here
                        </Typography>
                      </Grid>
                    </Grid>
                  ),
                  endAdornment: loading && (
                    <InputAdornment position="end">
                      <CircularProgress size={20} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {field.value && (
              <Grid item width="240px" mt={2}>
                <FilePreview
                  file={field.value}
                  isDisabled={isDisabled ?? false}
                  isStaticFileUpload={isStaticFileUpload ?? false}
                  isDocUpload={isDocUpload ?? false}
                  deleteUploadedContent={() => deleteUploadedContent(field)}
                  clearField={() => {
                    if (field.value?.fileId) {
                      dispatchDeleteByRegistrationType(field.value.fileId)
                    }
                    field.onChange(null)
                  }}
                  previewUrl={previewUrl}
                  registrationType={registrationType ?? null}
                />
              </Grid>
            )}

            {isHelperText && !showError && (
              <FormHelperText className="HelperText">
                {helperText}
              </FormHelperText>
            )}
            <FormHelperText className="ErrorTextField" error={showError}>
              {t(errorMessage, { name: label })}
            </FormHelperText>
          </section>
        </>
      )}
    />
  )
}

RhfFileAttachOnbording.defaultProps = {
  isDisabled: false,
  valueType: "bin",
  isHelperText: false,
  helperText: "",
  isInstantUpload: false,
  size: 1,
  apiImageType: "",
  isCropModal: false,
  isStaticFileUpload: false,
  isSoftDelete: false,
}

type FilePreviewProps = {
  file: any
  isDisabled: boolean
  isStaticFileUpload: boolean
  isDocUpload: boolean
  deleteUploadedContent: () => void
  clearField: () => void
  previewUrl?: string | null
  openModal?: boolean
  registrationType: string | null
}

FilePreview.defaultProps = {
  previewUrl: null,
  openModal: false,
}

RhfFileAttachOnbording.defaultProps = {
  isDisabled: false,
  valueType: "bin",
  isHelperText: false,
  helperText: "",
  isInstantUpload: false,
  size: 1,
  apiImageType: "",
  isCropModal: false,
  isStaticFileUpload: false,
  isSoftDelete: false,
}

// type FilePreviewProps = {
//   file: any
//   isDisabled: boolean
//   isStaticFileUpload: boolean
//   isDocUpload: boolean
//   deleteUploadedContent: () => void
//   clearField: () => void
//   previewUrl?: string | null
// }

FilePreview.defaultProps = {
  previewUrl: null,
}

RhfFileAttachOnbording.defaultProps = {
  isDisabled: false,
  valueType: "bin",
  isHelperText: false,
  helperText: "",
  isInstantUpload: false,
  size: 1,
  apiImageType: "",
  isCropModal: false,
  isStaticFileUpload: false,
  isSoftDelete: false,
}

export default RhfFileAttachOnbording
