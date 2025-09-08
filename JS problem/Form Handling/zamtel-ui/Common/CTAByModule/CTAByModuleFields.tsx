import { RhfFieldNames } from "app/models/form"

const CtaByModule = (prependKey: string): Array<RhfFieldNames> => [
  {
    name: `${prependKey}targetModule`,
    selector: "asyncCombobox",
    label: "Module",
    placeholder: "Please Select",
    xs: 5,
    dropdownSelector: "keyName",
    columns: [],
    isTableHidden: true,
    required: true,
  },
]

const getFieldsMapping = (appTargetCTAMappingDTO: any) => {
  const { targetModule, targetType } = appTargetCTAMappingDTO
  switch (targetModule?.keyName) {
    default:
      return {
        ...appTargetCTAMappingDTO,
        targetType,
      }
  }
}

export { CtaByModule, getFieldsMapping }
