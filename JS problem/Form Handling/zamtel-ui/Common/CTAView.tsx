import { Grid, Typography } from "@mui/material"
import { TARGET_TYPE_LIST, getTextWithoutUnderscore } from "app/utils/constants"
import { isEmpty } from "lodash"
import { useEffect, useState } from "react"
import { greyColor } from "theme"

const PRIMARY_LANG = "Primary Language"
const SECONDARY_LANG = "Secondary Language"

interface DetailsFields {
  key: string
  value: string
}

interface IProps {
  detailsData: any
  style?: any
}

function CTAView({ detailsData, style }: IProps) {
  const [dataFields, setDataFields] = useState<any>()

  const getFieldValues = () => {
    if (
      TARGET_TYPE_LIST[detailsData?.appTargetCTAMappingDTO?.targetType] ===
      TARGET_TYPE_LIST.MODULE
    ) {
      switch (detailsData?.appTargetCTAMappingDTO?.targetModule) {
        default:
          return [
            {
              key: "Target Type:",
              value: detailsData?.appTargetCTAMappingDTO?.targetType ?? "N/A",
            },
            {
              key: "Module:",
              value:
                getTextWithoutUnderscore(
                  detailsData?.appTargetCTAMappingDTO?.targetModule,
                ) ?? "N/A",
            },
          ]
      }
    } else if (
      TARGET_TYPE_LIST[detailsData?.appTargetCTAMappingDTO?.targetType] ===
      TARGET_TYPE_LIST.URL
    ) {
      return [
        {
          key: "Target Type:",
          value: detailsData?.appTargetCTAMappingDTO?.targetType ?? "N/A",
        },
        {
          key: "Open In:",
          value:
            getTextWithoutUnderscore(
              detailsData?.appTargetCTAMappingDTO?.openIn,
            ) ?? "N/A",
        },
        {
          key: `URL (${PRIMARY_LANG}):`,
          value: detailsData?.appTargetCTAMappingDTO?.targetUrlPrimary ?? "N/A",
        },
        {
          key: `URL (${SECONDARY_LANG}):`,
          value:
            detailsData?.appTargetCTAMappingDTO?.targetUrlSecondary ?? "N/A",
        },
      ]
    } else if (
      TARGET_TYPE_LIST[
        detailsData?.appTargetCTAMappingDTO?.targetType?.trim()
      ] === TARGET_TYPE_LIST.SDK
    ) {
      return [
        {
          key: "Target Type:",
          value: detailsData?.appTargetCTAMappingDTO?.targetType ?? "N/A",
        },
        {
          key: "Selected SDK:",
          value: detailsData?.appTargetCTAMappingDTO?.selectedSDK ?? "N/A",
        },
      ]
    }
    return null
  }

  useEffect(() => {
    if (!isEmpty(detailsData)) {
      setDataFields(getFieldValues())
    }
  }, [detailsData])

  return (
    <>
      {dataFields?.map((item: DetailsFields) => (
        <Grid
          container
          item
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          key={item.key}
          ml={style?.ml || 0}
        >
          <Grid item xs={3.8}>
            <Typography variant="subtitle2" color={greyColor} fontWeight={400}>
              {item.key}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="subtitle2" fontWeight={500}>
              {item.value}
            </Typography>
          </Grid>
        </Grid>
      )) ?? (
        <Grid item xs={12}>
          <Typography variant="subtitle2" fontWeight={500}>
            CTA Not Applicable
          </Typography>
        </Grid>
      )}{" "}
    </>
  )
}

CTAView.defaultProps = {
  style: { ml: 0 },
}

export default CTAView
