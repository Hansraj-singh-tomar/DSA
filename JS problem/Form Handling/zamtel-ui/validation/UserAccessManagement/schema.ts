import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"

function schema(formStage: string) {
  let validationSchema = yup.object().shape({})

  const AddEditRoleCategories = {
    categoryName: genValidation({
      type: "string",
      isRequired: true,
      isNullable: false,
      minLength: 1,
    }),
    categoryDescription: genValidation({
      type: "string",
      isRequired: true,
      isNullable: false,
      minLength: 1,
    }),
  }

  const AddEditDepartments = {
    departmentName: genValidation({
      type: "string",
      isRequired: true,
      isNullable: false,
      minLength: 1,
    }),
    departmentDescription: genValidation({
      type: "string",
      isRequired: true,
      isNullable: false,
      minLength: 1,
    }),
  }

  const AddEditDesignations = {
    designationName: genValidation({
      type: "string",
      isRequired: true,
      isNullable: false,
      minLength: 1,
    }),
    designationDescription: genValidation({
      type: "string",
      isRequired: true,
      isNullable: false,
      minLength: 1,
    }),
  }

  const AddRole = {
    roleName: genValidation({
      type: "string",
      isRequired: true,
      isNullable: false,
      minLength: 1,
    }),
    portalId: genValidation({
      type: "mixed",
      isRequired: true,
      isNullable: false,
    }),
    categoryId: genValidation({
      type: "mixed",
      isRequired: true,
      isNullable: false,
    }),
    roleDescription: genValidation({
      type: "string",
      isRequired: true,
      isNullable: false,
      minLength: 1,
    }),
    baselinePermissions: yup.boolean().required(),
    cloneRoleId: yup.mixed().when("baselinePermissions", {
      is: true,
      then: genValidation({
        type: "mixed",
        isRequired: true,
        isNullable: true,
      }),
    }),
  }

  const EditRole = {
    roleName: genValidation({
      type: "string",
      isRequired: true,
      isNullable: false,
      minLength: 1,
    }),
    categoryId: genValidation({
      type: "mixed",
      isRequired: true,
      isNullable: false,
    }),
    roleDescription: genValidation({
      type: "string",
      isRequired: true,
      isNullable: false,
      minLength: 1,
    }),
  }

  const AddUser = {
    userName: genValidation({
      type: "string",
      isRequired: true,
      isNullable: false,
      minLength: 1,
    }),
    employeeId: genValidation({
      type: "string",
      isRequired: true,
      isNullable: false,
      minLength: 1,
    }),
    emailId: genValidation({
      type: "string",
      isRequired: true,
      isNullable: false,
      format: "email",
    }),
    designationId: genValidation({
      type: "mixed",
      isRequired: true,
      isNullable: false,
    }),
    departmentId: genValidation({
      type: "mixed",
      isRequired: true,
      isNullable: false,
      minLength: 1,
    }),
    // phoneNo: yup
    //   .number()
    //   .transform((value) => (Number.isNaN(value) ? undefined : value))
    //   .required(),
    phoneNo: yup.string().when({
      is: (phoneNo: string) => phoneNo.length === 0 || phoneNo === undefined,
      then: genValidation({
        type: "string",
        isRequired: true,
      }),
      otherwise: genValidation({
        type: "mobile",
        isRequired: true,
        label: "Phone Number",
      }),
    }),
    roleIds: genValidation({
      type: "array",
      minArraySize: 1,
      isRequired: true,
      isNullable: false,
    }),
  }

  const EditUser = {
    userName: genValidation({
      type: "string",
      isRequired: true,
      isNullable: false,
      minLength: 1,
    }),
    employeeId: genValidation({
      type: "string",
      isRequired: true,
      isNullable: false,
      minLength: 1,
    }),
    emailId: genValidation({
      type: "string",
      isRequired: true,
      isNullable: false,
      format: "email",
    }),
    designationId: genValidation({
      type: "mixed",
      isRequired: true,
      isNullable: false,
    }),
    departmentId: genValidation({
      type: "mixed",
      isRequired: true,
      isNullable: false,
      minLength: 1,
    }),
    phoneNo: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? undefined : value))
      .required(),
    roleIds: genValidation({
      type: "array",
      minArraySize: 1,
      isRequired: true,
      isNullable: false,
    }),
  }

  const ReactivateRole = {
    activationRemarks: yup
      .string()
      .required("Remarks is required to reject selected requests !"),
  }

  const DeactivateRole = {
    deactivationRemarks: yup
      .string()
      .required("Remarks is required to reject selected requests !"),
  }

  switch (formStage) {
    case "AddEditRoleCategories":
      validationSchema = yup.object().shape({
        ...AddEditRoleCategories,
      })
      break
    case "AddEditDepartments":
      validationSchema = yup.object().shape({
        ...AddEditDepartments,
      })
      break
    case "AddEditDesignations":
      validationSchema = yup.object().shape({
        ...AddEditDesignations,
      })
      break
    case "AddRole":
      validationSchema = yup.object().shape({
        ...AddRole,
      })
      break
    case "EditRole":
      validationSchema = yup.object().shape({
        ...EditRole,
      })
      break
    case "AddUser":
      validationSchema = yup.object().shape({
        ...AddUser,
      })
      break
    case "EditUser":
      validationSchema = yup.object().shape({
        ...EditUser,
      })
      break
    case "DeactivateRole":
      validationSchema = yup.object().shape({
        ...DeactivateRole,
      })
      break
    case "ReactivateRole":
      validationSchema = yup.object().shape({
        ...ReactivateRole,
      })
      break
    default:
      validationSchema = yup.object().shape({})
      break
  }
  return validationSchema
}
export default schema
