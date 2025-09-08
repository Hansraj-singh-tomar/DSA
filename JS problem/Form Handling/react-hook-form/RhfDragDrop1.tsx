/* eslint-disable no-nested-ternary */
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import {
  Avatar,
  Box,
  CircularProgress,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  Tooltip,
  Typography,
} from "@mui/material"
import Label from "app/components/zamtel-ui/label/Label"
import { TRhfDragDrop } from "app/models/formFields"
import { converToBase64, uuid } from "app/utils/commonFunctions"
import {
  imageUpload,
  staticFileContentUpload,
} from "app/utils/commonUploadAPIFunction"
import _ from "lodash"
import { useCallback, useState } from "react"
import Dropzone, { FileRejection } from "react-dropzone"
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { ReactComponent as SuccessUploadIcon } from "../../../../assets/images/success-upload.svg"
import { ReactComponent as UploadIcon } from "../../../../assets/images/upload.svg"

function RhfDragDrop({
  name,
  label,
  multiple,
  valueType,
  instructionMessage,
  requiredType,
  acceptedType,
  apiImageType,
  maxSize,
  height,
  isGeneralImageUpload = true,
  isCropFile,
  disabled,
  isStaticImageUpload,
  // isSoftDelete,
  // addImagesToDelete = undefined,
  uploadToCustomSystemLiftingAPI,
  userCode,
  isDimensionValidate = false,
  tooltipMessage,
  imgWidth = 0,
  imgHeight = 0,
  isImageUpload,
}: TRhfDragDrop) {
  const method = useFormContext()
  // const [openCropModal, setOpenCropModal] = useState(false)
  // const [tooltipOpen, setTooltipOpen] = useState(false)

  const {
    // getValues,
    watch,
    control,
    setValue,
    setError,
    formState: { errors },
  } = method
  const { t } = useTranslation()
  const value = watch(name)

  const [mappedAcceptedFiles, setMappedAcceptedFiles] = useState<
    File | undefined
  >()

  const [loading, setLoading] = useState(false)

  const handleUpload = useCallback(
    async (file: File | null) => {
      // setOpenCropModal(false)

      setLoading(true)
      const fileUploadSuccess = await staticFileContentUpload(
        [file],
        uploadToCustomSystemLiftingAPI || false,
        false,
        userCode || "",
      )
      console.log(fileUploadSuccess)
      if (fileUploadSuccess.status) {
        if (uploadToCustomSystemLiftingAPI) {
          setValue(name, fileUploadSuccess?.data?.imageUrl || "", {
            shouldValidate: true,
          })
        } else {
          setValue(
            name,
            fileUploadSuccess?.data?.fileUrl || "",

            {
              shouldValidate: true,
            },
          )
        }
        setError(name, { type: "custom", message: "" })
      } else {
        const fileErrorMessage = fileUploadSuccess.message
        setError(name, { type: "custom", message: fileErrorMessage })
        setMappedAcceptedFiles(undefined)
      }
      setLoading(false)
    },
    [name, setError, setValue, uploadToCustomSystemLiftingAPI, userCode],
  )

  // const handleTooltipClose = () => {
  //   setTooltipOpen(false)
  // }

  // const handleTooltipOpen = () => {
  //   setTooltipOpen(true)
  // }

  console.log("acceptedFiles=>", mappedAcceptedFiles, "name==>", name)
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
                { file: base64AcceptedFiles[0].file },
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
              let imageUploadSuccess: any
              if (isGeneralImageUpload && !isStaticImageUpload) {
                imageUploadSuccess = await imageUpload(
                  acceptedFiles,
                  apiImageType,
                  name,
                )
                if (imageUploadSuccess.status) {
                  setValue(
                    name,
                    {
                      file: acceptedFilesBase64[0].file,
                      fileId: {
                        imageCode: imageUploadSuccess.data.imageId,
                        imageType: apiImageType,
                        fileType: "IMAGE",
                      },
                    },
                    {
                      shouldValidate: true,
                    },
                  )
                } else {
                  setError(name, {
                    type: "custom",
                    message: imageUploadSuccess.id,
                  })
                }
              } else if (isStaticImageUpload) {
                setMappedAcceptedFiles(acceptedFilesTemp[0].file)
                handleUpload(acceptedFilesTemp[0].file)
              }
            } else if (rejectedFiles.length > 0) {
              if (isGeneralImageUpload) {
                let errorMessage = ""
                if (
                  rejectedFiles[0].errors &&
                  rejectedFiles[0].errors[0].code === "file-invalid-type"
                ) {
                  errorMessage =
                    "MerchantOnboarding.ErrorMessages.onlyPdfFileType"
                } else if (
                  rejectedFiles[0].errors &&
                  rejectedFiles[0].errors[0].code === "file-too-large"
                ) {
                  errorMessage = "File must be smaller than 500KB."
                }

                setError(name, { type: "custom", message: errorMessage })
              }
              if (uploadToCustomSystemLiftingAPI && isStaticImageUpload) {
                let errorMessage = ""
                if (
                  rejectedFiles[0].errors &&
                  rejectedFiles[0].errors[0].code === "file-invalid-type"
                ) {
                  errorMessage = "Invalid File Type"
                } else if (
                  rejectedFiles[0].errors &&
                  rejectedFiles[0].errors[0].code === "file-too-large"
                ) {
                  errorMessage = "File must be smaller than 5MB."
                }

                setError(name, { type: "custom", message: errorMessage })
                if (uploadToCustomSystemLiftingAPI) {
                  setValue(name, null)
                  setMappedAcceptedFiles(undefined)
                }
              }
            }
          }
          setLoading(false)
        }
      }
      if (isDimensionValidate) {
        const image = new Image()
        image.src = URL.createObjectURL(acceptedFiles[0])
        image.onload = async () => {
          URL.revokeObjectURL(image.src)
          console.log(image.width, image.height, "width")
          // Validate image dimensions
          if (image.width !== imgWidth || image.height !== imgHeight) {
            console.log("error")
            validationError = true
            const errorMessage = `Image size must be ${imgWidth} * ${imgHeight} pixels.`
            setError(name, { type: "custom", message: errorMessage })
          } else {
            uploadImage()
          }
        }
      } else {
        await uploadImage()
      }
      setLoading(false)

      // console.log()
      // FUNCTIONALITY IS WRITTEN ONLY FOR SINGLE FILE UPLOAD
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
      uploadToCustomSystemLiftingAPI,
    ],
  )

  const showError = !!errors[name]
  const errorMessage: any = _.has(errors, `${name}.message`)
    ? _.get(errors, `${name}.message`)
    : ""

  // const deleteUploadedContent = useCallback(async () => {
  //   if (!isSoftDelete) {
  //     if (getValues(name)) {
  //       // const fileDeleteSuccess = await staticFileContentDelete(
  //       //   getValues(name).split(
  //       //     `${process?.env.REACT_APP_URL}/api/common/v1/static-content/get-file/`,
  //       //   )[1],
  //       // )
  //       // if (
  //       //   fileDeleteSuccess.status ||
  //       //   fileDeleteSuccess?.message === "File Not Found"
  //       // ) {
  //       //   setValue(name, null)
  //       //   setMappedAcceptedFiles(undefined)
  //       // }
  //       setValue(name, null)
  //       setMappedAcceptedFiles(undefined)
  //     }
  //   } else {
  //     if (addImagesToDelete) {
  //       addImagesToDelete({
  //         type: isCropFile || isStaticImageUpload ? "static" : "general",
  //         data:
  //           isCropFile || isStaticImageUpload
  //             ? getValues(name)
  //             : getValues(name)?.fileId?.imageCode,
  //       })
  //     }
  //     setValue(name, null)
  //     setMappedAcceptedFiles(undefined)
  //   }
  // }, [
  //   addImagesToDelete,
  //   getValues,
  //   isCropFile,
  //   isSoftDelete,
  //   isStaticImageUpload,
  //   name,
  //   setValue,
  // ])

  // isImageUpload || ((!mappedAcceptedFiles || !value) && !loading)
  console.log(mappedAcceptedFiles, value, loading, isImageUpload, requiredType)

  return (
    <>
      {/* <CropModal
        isOpen={openCropModal}
        onClose={() => {
          setOpenCropModal(false)
          setMappedAcceptedFiles(undefined)
          setValue(name, null)
        }}
        handleUpload={handleUpload}
        file={mappedAcceptedFiles}
      /> */}

      {
        <Controller
          key={`${name}-${uuid()}`}
          name={name}
          control={control}
          defaultValue={null}
          // render={({ field }) => {
          render={() => {
            return (
              <>
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
                      <Label label={label} />
                    </Typography>
                  </Box>
                </InputLabel>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={6}>
                    <Dropzone
                      multiple={false}
                      onDrop={(
                        acceptedFiles: File[],
                        rejectedFiles: FileRejection[],
                      ) => {
                        if (isCropFile && acceptedFiles.length > 0) {
                          setMappedAcceptedFiles(acceptedFiles[0])
                          // setOpenCropModal(true)
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
                            className: "dropzone disabled",
                          })}
                        >
                          <input {...getInputProps()} disabled />
                          <Grid
                            container
                            // justifyContent="center"
                            // alignItems="center"
                            // direction="column"
                            className="dragDrop_container"
                            wrap="nowrap"
                            spacing="3"
                            p={2}
                            style={{
                              height,
                              opacity: `${disabled ? "0.4" : ""}`,
                            }}
                          >
                            <Grid
                              item
                              fontWeight={500}
                              display="flex"
                              alignItems="center"
                            >
                              {(!mappedAcceptedFiles || !value) && !loading ? (
                                <>
                                  <UploadIcon className="dragDrop_icon" />

                                  <Typography
                                    variant="label"
                                    className="dragDrop_label"
                                    pr={2}
                                    pl={2}
                                  >
                                    Drop Document Here or
                                    <span
                                      role="button"
                                      className="dragDrop_browseFiles"
                                    >
                                      Browse
                                    </span>
                                  </Typography>
                                </>
                              ) : loading ? (
                                <CircularProgress size={20} />
                              ) : (
                                <Grid
                                  container
                                  fontWeight={500}
                                  alignItems="center"
                                  justifyContent="center"
                                  spacing={2}
                                >
                                  <Grid item>
                                    <SuccessUploadIcon className="dragDrop_icon" />
                                  </Grid>
                                  <Grid item>
                                    <Typography>
                                      {mappedAcceptedFiles?.name}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              )}
                            </Grid>
                          </Grid>
                        </div>
                      )}
                    </Dropzone>
                  </Grid>
                  {isImageUpload && (
                    <Grid item xs={2}>
                      <Avatar
                        alt="uploaded Image"
                        src={value?.fileUrl || value}
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: "8px",
                          border: "1px solid #CCCCCC",
                        }}
                        variant="square"
                      />
                    </Grid>
                  )}
                </Grid>
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
                  )}{" "}
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

        // <div>
        //   {typeof value === "string" &&
        //   isVideo.includes(value.split(".").pop() ?? "") ? (
        //     <VideoViewer
        //       isClosedIconDisabled={false}
        //       name={name}
        //       label={`${label}${requiredType === "M" ? " *" : ""}`}
        //       handleClick={() => {
        //         deleteUploadedContent()
        //       }}
        //       fileURL={value}
        //     />
        //   ) : (
        //     <Box mr={1}>
        //       {uploadToCustomSystemLiftingAPI ? (
        //         <>
        //           <Controller
        //             name={name}
        //             control={control}
        //             defaultValue={null}
        //             // render={({ field }) => {
        //             render={() => {
        //               return (
        //                 <>
        //                   <InputLabel
        //                     htmlFor={name}
        //                     disabled
        //                     style={{ opacity: `${disabled ? "0.4" : ""}` }}
        //                   >
        //                     <Box sx={{ pb: 1 }}>
        //                       <Typography
        //                         className="MaterialUiFields-label"
        //                         variant="label"
        //                       >
        //                         {label} {requiredType === "M" ? " *" : ""}
        //                       </Typography>
        //                     </Box>
        //                   </InputLabel>
        //                   <Dropzone
        //                     multiple={false}
        //                     onDrop={(
        //                       acceptedFiles: File[],
        //                       rejectedFiles: FileRejection[],
        //                     ) => {
        //                       if (isCropFile && acceptedFiles.length > 0) {
        //                         setMappedAcceptedFiles(acceptedFiles[0])
        //                         setOpenCropModal(true)
        //                       } else {
        //                         onDrop(acceptedFiles, rejectedFiles)
        //                       }
        //                     }}
        //                     accept={acceptedType}
        //                     maxSize={maxSize}
        //                     disabled={disabled}
        //                     noClick={disabled}
        //                     noKeyboard={disabled}
        //                     // getFilesFromEvent={(event: DropEvent) => {
        //                     //   return Array.from(
        //                     //     event?.dataTransfer
        //                     //       ? event?.dataTransfer?.files
        //                     //       : event?.target?.files || [],
        //                     //   )
        //                     // }}
        //                   >
        //                     {({ getRootProps, getInputProps }) => (
        //                       <div
        //                         {...getRootProps({
        //                           className: "dropzone disabled",
        //                         })}
        //                       >
        //                         <input {...getInputProps()} disabled />
        //                         <Grid
        //                           container
        //                           justifyContent="center"
        //                           alignItems="center"
        //                           direction="column"
        //                           className="dragDrop_container"
        //                           wrap="nowrap"
        //                           spacing="3"
        //                           style={{
        //                             height,
        //                             opacity: `${disabled ? "0.4" : ""}`,
        //                           }}
        //                         >
        //                           <Grid
        //                             item
        //                             fontWeight={500}
        //                             display="flex"
        //                             alignItems="center"
        //                           >
        //                             <>
        //                               <FileUploadOutlinedIcon className="dragDrop_icon" />
        //                               <Typography
        //                                 variant="label"
        //                                 className="dragDrop_label"
        //                                 pr={2}
        //                                 pl={2}
        //                               >
        //                                 Drop Image here or
        //                                 <span
        //                                   role="button"
        //                                   className="dragDrop_browseFiles"
        //                                 >
        //                                   Browse
        //                                 </span>
        //                               </Typography>
        //                             </>
        //                           </Grid>
        //                         </Grid>
        //                       </div>
        //                     )}
        //                   </Dropzone>
        //                   <FormHelperText
        //                     className="InstructionTextField"
        //                     style={{
        //                       opacity: `${disabled ? "0.4" : ""}`,
        //                       display: "flex",
        //                     }}
        //                   >
        //                     {tooltipMessage && (
        //                       <InputAdornment
        //                         position="end"
        //                         sx={{
        //                           marginTop: "10px",
        //                           marginRight: "10px",
        //                         }}
        //                       >
        //                         <Tooltip
        //                           title={tooltipMessage}
        //                           arrow
        //                           placement="bottom"
        //                         >
        //                           <InfoOutlinedIcon />
        //                         </Tooltip>
        //                       </InputAdornment>
        //                     )}
        //                     {instructionMessage}
        //                   </FormHelperText>
        //                   <FormHelperText
        //                     className="ErrorTextField"
        //                     error={showError}
        //                   >
        //                     {t(errorMessage, {
        //                       name: label,
        //                       size: maxSize ? maxSize / (1024 * 1024) : maxSize,
        //                     })}
        //                   </FormHelperText>
        //                 </>
        //               )
        //             }}
        //           />
        //           {!showError && (
        //             <Grid
        //               container
        //               alignItems="center"
        //               className="dropDownResult"
        //               mt={1}
        //               pt={1}
        //             >
        //               <Typography variant="label">
        //                 File Uploaded Successfully
        //               </Typography>
        //             </Grid>
        //           )}
        //         </>
        //       ) : (
        //         <ImageViewer
        //           isClosedIconDisabled={false}
        //           uploadedFile={value?.file}
        //           name={name}
        //           label={`${label}${requiredType === "M" ? "*" : ""}`}
        //           handleClick={() => {
        //             deleteUploadedContent()
        //           }}
        //           fileURL={
        //             isGeneralImageUpload && !isCropFile && !isStaticImageUpload
        //               ? value?.file
        //               : value
        //           }
        //           width={imgWidth ? `${imgWidth}px` : undefined}
        //           height={imgHeight ? `${imgHeight}px` : undefined}
        //         />
        //       )}
        //     </Box>
        //   )}
        // </div>
      }
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
  isImageUpload: true,
}

export default RhfDragDrop
