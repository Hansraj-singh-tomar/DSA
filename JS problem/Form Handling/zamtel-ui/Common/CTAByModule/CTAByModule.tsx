import { Box } from "@mui/material"
import FieldsRender from "app/components/zamtel-ui/fieldsRender/FieldsRender"
import { IDefaultValueObject } from "app/models/form"
import { RETURN_CTA_MODULE_TYPE } from "app/utils/constants"
import { fetchDropdown } from "app/api/ContentManagement/ContentManagementAPI"
import { useState, useEffect } from "react"
import { UseFormReturn } from "react-hook-form"
import { CtaByModule, getFieldsMapping } from "./CTAByModuleFields"

interface IProps {
  methods: UseFormReturn
  prependKey?: string
  moduleType?: string
}

function CTAByModule({ methods, prependKey, moduleType }: IProps) {
  const [asyncOptions, setOptions] = useState<IDefaultValueObject>({
    moduleOptions: [],
  })
  const setOptionsData = (keyName: string, data: any) => {
    setOptions((prevOptions: any) => {
      const oldOptions = { ...prevOptions }
      oldOptions[keyName] = data
      return oldOptions
    })
  }

  const { watch } = methods
  const { appTargetCTAMappingDTO } = prependKey?.split(
    "appTargetCTAMappingDTO",
  )[0]
    ? watch(prependKey?.split(".appTargetCTAMappingDTO")[0])
    : watch()

  const getOpenInListOptions = async () => {
    try {
      const response = await fetchDropdown({
        type: RETURN_CTA_MODULE_TYPE(moduleType),
      })
      if (
        response?.status?.toLowerCase() === "success" &&
        (response?.responseCode === 200 ||
          response?.responseCode === 20000 ||
          response?.responseCode === 201 ||
          response?.responseCode === 20001) &&
        response?.data
      ) {
        setOptionsData("moduleOptions", response?.data?.result)
      } else {
        setOptionsData("moduleOptions", [])
      }
    } catch (err: any) {
      setOptionsData("moduleOptions", [])
    }
  }

  const asyncOptionsSelector = (fieldName: string) => {
    switch (fieldName) {
      case `${prependKey}targetModule`:
        return asyncOptions.moduleOptions
      default:
        return []
    }
  }
  const comboboxOpenFunCallSelector = (fieldName: string) => {
    switch (fieldName) {
      case `${prependKey}targetModule`:
        return getOpenInListOptions
      default:
        return () => {}
    }
  }

  useEffect(() => {
    methods.setValue(
      prependKey?.substring(0, prependKey?.lastIndexOf(".") || 0) || "",
      getFieldsMapping(appTargetCTAMappingDTO),
    )
  }, [JSON.stringify(appTargetCTAMappingDTO?.targetModule)])

  return (
    <Box className="box-fields" pt={2}>
      <FieldsRender
        column="row"
        fieldDetails={CtaByModule(prependKey || "")}
        isWrapRequired={false}
        options={asyncOptionsSelector}
        onOpenFunCall={comboboxOpenFunCallSelector}
      />
    </Box>
  )
}

CTAByModule.defaultProps = {
  prependKey: "",
  moduleType: "",
}

export default CTAByModule
