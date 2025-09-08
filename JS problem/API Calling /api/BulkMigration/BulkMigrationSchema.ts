/* eslint-disable prettier/prettier */
import * as yup from "yup"
import { genValidation } from "app/utils/commonFunctions"

function BulkMigrationSchema() {
    let validationSchema = yup.object().shape({})

    const rejectRemarks = {
        remarks: genValidation({
            type: "string",
            isRequired: true,
            isNullable: true,
        }),
    }
    validationSchema = yup.object().shape({
        ...rejectRemarks,
    })
    return validationSchema
}
export default BulkMigrationSchema
