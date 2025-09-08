import { Box } from "@mui/material"
import { fetchDropdown } from "app/api/ContentManagement/ContentManagementAPI"
import FieldsRender from "app/components/zamtel-ui/fieldsRender/FieldsRender"
import { IDefaultValueObject } from "app/models/form"
import { TARGET_TYPE_LIST } from "app/utils/constants"
import { useEffect, useState } from "react"
import { UseFormReturn } from "react-hook-form"
import CTAByModule from "../CTAByModule/CTAByModule"
import CTAByUrl from "../CTAByUrl/CTAByUrl"
import {
  resetOnCTATargetChange,
  targetTypeFieldDetails,
} from "./CTAByTargetFields"
import CTAByMoreInfo from "../CTAByMoreInfo/CTAByMoreInfo"

interface IProps {
  methods: UseFormReturn
  prependKey?: string
  moduleType?: string
}

function CTAByTarget({ methods, prependKey, moduleType }: IProps) {
  const { watch } = methods

  let appTargetCTAMappingDTO: any = {}

  appTargetCTAMappingDTO = watch().appTargetCTAMappingDTO

  useEffect(() => {
    methods.setValue(
      prependKey?.substring(0, prependKey?.lastIndexOf(".") || 0) || "",
      resetOnCTATargetChange(appTargetCTAMappingDTO),
    )
  }, [appTargetCTAMappingDTO?.targetType?.keyValue])

  const [asyncOptions, setOptions] = useState<IDefaultValueObject>({
    targetTypeOptions: [],
  })
  const setOptionsData = (keyName: string, data: any) => {
    setOptions((prevOptions: any) => {
      const oldOptions = { ...prevOptions }
      oldOptions[keyName] = data
      return oldOptions
    })
  }

  const getTargetTypeListOptions = async () => {
    try {
      const response = await fetchDropdown({
        type: "APP_TARGET_TYPE",
      })
      if (
        response?.status?.toLowerCase() === "success" &&
        (response?.responseCode === 200 ||
          response?.responseCode === 20000 ||
          response?.responseCode === 201 ||
          response?.responseCode === 20001) &&
        response?.data
      ) {
        setOptionsData("targetTypeOptions", response?.data?.result)
      } else {
        setOptionsData("targetTypeOptions", [])
      }
    } catch (err: any) {
      setOptionsData("targetTypeOptions", [])
    }
  }

  const asyncOptionsSelector = (fieldName: string) => {
    switch (fieldName) {
      case `${prependKey}targetType`:
        return asyncOptions.targetTypeOptions
      default:
        return []
    }
  }
  const comboboxOpenFunCallSelector = (fieldName: string) => {
    switch (fieldName) {
      case `${prependKey}targetType`:
        return getTargetTypeListOptions
      default:
        return () => {}
    }
  }

  return (
    <>
      <Box className="box-fields">
        <FieldsRender
          column="row"
          fieldDetails={targetTypeFieldDetails(prependKey || "").splice(0, 2)}
          isWrapRequired
          options={asyncOptionsSelector}
          onOpenFunCall={comboboxOpenFunCallSelector}
        />
      </Box>
      {appTargetCTAMappingDTO?.targetType?.keyValue?.trim() ===
        TARGET_TYPE_LIST.MODULE && (
        <CTAByModule
          methods={methods}
          prependKey={prependKey}
          moduleType={moduleType}
        />
      )}
      {appTargetCTAMappingDTO?.targetType?.keyValue?.trim() ===
        TARGET_TYPE_LIST.URL && <CTAByUrl prependKey={prependKey} />}
      {appTargetCTAMappingDTO?.targetType?.keyName?.trim() ===
        TARGET_TYPE_LIST.MORE_INFO && <CTAByMoreInfo prependKey={prependKey} />}
      <Box className="box-fields">
        <FieldsRender
          column="row"
          fieldDetails={targetTypeFieldDetails(prependKey || "").splice(2)}
          isWrapRequired
          options={asyncOptionsSelector}
          onOpenFunCall={comboboxOpenFunCallSelector}
        />
      </Box>
      {/* {appTargetCTAMappingDTO?.targetType?.keyName?.trim() === TARGET_TYPE_LIST.SDK && (
        <Box className="box-fields">
          <FieldsRender
            column="row"
            fieldDetails={sdkFieldDetails(prependKey || "")}
            options={asyncOptionsSelector}
            onOpenFunCall={comboboxOpenFunCallSelector}
          />
        </Box>
      )} */}
    </>
  )
}

CTAByTarget.defaultProps = {
  prependKey: "",
  moduleType: "",
}

export default CTAByTarget
