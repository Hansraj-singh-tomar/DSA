// import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import {
  Box,
  CircularProgress,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  Tooltip,
  Typography,
} from "@mui/material"
import { TRhfDragDrop } from "app/models/formFields"
import { converToBase64 } from "app/utils/commonFunctions"
import _ from "lodash"
import { useCallback, useState } from "react"
import Dropzone, { FileRejection } from "react-dropzone"
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import {
  imageUploadAPICust,
  systemLiftingImageUploadAPI,
  uploadImg,
} from "app/api/commonApi/CommonApi"

import CropModal from "app/components/material-ui/modal/CropModal/CropModal"
import {
  // getImageCust,
  imageUpload,
} from "app/templates/MerchantCommonFunctions"
import ImageViewer from "app/components/zamtel-ui/pdfviewer/ImageViewer"
import VideoViewer from "app/components/zamtel-ui/pdfviewer/VideoViewer"
import Label from "app/components/zamtel-ui/label/Label"
import TrashIcon from "app/components/zamtel-ui/paylessIcons/Common/TrashIcon"
// import { useAppSelector } from "store/hook"

const isVideo = ["mp4", "avi"]

interface FilePreviewProps {
  file?: any // file object
  isDisabled?: boolean
  isStaticFileUpload?: boolean
  isDocUpload?: boolean
  deleteUploadedContent: () => void
  clearField: () => void
  previewUrl?: string | null | boolean
  // openModal?: boolean
  // registrationType?: "agent" | "merchant" | "customer" | null
}

// const initialUploadImageState: Record<string, any> = {
//   imageCode1: null,
//   imageCode2: null,
// }

// function FilePreview({
//   file,
//   isDisabled,
//   isStaticFileUpload,
//   isDocUpload,
//   deleteUploadedContent,
//   clearField,
//   previewUrl = null,
//   openModal = false,
//   registrationType = null,
// }: FilePreviewProps) {
//   const [uploadedImages, setUploadedImages] = useState(initialUploadImageState)

//   const fileName = file?.name || file?.fileName || ""
//   const isImageExtension = /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(fileName)

//   const formValues = useAppSelector((state) => {
//     switch (registrationType) {
//       case "agent":
//         return openModal
//           ? state.agent.agentRegistration.bulkRegFormValues
//           : state.agent.agentRegistration.singleRegFormValues
//       case "merchant":
//         return openModal
//           ? state.merchant.merchantRegistration.bulkRegFormValues
//           : state.merchant.merchantRegistration.singleRegFormValues
//       case "customer":
//         return openModal
//           ? state.customer.customerRegistration.bulkRegFormValues
//           : state.customer.customerRegistration.singleRegFormValues
//       default:
//         return {} as any
//     }
//   })

//   // For image base64 preview fallback (if previewUrl is not passed)
//   useEffect(() => {
//     const fetchImages = async () => {
//       const uploadedImagesKeys = Object.keys(initialUploadImageState)
//       const docs = formValues?.versionJson?.documents || {}
//       console.log("docs", docs)
//       await Promise.all(
//         uploadedImagesKeys.map(async (key) => {
//           if (docs[key]) {
//             const newImage = await getImageCust(key, docs[key])
//             if (newImage?.status) {
//               setUploadedImages((prev) => ({
//                 ...prev,
//                 [key]: {
//                   data: newImage.data,
//                   // type: newImage?.resourcePath?.endsWith(".pdf")
//                   //   ? "pdf"
//                   //   : "image",
//                   type: "image",
//                   label: newImage?.imageType?.replaceAll("_", " ") || key,
//                 },
//               }))
//             }
//           }
//         }),
//       )
//     }

//     fetchImages()
//   }, [])

//   const base64Data = uploadedImages?.imageCode1?.data
//   const fallbackBase64Url =
//     base64Data && typeof base64Data === "string"
//       ? `data:application/pdf;base64,${base64Data}`
//       : null

//   const imageSrc =
//     (typeof previewUrl === "string" && previewUrl) || fallbackBase64Url || ""

//   const showImage = isImageExtension && imageSrc

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         mt: 1,
//         p: 1,
//         border: "1px solid #ddd",
//         borderRadius: "6px",
//         backgroundColor: "#fafafa",
//       }}
//     >
//       {showImage && (
//         <img
//           src={imageSrc}
//           alt="preview"
//           style={{
//             width: 40,
//             height: 40,
//             objectFit: "cover",
//             borderRadius: 4,
//             marginRight: 10,
//           }}
//         />
//       )}

