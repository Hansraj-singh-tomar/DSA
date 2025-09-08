import * as yup from "yup"
import "app/Yup.config"

function AmsConfigurationSchema(sectionName: string, moduleName: string) {
  let validationSchema

  const commonAMS = {
    approvalManagement: yup.object().shape({
      levels: yup.array().of(
        yup
          .object()
          .shape({
            approvedByName: yup
              .object()
              .nullable()
              .required()
              .test(
                "uniqueValue",
                "No two levels have same assigned designation",
                (item: any, context: any) => {
                  let countShouldNotBeOne = 0
                  context?.from[2]?.value?.levels?.forEach((element: any) => {
                    if (
                      element.approvedByName?.designationName ===
                      item?.designationName
                    ) {
                      countShouldNotBeOne += 1
                    }
                  })
                  if (countShouldNotBeOne === 1) {
                    return true
                  }
                  return false
                },
              ),
            level: yup.string().required(),
          })
          .required(),
      ),
    }),
  }

  const onBoardingAMS = {
    approvalManagement: yup.object().shape({
      levels: yup.mixed().when("isEnabled", {
        is: (isEnabled: boolean) => {
          return isEnabled
        },
        then: yup.array().of(
          yup
            .object()
            .shape({
              approvedByName: yup
                .object()
                .nullable()
                .required()
                .test(
                  "uniqueValue",
                  "No two levels have same assigned designation",
                  (item: any, context: any) => {
                    let countShouldNotBeOne = 0
                    context?.from[2]?.value?.levels?.forEach((element: any) => {
                      if (
                        element.approvedByName?.designationName ===
                        item?.designationName
                      ) {
                        countShouldNotBeOne += 1
                      }
                    })
                    if (countShouldNotBeOne === 1) {
                      return true
                    }
                    return false
                  },
                ),
              level: yup.string().required(),
              functionalities: yup
                .array()
                .min(1, "Minimum 1 option need to select"),
              isSaved: yup.bool().oneOf([true], "Please save"),
            })
            .required(),
        ),
        otherwise: yup.array(),
      }),
    }),
  }

  const slabAMSClick = {
    slabs: yup
      .array()
      .min(1, "Minimum 1 slab need to created with 0 to No-Limit.")
      .of(
        yup.object().shape({
          minRange: yup.string().required(),
          maxRange: yup.string().nullable(),
          approvalLevel: yup.array().of(
            yup
              .object()
              .shape({
                level: yup.string().required(),
                approvalLevel: yup
                  .object()
                  .nullable()
                  .required()
                  .test(
                    "uniqueValue",
                    "No two levels have same assigned designation",
                    (item: any, context: any) => {
                      console.log(item, context)
                      let returnValue = true
                      const countShouldNotBeOne: number[] = []
                      context?.from[3]?.value?.slabs?.forEach(() => {
                        countShouldNotBeOne.push(0)
                      })
                      context?.from[3]?.value?.slabs?.forEach(
                        (slab: any, slabIndex: number) => {
                          slab?.approvalLevel?.forEach((element: any) => {
                            if (
                              element?.approvalLevel?.designationName ===
                              item?.designationName
                            ) {
                              countShouldNotBeOne[slabIndex] += 1
                            }
                          })
                        },
                      )
                      countShouldNotBeOne.forEach((value: number) => {
                        if (value === 2) {
                          returnValue = false
                        }
                      })
                      return returnValue
                    },
                  ),
              })
              .required(),
          ),

          // genValidation({
          //   type: "arrayWithSubObject",
          //   arrayObjectType: [
          //     {
          //       name: "level",
          //       type: "string",
          //       isRequired: true,
          //     },
          //     {
          //       name: "approvalLevel",
          //       type: "object",
          //       isRequired: true,
          //       isNullable: true,
          //     },
          //   ],
          // }),
        }),
      ),
  }

  if (
    (sectionName === "System Portal AMS" && moduleName !== "") ||
    (sectionName === "Financial Modules AMS" && moduleName !== "") ||
    (sectionName === "Transaction AMS" &&
      moduleName !== "" &&
      moduleName !== "Lifting AMS" &&
      moduleName !== "Refund AMS")
  ) {
    validationSchema = yup.object().shape({ ...commonAMS })
  } else if (sectionName === "Onboarding AMS" && moduleName !== "") {
    validationSchema = yup.object().shape({ ...onBoardingAMS })
  } else if (
    sectionName === "Transaction AMS" &&
    (moduleName === "Lifting AMS" || moduleName === "Refund AMS")
  ) {
    validationSchema = yup.object().shape({ ...slabAMSClick })
  } else {
    validationSchema = yup.object().shape({})
  }
  return validationSchema
}

export default AmsConfigurationSchema
