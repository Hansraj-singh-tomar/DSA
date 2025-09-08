import { RhfFieldNames } from "app/models/form"

const PRIMARY_LANG = "Primary Language"
const SECONDARY_LANG = "Secondary Language"

const CTAByUrlFields = (prependKey: string): Array<RhfFieldNames> => [
  {
    name: `${prependKey}openIn`,
    selector: "asyncCombobox",
    label: "Module",
    placeholder: "Please Select",
    xs: 5,
    dropdownSelector: "keyValue",
    isTableHidden: true,
  },
  {
    selector: "textfield",
    label: `URL (${PRIMARY_LANG})`,
    name: `${prependKey}targetUrlPrimary`,
    placeholder: "",
    xs: 5,
  },
  {
    selector: "textfield",
    label: `URL (${SECONDARY_LANG})`,
    name: `${prependKey}targetUrlSecondary`,
    placeholder: "",
    xs: 5,
  },
]

const TagMerchantModalDetails: Array<RhfFieldNames> = [
  {
    selector: "asyncCombobox",
    label: "",
    placeholder: "Select Filter",
    name: "selectMerchantTagFilter",
    dropdownSelector: "filter",
    xs: 12,
    apiKeyToSend: "filter",
  },
]

export { CTAByUrlFields, TagMerchantModalDetails }