//       {/* Show short file name if like: 9283283_edit.png => edit.png */}
//       <Typography variant="body2" sx={{ flex: 1 }}>
//         {fileName?.split("_").slice(-1)[0] || fileName}
//       </Typography>

//       {!isDisabled && (
//         <TrashIcon
//           svgProps={{
//             style: { cursor: "pointer" },
//             onClick: () => {
//               if (isStaticFileUpload && !isDocUpload) {
//                 deleteUploadedContent()
//               } else {
//                 clearField()
//               }
//             },
//           }}
//         />
//       )}
//     </Box>
//   )
// }
interface FilePreviewProps {
  file?: any // file object from form field
  isDisabled?: boolean
  isStaticFileUpload?: boolean
  isDocUpload?: boolean
  deleteUploadedContent: () => void
  clearField: () => void
  previewUrl?: string | boolean | null | undefined
}

function FilePreview({
  file,
  isDisabled,
  isStaticFileUpload,
  isDocUpload,
  deleteUploadedContent,
  clearField,
  previewUrl = null,
}: FilePreviewProps) {
  // Prioritize original filename for display
  const fileName =
    file?.originalFileName ||
    file?.fileId?.originalFileName ||
    file?.fileId?.fileName ||
    file?.fileName ||
    file?.name ||
    ""
  const displayName = fileName?.split("_").slice(-1)[0] || fileName
  const isImage = /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(fileName)
  const imageSrc = previewUrl || file?.fileId?.imageUrl || ""

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
      {isImage && imageSrc && (
        <img
          src={imageSrc}
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

      <Typography variant="body2" sx={{ flex: 1, mr: 1 }}>
        {displayName}
      </Typography>

      {!isDisabled && (
        <TrashIcon
          svgProps={{
            style: { cursor: "pointer" },
            onClick: (e: React.MouseEvent) => {
              e.stopPropagation()
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

// export default FilePreview

function RhfDragDrop({
  name,
  label,
  multiple,
  valueType,
  instructionMessage,
  acceptedType,
  apiImageType,
  maxSize,
  isGeneralImageUpload = true,
  isCropFile,
  disabled,
  isStaticImageUpload,
  isSoftDelete,
  addImagesToDelete = undefined,
  userCode,
  isDimensionValidate = false,
  tooltipMessage,
  imgWidth = 0,
  imgHeight = 0,
  labelType,
  uploadToCustomSystemLiftingAPI,
  hidePreview = false,
  isBannerImage = false,
}: TRhfDragDrop) {
  const method = useFormContext()
  const [openCropModal, setOpenCropModal] = useState(false)
  // const [tooltipOpen, setTooltipOpen] = useState(false)

  const {
    getValues,
    watch,
    control,
    setValue,
    setError,
    trigger,
    formState: { errors },
  } = method
  const { t } = useTranslation()
  const value = watch(name)
  const [mappedAcceptedFiles, setMappedAcceptedFiles] = useState<
    File | undefined
  >()
  // console.log(registrationType) - removed to prevent undefined logs
  const [loading, setLoading] = useState(false)
  // const previewUrl = useAppSelector(
  //   (state) =>
  //     state.agent.agentRegistration.bulkRegFormValues?.versionJson?.documents ||
  //     [],
  // )
  // console.log("previewUrl", previewUrl)
  const handleUpload = useCallback(
    async (file: File) => {
      setOpenCropModal(false)
      setLoading(true)
      try {
        // Determine file type
        const fileType = file.type.includes("pdf") ? "PDF" : "IMAGE"

        // Validate file type
        if (!acceptedType || typeof acceptedType !== "object") {
          throw new Error("No accepted file types specified")
        }

        const acceptedTypes = Object.keys(acceptedType as object)
        if (
          !acceptedTypes.some((type) =>
            file.type.startsWith(type.split("/")[0]),
          )
        ) {
          throw new Error(
            `Invalid file type. Accepted types: ${acceptedTypes.join(", ")}`,
          )
        }

        // Store original filename
        const originalFileName = file.name

        let response
        if (uploadToCustomSystemLiftingAPI) {
          const formData = new FormData()
          formData.append("file", file)
          formData.append("image_type", apiImageType || "")
          formData.append("file_type", fileType)
          formData.append("userCode", userCode || "")
          // Send original filename to backend
          formData.append("original_filename", originalFileName)

          response = await systemLiftingImageUploadAPI(formData)
        } else if (isBannerImage) {
          console.log("ISB")
          const formData = new FormData()
          formData.append("file", file)
          formData.append("image_type", "PROFILE_PHOTO")
          formData.append("file_type", fileType)
          formData.append("dynamicImageType", "")

          response = await uploadImg(formData)
        } else {
          const formData = new FormData()
          formData.append("file", file)
          formData.append("image_type", apiImageType || "")
          formData.append("file_type", fileType)
          formData.append("dynamicImageType", "")
          // Send original filename to backend
          formData.append("original_filename", originalFileName)

          response = await imageUploadAPICust(formData)
        }

        if (
          (response?.status === "Success" || response?.status === "SUCCESS") &&
          (response.responseCode === 200 || response.responseCode === 20000)
        ) {
          // const formValue = {
          //   file: response?.data?.fileUrl || "",
          //   originalFileName, // Store original filename
          //   fileId: {
          //     imageCode: response.data.imageId,
          //     imageType: apiImageType,
          //     fileType,
          //     imageUrl: response.data.imageUrl,
          //     fileName: response.data.fileName, // Backend filename
          //     originalFileName, // Also store in fileId for consistency
          //     fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`, // Calculate file size
          //   },
          // }
          const formValue = {
            file: isBannerImage
              ? `${import.meta.env.VITE_URL}${response?.data?.fileUrl}`
              : response?.data?.fileUrl,
            originalFileName, // Store original filename
            fileId: {
              imageCode: response.data.imageId,
              imageType: apiImageType,
              fileType,
              imageUrl: response.data.imageUrl,
              fileName: response.data.fileName,
            },
          }
          setValue(name, formValue, {
            shouldValidate: true,
          })
          setError(name, { type: "custom", message: "" }) // Clear any existing errors
        } else {
          const fileErrorMessage = response?.message || "Failed to upload file"
          setError(name, { type: "custom", message: fileErrorMessage })
          setMappedAcceptedFiles(undefined)
        }
      } catch (error: any) {
        console.error("Upload error:", error)
        setError(name, {
          type: "custom",
          message:
            error?.message || "An error occurred while uploading the file",
        })
        setMappedAcceptedFiles(undefined)
      } finally {
        setLoading(false)
      }
    },
    [
      name,
      setError,
      setValue,
      apiImageType,
      acceptedType,
      uploadToCustomSystemLiftingAPI,
      userCode,
    ],
  )

  // const handleTooltipClose = () => {
  //   setTooltipOpen(false)
  // }

  // const handleTooltipOpen = () => {
  //   setTooltipOpen(true)
  // }

  const onDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      let validationError = false
      setLoading(true)
      async function uploadImage() {
        if (!multiple && !validationError) {
          if (valueType === "base64") {
            const base64AcceptedFiles = await Promise.all(
              acceptedFiles.map(async (acceptedFile) => {
                const promiseResult = await converToBase64(acceptedFile)
                return Promise.resolve({ file: promiseResult })
              }),
            )
            const base64RejectedFiles = await Promise.all(
              rejectedFiles.map(async (rejectedFile) => {
                const convertedFile = await converToBase64(rejectedFile.file)
                const promiseResult = {
                  file: convertedFile,
                  errors: rejectedFile.errors,
                }
                return Promise.resolve(promiseResult)
              }),
            )
            if (base64AcceptedFiles?.length > 0) {
              setValue(
                name,
                {
                  file: base64AcceptedFiles[0].file,
                  originalFileName: acceptedFiles[0].name, // Store original filename
                },
                {
                  shouldValidate: true,
                },
              )
            } else if (base64RejectedFiles.length > 0) {
              let errorMessage = ""
              if (
                base64RejectedFiles[0].errors &&
                base64RejectedFiles[0].errors[0].code === "file-invalid-type"
              ) {
                errorMessage =
                  "MerchantOnboarding.ErrorMessages.onlyPdfFileType"
              } else if (
                base64RejectedFiles[0].errors &&
                base64RejectedFiles[0].errors[0].code === "file-too-large"
              ) {
                errorMessage =
                  "MerchantOnboarding.ErrorMessages.pdfSizeValidation"
              }
              setValue(
                name,
                {
                  errors: {
                    message: errorMessage,
                    code: rejectedFiles[0].errors[0].code,
                  },
                },
                {
                  shouldValidate: true,
                },
              )
            }
          } else {
            const acceptedFilesTemp = acceptedFiles.map((acceptedFile) => ({
              file: acceptedFile,
            }))
            const acceptedFilesBase64 = await Promise.all(
              acceptedFiles.map(async (acceptedFile) => {
                const promiseResult = await converToBase64(acceptedFile)
                return Promise.resolve({ file: promiseResult })
              }),
            )
            if (acceptedFilesBase64?.length > 0) {
              if (isGeneralImageUpload && !isStaticImageUpload) {
                const imageUploadSuccess = await imageUpload(
                  acceptedFiles,
                  name,
                  apiImageType,
                  userCode,
                )

                if (imageUploadSuccess.status) {
                  setValue(
                    name,
                    {
                      file: acceptedFilesBase64[0].file,
                      originalFileName: acceptedFiles[0].name, // Store original filename
                      fileId: {
                        imageCode: imageUploadSuccess.data.imageId,
                        imageType: apiImageType,
                        fileType: "IMAGE",
                        imageUrl: imageUploadSuccess.data.imageUrl,
                        fileName: imageUploadSuccess.data.fileName, // Backend filename
                        originalFileName: acceptedFiles[0].name, // Original filename
                        fileSize: `${(
                          acceptedFiles[0].size /
                          (1024 * 1024)
                        ).toFixed(1)} MB`,
                      },
                    },
                    {
                      shouldValidate: true,
                    },
                  )
                } else {
                  setError(name, {
                    type: "custom",
                    message:
                      imageUploadSuccess.message || "Failed to upload image",
                  })
                }
              } else if (isStaticImageUpload) {
                setMappedAcceptedFiles(acceptedFilesTemp[0].file)
                await handleUpload(acceptedFilesTemp[0].file)
              }
            }
          }
        }
      }

      try {
        if (isDimensionValidate && acceptedFiles?.length > 0) {
          const image = new Image()
          image.src = URL.createObjectURL(acceptedFiles[0])
          image.onload = async () => {
            URL.revokeObjectURL(image.src)
            if (image.width !== imgWidth || image.height !== imgHeight) {
              validationError = true
              const errorMessage = `Image size must be ${imgWidth} * ${imgHeight} pixels.`
              setError(name, { type: "custom", message: errorMessage })
            } else {
              await uploadImage()
            }
          }
        } else {
          await uploadImage()
        }

        // Handle rejected files
        if (rejectedFiles.length > 0) {
          let errorMessage = ""
          if (rejectedFiles[0].errors[0].code === "file-invalid-type") {
            errorMessage = isGeneralImageUpload
              ? "Invalid file type. Please upload a valid image file (JPEG, PNG)."
              : "Invalid file type. Please upload a valid image file (JPEG, PNG)."
          } else if (rejectedFiles[0].errors[0].code === "file-too-large") {
            errorMessage = `File must be smaller than ${
              maxSize ? maxSize / (1024 * 1024) : "5"
            } MB.`
          } else if (rejectedFiles[0].errors[0].code === "INVALID-FILE-NAME") {
            errorMessage = "File name must not contain spaces"
          }
          setError(name, { type: "custom", message: errorMessage })
          setValue(name, null)
          setMappedAcceptedFiles(undefined)
          setTimeout(() => {
            trigger(name)
          }, 1000) // 1 seconds = 10000 milliseconds
        }
      } catch (error: any) {
        setError(name, {
          type: "custom",
          message:
            error?.message || "An error occurred while processing the file",
        })
        setValue(name, null)
        setMappedAcceptedFiles(undefined)
      } finally {
        setLoading(false)
      }
    },
    [
      multiple,
      name,
      setValue,
      valueType,
      apiImageType,
      isGeneralImageUpload,
      handleUpload,
      isStaticImageUpload,
      setError,
      imgWidth,
      imgHeight,
      maxSize,
      userCode,
    ],
  )

  const showError = !!errors[name]
  const errorMessage: any = _.has(errors, `${name}.message`)
    ? _.get(errors, `${name}.message`)
    : ""
  const deleteUploadedContent = useCallback(async () => {
    if (!isSoftDelete) {
      if (getValues(name)) {
        // const fileDeleteSuccess = await staticFileContentDelete(
        //   getValues(name).split(
        //     `${process?.env.REACT_APP_URL}/api/common/v1/static-content/get-file/`,
        //   )[1],
        // )
        // if (
        //   fileDeleteSuccess.status ||
        //   fileDeleteSuccess?.message === "File Not Found"
        // ) {
        //   setValue(name, null)
        //   setMappedAcceptedFiles(undefined)
        // }
        setValue(name, null)
        setMappedAcceptedFiles(undefined)
      }
    } else {
      if (addImagesToDelete) {
        addImagesToDelete({
          type: isCropFile || isStaticImageUpload ? "static" : "general",
          data:
            isCropFile || isStaticImageUpload
              ? getValues(name)
              : getValues(name)?.fileId?.imageCode,
        })
      }
      setValue(name, null)
      setMappedAcceptedFiles(undefined)
    }
  }, [
    addImagesToDelete,
    getValues,
    isCropFile,
    isSoftDelete,
    isStaticImageUpload,
    name,
    setValue,
  ])

  return (
    <>
      <CropModal
        isOpen={openCropModal}
        onClose={() => {
          setOpenCropModal(false)
          setMappedAcceptedFiles(undefined)
          setValue(name, null)
        }}
        handleUpload={handleUpload}
        file={mappedAcceptedFiles}
      />
      <Controller
        name={name}
        control={control}
        defaultValue={null}
        render={(props) => {
          const { field } = props

          return (
            <>
              <CropModal
                isOpen={openCropModal}
                onClose={() => {
                  setOpenCropModal(false)
                  setMappedAcceptedFiles(undefined)
                  setValue(name, null)
                }}
                // handleUpload={handleUpload}
                handleUpload={() => {
                  // handleChange(field, file)
                  setOpenCropModal(false)
                }}
                file={mappedAcceptedFiles}
              />
              <InputLabel
                htmlFor={name}
                disabled
                style={{ opacity: `${disabled ? "0.4" : ""}` }}
              >
                <Box sx={{ pb: 0.5 }}>
                  <Typography
                    className="MaterialUiFields-label"
                    variant="label"
                  >
                    <Label
                      label={label}
                      labelType={labelType}
                      isDisabled={disabled}
                      isModal={false}
                    />
                  </Typography>
                </Box>
              </InputLabel>
              <Dropzone
                validator={(file) => {
                  if (file.name.includes(" ")) {
                    return {
                      code: "INVALID-FILE-NAME",
                      message: "file name is invalid",
                    }
                  }
                  return null
                }}
                multiple={false}
                onDrop={(
                  acceptedFiles: File[],
                  rejectedFiles: FileRejection[],
                ) => {
                  if (isCropFile && acceptedFiles.length > 0) {
                    setMappedAcceptedFiles(acceptedFiles[0])
                    setOpenCropModal(true)
                  } else {
                    onDrop(acceptedFiles, rejectedFiles)
                  }
                }}
                accept={acceptedType}
                maxSize={maxSize}
                disabled={disabled}
                noClick={disabled}
                noKeyboard={disabled}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps({
                      className: "dropzone",
                      style: {
                        cursor: disabled ? "not-allowed" : "pointer",
                        opacity: disabled ? "0.4" : "1",
                        padding: "0",
                        margin: "0",
                        border: "none",
                        outline: "none",
                      },
                    })}
                  >
                    <input {...getInputProps()} />
                    <Grid
                      justifyContent="center"
                      alignItems="center"
                      direction="column"
                      wrap="nowrap"
                      spacing="0"
                      style={{
                        height: "auto",
                        minHeight: "40px",
                        opacity: `${disabled ? "0.4" : ""}`,
                        padding: "4px",
                        margin: "0",
                      }}
                    >
                      <Grid
                        item
                        fontWeight={500}
                        display="flex"
                        alignItems="center"
                        flexWrap="wrap"
                        gap={0}
                      >
                        {loading ? (
                          <CircularProgress size={20} />
                        ) : (
                          <>
                            {!hidePreview && value && value.file && (
                              <Grid
                                container
                                alignItems="center"
                                spacing={1}
                                sx={{ mb: 2 }}
                              >
                                <Grid item>
                                  {typeof value === "string" &&
                                  isVideo.includes(
                                    value.split(".").pop() ?? "",
                                  ) ? (
                                    <VideoViewer
                                      isClosedIconDisabled={false}
                                      name={name}
                                      label=""
                                      handleClick={() => {
                                        deleteUploadedContent()
                                      }}
                                      fileURL={value}
                                    />
                                  ) : (
                                    <ImageViewer
                                      isClosedIconDisabled={false}
                                      uploadedFile={value?.file}
                                      name={name}
                                      label=""
                                      handleClick={() => {
                                        deleteUploadedContent()
                                      }}
                                      fileURL={
                                        (isGeneralImageUpload &&
                                          !isCropFile &&
                                          !isStaticImageUpload) ||
                                        isBannerImage
                                          ? value?.file
                                          : value
                                      }
                                      imgUrl={value?.file}
                                      width={
                                        imgWidth ? `${imgWidth}px` : undefined
                                      }
                                      height={
                                        imgHeight ? `${imgHeight}px` : undefined
                                      }
                                    />
                                  )}
                                </Grid>
                                {!(isBannerImage && value) && (
                                  <Grid item>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        deleteUploadedContent()
                                      }}
                                      style={{
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        color: "#86898F",
                                        padding: "4px",
                                      }}
                                    >
                                      ×
                                    </button>
                                  </Grid>
                                )}
                              </Grid>
                            )}
                            <Grid
                              item
                              className="dragDrop_container"
                              sx={{
                                textAlign: "center",
                                width: "100%",
                                height: "auto !important",
                                minHeight: "35px !important",
                                padding: "4px !important",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {/* <FileUploadOutlinedIcon className="dragDrop_icon" /> */}
                              <Typography
                                variant="label"
                                className="dragDrop_label"
                                pr={2}
                                pl={2}
                              >
                                Or drop file here
                                <span
                                  role="button"
                                  className="dragDrop_browseFiles"
                                >
                                  Browse
                                </span>
                              </Typography>

                              {/* {value?.fileId?.fileName && (
                                <Typography variant="body2" sx={{ mt: 1, color: '#666', textAlign: 'center' }}>
                                  File: {value.fileId.fileName}
                                </Typography>
                              )} */}
                            </Grid>

                            {/* image preview section */}
                            {!hidePreview && field.value && (
                              <Grid item width="100%">
                                <FilePreview
                                  file={field.value}
                                  isDisabled={disabled ?? false}
                                  isStaticFileUpload={
                                    isStaticImageUpload ?? false
                                  }
                                  isDocUpload={isCropFile ?? false}
                                  deleteUploadedContent={deleteUploadedContent}
                                  // clearField={() => field.onChange(null)}
                                  previewUrl={field.value?.fileId?.imageUrl}
                                  clearField={() => {
                                    setValue(name, null)
                                    setMappedAcceptedFiles(undefined)
                                  }}
                                />
                              </Grid>
                            )}
                          </>
                        )}
                      </Grid>
                    </Grid>
                  </div>
                )}
              </Dropzone>
              <FormHelperText
                className="InstructionTextField"
                style={{
                  opacity: `${disabled ? "0.4" : ""}`,
                  display: "flex",
                }}
              >
                {tooltipMessage && (
                  <InputAdornment
                    position="end"
                    sx={{
                      marginTop: "10px",
                      marginRight: "10px",
                    }}
                  >
                    <Tooltip title={tooltipMessage} arrow placement="bottom">
                      <InfoOutlinedIcon />
                    </Tooltip>
                  </InputAdornment>
                )}
                {instructionMessage}
              </FormHelperText>

              <FormHelperText className="ErrorTextField" error={showError}>
                {t(errorMessage?.message || errorMessage, {
                  name: label,
                  size: maxSize ? maxSize / (1024 * 1024) : maxSize,
                })}
              </FormHelperText>
            </>
          )
        }}
      />
    </>
  )
}

RhfDragDrop.defaultProps = {
  multiple: false,
  valueType: "bin",
  isCropFile: false,
  disabled: false,
  isStaticImageUpload: false,
  isSoftDelete: false,
  addImagesToDelete: undefined,
  tooltipMessage: "",
  uploadToCustomSystemLiftingAPI: false,
  hidePreview: false,
}

FilePreview.defaultProps = {
  file: undefined,
  isDisabled: false,
  isStaticFileUpload: false,
  isDocUpload: false,
  previewUrl: null,
  // openModal: false,
  // registrationType: null,
}

export default RhfDragDrop
export { FilePreview }
