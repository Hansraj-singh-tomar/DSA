import {
  FormControl,
  Grid,
  InputAdornment,
  OutlinedInput,
  SxProps,
  Tab,
  Tabs,
} from "@mui/material"
import { ReactElement } from "react"
import { useTranslation } from "react-i18next"
import SearchIcon from "@mui/icons-material/Search"

import TabPanel from "./TabPanel"

type TProps = {
  activeTab: number
  tabChangeHandler: (event: unknown, newPageValue: number) => void
  tabs: string[]
  tabComponents: ReactElement[]
  isGreyBackgroundVisible?: boolean
  isSerachBoxVisible?: boolean
  searchValue?: string
  changeHandler?: (event: unknown) => void
  searchPlaceholderName?: string
  tabComponentContainerSx?: SxProps
  noBorder?: boolean
  isDisabled?: boolean
  isTabReRenderRequired?: boolean
  tabsClass?: string
  tabPanelClass?: string
}
function MuiTabs({
  activeTab,
  tabChangeHandler,
  tabs,
  tabComponents,
  isGreyBackgroundVisible,
  isSerachBoxVisible,
  searchValue,
  changeHandler,
  searchPlaceholderName,
  tabComponentContainerSx,
  noBorder,
  isDisabled,
  isTabReRenderRequired,
  tabsClass,
  tabPanelClass,
}: TProps) {
  const { t } = useTranslation()
  return (
    <Grid container direction="column">
      {tabs.length > 0 && (
        <>
          <Grid
            container
            direction="row"
            borderBottom={noBorder ? "" : "1px solid #F4F4F5"}
          >
            <Grid item>
              <Tabs
                value={activeTab}
                onChange={tabChangeHandler}
                TabIndicatorProps={{
                  sx: {
                    width: "max-content",
                    color: "#4D74EF",
                  },
                }}
                className={tabsClass}
              >
                {tabs.map((tabName) => {
                  return (
                    <Tab
                      label={t(tabName)}
                      key={tabName}
                      disabled={isDisabled}
                      style={{
                        fontSize: "13.2px",
                        fontFamily: "poppins",
                        textAlign: "left",
                        width: "max-content",
                        textTransform: "none",
                        fontWeight: "500",
                        padding: "21px 0px 3px 0px",
                        marginRight: "30px",
                        minWidth: "max-content",
                      }}
                    />
                  )
                })}
              </Tabs>
            </Grid>
            {isSerachBoxVisible && (
              <Grid
                item
                xs={6.5}
                justifyContent="flex-end"
                display="flex"
                mt={1.5}
              >
                <Grid item mr={2} xs={7}>
                  <FormControl fullWidth variant="outlined">
                    <OutlinedInput
                      id="outlined-adornment-weight"
                      value={searchValue}
                      onChange={changeHandler}
                      endAdornment={
                        <InputAdornment
                          position="end"
                          style={{ cursor: "pointer" }}
                          // onClick={clickHandler}
                        >
                          <SearchIcon />
                        </InputAdornment>
                      }
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        "aria-label": "weight",
                        sx: {
                          "&::placeholder": {
                            fontSize: "12px",
                            color: "#00000099",
                            fontFamily: "Poppins",
                          },
                        },
                      }}
                      placeholder={searchPlaceholderName}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            )}
          </Grid>
          {isGreyBackgroundVisible && (
            <Grid
              item
              height="15px"
              style={{ backgroundColor: "#f2f2f2" }}
              mt={1.2}
              ml={-2}
            />
          )}
        </>
      )}
      <Grid item sx={tabComponentContainerSx} className={tabPanelClass}>
        {tabComponents?.map((Component, index) => {
          return (
            <TabPanel
              index={index}
              value={activeTab}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              isTabReRenderRequired={!!isTabReRenderRequired}
            >
              {Component}
            </TabPanel>
          )
        })}
      </Grid>
    </Grid>
  )
}

MuiTabs.defaultProps = {
  isGreyBackgroundVisible: false,
  isSerachBoxVisible: false,
  searchValue: "",
  changeHandler: () => {},
  searchPlaceholderName: "",
  tabComponentContainerSx: {},
  noBorder: false,
  isDisabled: false,
  isTabReRenderRequired: true,
  tabsClass: "",
  tabPanelClass: "",
}

export default MuiTabs
