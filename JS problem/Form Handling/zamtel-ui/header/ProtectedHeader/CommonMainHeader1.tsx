/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import { Breadcrumbs, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

interface ICommonMainHeaderProps {
  title: string
  buttonDetails?: any
  breadcrumbsDetails: IBreadcrumbsDetails
}

interface ILinkDetails {
  href: string
  name: string
  state?: any
}

interface IBreadcrumbsDetails {
  linkDetails: ILinkDetails[]
  currentTitle: string
}

function CommonMainHeader({
  title,
  buttonDetails,
  breadcrumbsDetails,
}: ICommonMainHeaderProps) {
  const BreadcrumbsDetails = breadcrumbsDetails
  const navigate = useNavigate()
  return (
    <Grid
      container
      py="15px"
      item
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid item>
        <Typography variant="label">{title}</Typography>
        <Breadcrumbs aria-label="breadcrumb">
          {BreadcrumbsDetails?.linkDetails?.map(
            (item: ILinkDetails, index: number) => (
              <button
                key={index}
                onClick={() => navigate(item.href, { state: item.state })}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  margin: 0,
                  textDecoration: "none",
                  fontSize: "11px",
                  color: "#4D74EF",
                  cursor: "pointer",
                }}
              >
                {item?.name}
              </button>
            ),
          )}
          <Typography fontSize="11px" color="#86898F">
            {BreadcrumbsDetails?.currentTitle}
          </Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item>{buttonDetails}</Grid>
    </Grid>
  )
}

CommonMainHeader.defaultProps = {
  buttonDetails: undefined,
}
export default CommonMainHeader
