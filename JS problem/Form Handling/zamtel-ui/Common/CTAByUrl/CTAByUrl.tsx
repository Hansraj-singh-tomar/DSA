import { Box } from "@mui/material"
import { fetchDropdown } from "app/api/ContentManagement/ContentManagementAPI"
import FieldsRender from "app/components/zamtel-ui/fieldsRender/FieldsRender"
import { IDefaultValueObject } from "app/models/form"
import { DROPDOWN_TYPES } from "app/utils/constants"
import { useState } from "react"
import { CTAByUrlFields } from "./CTAByUrlFields"

interface IProps {
  prependKey?: string
}

function CTAByUrl({ prependKey }: IProps) {
  const [asyncOptions, setOptions] = useState<IDefaultValueObject>({
    openInOptions: [],
  })
  const setOptionsData = (keyName: string, data: any) => {
    setOptions((prevOptions: any) => {
      const oldOptions = { ...prevOptions }
      oldOptions[keyName] = data
      return oldOptions
    })
  }
  const getOpenInListOptions = async () => {
    try {
      const response = await fetchDropdown({
        type: DROPDOWN_TYPES.OPEN_IN,
      })
      if (
        response?.status?.toLowerCase() === "success" &&
        (response?.responseCode === 200 ||
          response?.responseCode === 20000 ||
          response?.responseCode === 201 ||
          response?.responseCode === 20001) &&
        response?.data
      ) {
        setOptionsData("openInOptions", response?.data?.result)
      } else {
        setOptionsData("openInOptions", [])
      }
    } catch (err: any) {
      setOptionsData("openInOptions", [])
    }
  }
  const asyncOptionsSelector = (fieldName: string) => {
    switch (fieldName) {
      case `${prependKey}openIn`:
        return asyncOptions.openInOptions
      default:
        return []
    }
  }
  const comboboxOpenFunCallSelector = (fieldName: string) => {
    switch (fieldName) {
      case `${prependKey}openIn`:
        return getOpenInListOptions
      default:
        return () => {}
    }
  }
  return (
    <>
      <Box className="box-fields">
        <FieldsRender
          column="row"
          fieldDetails={[CTAByUrlFields(prependKey || "")[0]]}
          isWrapRequired={false}
          options={asyncOptionsSelector}
          onOpenFunCall={comboboxOpenFunCallSelector}
        />
      </Box>
      <Box className="box-fields">
        <FieldsRender
          column="row"
          fieldDetails={CTAByUrlFields(prependKey || "").slice(1)}
          isWrapRequired
          options={asyncOptionsSelector}
          onOpenFunCall={comboboxOpenFunCallSelector}
        />
      </Box>

      {/* <MerchantModal
        open={open}
        handleClose={() => {
          setOpen(false)
        }}
        modifySelectedMerchant={(selectedMerchants) => {
          methods.setValue(`${prependKey}selectedMerchant`, selectedMerchants)
        }}
      /> */}
    </>
  )
}

CTAByUrl.defaultProps = {
  prependKey: "",
}

export default CTAByUrl
