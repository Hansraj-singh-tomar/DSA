import { Grid, Container, Toolbar, AppBar } from "@mui/material"
// import { useTranslation } from "react-i18next"
import { ReactComponent as HeaderLogo } from "assets/images/header.svg"
import "./Header.scss"

function PublicHeader() {
  // const { i18n } = useTranslation()

  // const langChanger = (lang: "en" | "bn") => i18n.changeLanguage(lang)

  return (
    <AppBar
      className="custom-app-bar"
      elevation={2}
      color="secondary"
      position="fixed"
    >
      <Toolbar disableGutters>
        <Container maxWidth="lg">
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            direction="row"
          >
            <Grid item>
              <HeaderLogo />
            </Grid>
            {/* <Grid
              item
              xs={2}
              container
              justifyContent="space-evenly"
              alignItems="center"
              direction="row"
            > */}
            {/* <Grid item>
                <Typography
                  align="right"
                  className={`custom-app-bar_lang_en ${
                    i18n.language === "en"
                      ? "custom-app-bar_lang_en_active"
                      : ""
                  }`}
                  onClick={() => langChanger("en")}
                  onKeyPress={() => langChanger("en")}
                  role="presentation"
                >
                  English
                </Typography>
              </Grid> */}

            {/* <Grid item>
                <Typography> | </Typography>
              </Grid>
              <Grid item>
                <Typography
                  className={`custom-app-bar_lang_bn ${
                    i18n.language === "bn"
                      ? "custom-app-bar_lang_bn_active"
                      : ""
                  }`}
                  onClick={() => langChanger("bn")}
                  onKeyPress={() => langChanger("bn")}
                  role="presentation"
                >
                  Bangla
                </Typography>
              </Grid> */}
            {/* </Grid> */}
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  )
}
export default PublicHeader
