import { Grid, Typography } from "@mui/material"
import RhfSwitch from "app/components/material-ui/react-hook-form/RhfSwitch"
import { ReactComponent as EditIcon } from "assets/images/edit.svg"
import { ReactComponent as DeleteIcon } from "assets/images/delete.svg"
import { ReactNode } from "react"
import StyledButton from "../styled/StyledButton"

// import { useTranslation } from "react-i18next"

interface TProps {
  name: string
  tabLeftHeading?: string | undefined
  tabRightHeading?: string | undefined
  tabSubHeading?: string | undefined | ReactNode
  isEditVisible?: boolean | undefined
  isDeleteVisible?: boolean | undefined
  isLeftTextVisible?: boolean | undefined
  onClickEdit?: (() => void) | undefined
  onClickDelete?: (() => void) | undefined
  onClickLeftText?: (() => void) | undefined
}
function HeadingDesign2({
  name,
  tabLeftHeading,
  tabRightHeading,
  tabSubHeading,
  isEditVisible,
  isDeleteVisible,
  isLeftTextVisible,
  onClickEdit,
  onClickDelete,
  onClickLeftText,
}: TProps) {
  // const { t } = useTranslation()
  const isHidden = true
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mt={!isEditVisible && !isDeleteVisible ? 1.8 : 0}
      mb={!isEditVisible && !isDeleteVisible ? 1.8 : 0}
    >
      <Grid item>
        <RhfSwitch
          name={name}
          headerLabel=""
          label={
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="stretch"
            >
              <Grid item ml={-6}>
                <Grid
                  container
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Typography variant="body2">
                      {/* {tabLeftHeading && tabLeftHeading !== ""
                    ? t(tabLeftHeading)
                    : ""} */}
                      {tabLeftHeading}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="informationMessage">
                      {/* {tabRightHeading && tabRightHeading !== ""
                    ? t(tabRightHeading)
                    : ""} */}
                      {tabRightHeading}
                    </Typography>
                  </Grid>
                  {tabSubHeading && tabSubHeading !== "" ? (
                    <>
                      <Grid item>{">"}</Grid>
                      <Grid item>
                        <Typography variant="informationMessage">
                          {/* {tabRightHeading && tabRightHeading !== ""
                    ? t(tabRightHeading)
                    : ""} */}
                          {tabSubHeading}
                        </Typography>
                      </Grid>
                    </>
                  ) : (
                    ""
                  )}
                </Grid>
              </Grid>
            </Grid>
          }
          isHidden={isHidden}
        />
      </Grid>
      <Grid item>
        {isLeftTextVisible && (
          <StyledButton variant="text" onClick={onClickLeftText} type="button">
            <Typography
              sx={{
                color: "#4D74EF",
                textAalign: "left",
                textDecoration: "underline",
                font: "normal normal medium 14px/21px Poppins",
                letterSpacing: "0px",

                opacity: "1",
              }}
              pr={0.5}
              pl={0.8}
            >
              Cancel Request?
            </Typography>
          </StyledButton>
        )}
        {isEditVisible && (
          <StyledButton
            sx={{
              color: "#4D74EF",
              textAalign: "left",
              textDecoration: "underline",
              font: "normal normal medium 14px/21px Poppins",
              letterSpacing: "0px",

              opacity: "1",
            }}
            variant="text"
            onClick={onClickEdit}
            type="button"
          >
            <EditIcon />
            <Typography
              sx={{
                color: "#4D74EF",
                textAalign: "left",
                textDecoration: "underline",
                font: "normal normal medium 14px/21px Poppins",
                letterSpacing: "0px",

                opacity: "1",
              }}
              pr={0.5}
              pl={0.8}
            >
              Edit
            </Typography>
          </StyledButton>
        )}
        {isDeleteVisible && (
          <StyledButton
            sx={{
              color: "#4D74EF",
              textAalign: "left",
              textDecoration: "underline",
              font: "normal normal medium 14px/21px Poppins",
              letterSpacing: "0px",

              opacity: "1",
            }}
            variant="text"
            onClick={onClickDelete}
            type="button"
          >
            <DeleteIcon />
            <Typography
              sx={{
                color: "FF0000",
                textAalign: "left",
                textDecoration: "underline",
                font: "normal normal medium 14px/21px Poppins",
                letterSpacing: "0px",

                opacity: "1",
              }}
              pr={0.5}
              pl={0.8}
            >
              Remove
            </Typography>
          </StyledButton>
        )}
      </Grid>
    </Grid>
  )
}

HeadingDesign2.defaultProps = {
  tabLeftHeading: "",
  tabRightHeading: "",
  tabSubHeading: "",
  isEditVisible: false,
  isDeleteVisible: false,
  isLeftTextVisible: false,
  onClickEdit: () => {},
  onClickDelete: () => {},
  onClickLeftText: () => {},
}

export default HeadingDesign2
