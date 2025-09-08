import { RhfFieldNames } from "app/models/form"
import { TARGET_TYPE_LIST } from "app/utils/constants"
import _ from "lodash"

// const PRIMARY_LANG = "Primary Language"
// const SECONDARY_LANG = "Secondary Language"

const targetTypeFieldDetails = (prependKey: string): Array<RhfFieldNames> => [
  {
    selector: "textfield",
    name: `${prependKey}ctaTextPrimary`,
    label: "CTA Name",
    placeholder: "Enter",
    required: true,
    xs: 5,
  },
  {
    name: `${prependKey}targetType`,
    selector: "asyncCombobox",
    label: "Target Type",
    placeholder: "Please Select",
    xs: 5,
    dropdownSelector: "keyValue",
    columns: [],
    isTableHidden: true,
    required: true,
  },
  {
    selector: "textfield",
    name: "dummy",
    label: "Section Name",
    fieldHide: true,
    xs: 5,
  },
]

const sdkFieldDetails = (prependKey: string): Array<RhfFieldNames> => [
  {
    name: `${prependKey}selectedSDK`,
    selector: "asyncCombobox",
    label: "Selected SDK",
    placeholder: "Please Select",
    xs: 5,
    dropdownSelector: "keyValuePrimary",
    columns: [],
    isTableHidden: true,
  },
]

const initialCTAValues = {
  targetType: "",
  targetModule: "",
  openIn: "",
  targetUrlPrimary: "",
  targetUrlSecondary: "",
  selectedSDK: "",
}

const resetOnCTATargetChange = (appTargetCTAMappingDTO: any) => {
  switch (appTargetCTAMappingDTO?.targetType?.keyValue?.trim()) {
    case TARGET_TYPE_LIST.MODULE:
      return {
        ..._.cloneDeep(appTargetCTAMappingDTO),
        openIn: undefined,
        targetUrlPrimary: undefined,
        targetUrlSecondary: undefined,
        selectedSDK: undefined,
      }
    case TARGET_TYPE_LIST.URL:
      return {
        ..._.cloneDeep(appTargetCTAMappingDTO),
        selectedSDK: undefined,
        targetModule: null,
      }
    case TARGET_TYPE_LIST.MORE_INFO:
      return {
        ..._.cloneDeep(appTargetCTAMappingDTO),
        selectedSDK: undefined,
        targetModule: null,
        openIn: undefined,
      }
    case TARGET_TYPE_LIST.SDK:
      return {
        ...appTargetCTAMappingDTO,
        openIn: undefined,
        targetUrlPrimary: undefined,
        targetUrlSecondary: undefined,
        targetModule: null,
      }
    default:
      return { targetType: null }
  }
}

export {
  targetTypeFieldDetails,
  sdkFieldDetails,
  initialCTAValues,
  resetOnCTATargetChange,
}
