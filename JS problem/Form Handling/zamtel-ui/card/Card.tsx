import {
  Card,
  CardContent,
  //   Typography,
  CardActions,
  //   IconButton,
  //   Button,
} from "@mui/material"
import { ReactElement } from "react"

interface IProps {
  children?: ReactElement | null
  CardActionComponent?: ReactElement
  height?: string
  marginBottom?: string
  padding?: string
  rest?: any
  cardClass?: string
}

function CommonCard({
  children,
  CardActionComponent,
  height,
  marginBottom,
  padding,
  rest,
  cardClass,
}: IProps) {
  return (
    <Card
      sx={{
        borderRadius: "16px",
        height: { height },
        marginBottom: { marginBottom },
        ...rest,
      }}
      elevation={0}
      className={cardClass}
    >
      <CardContent sx={{ padding: { padding } }}>{children}</CardContent>
      {CardActionComponent && (
        <CardActions disableSpacing>{CardActionComponent}</CardActions>
      )}
    </Card>
  )
}

CommonCard.defaultProps = {
  CardActionComponent: null,
  children: null,
  height: "100%",
  marginBottom: "0px",
  padding: 1,
  rest: () => {},
  cardClass: "",
}

export default CommonCard
