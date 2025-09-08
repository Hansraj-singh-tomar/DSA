import {
  Avatar,
  // Badge,
  ClickAwayListener,
  Grid,
  Grow,
  IconButton,
  ListItemIcon,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from "@mui/material"
import LogoutIcon from "@mui/icons-material/Logout"
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { logout } from "store/slices/user/authSlice"
// import { useForm } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "store/hook"
import "./ProtectedHeader.scss"
// import useAuth from "app/security/useAuth"

const notifications = [
  {
    requestName: null,
    subject: "New Application Request on PC & CC AMS",
    moduleName: "PC & CC AMS",
    requestCategory: "System Portal AMS",
    userType: null,
    message:
      "Hello Hiren2 Patel, you have received a new application on PC & CC AMS for Approval at 16-07-2024 04:48:11. Click here to take action.",
  },
  {
    requestName: null,
    subject: "New Application Request on User category AMS",
    moduleName: "User category AMS",
    requestCategory: "System Portal AMS",
    userType: null,
    message:
      "Hello Hiren2 Patel, you have received a new application on User category AMS for Approval at 16-07-2024 04:20:05. Click here to take action.",
  },
  {
    requestName: "CC Deactivate",
    subject: "New Application Request on SFC & SCC AMS",
    moduleName: "SFC & SCC AMS",
    requestCategory: "System Portal AMS",
    userType: null,
    message:
      "Hello Hiren2 Patel, you have received a new application on SFC & SCC AMS for Approval at 16-07-2024 02:47:43. Click here to take action.",
  },
  {
    requestName: "CC Deactivate",
    subject: "New Application Request on SFC & SCC AMS",
    moduleName: "SFC & SCC AMS",
    requestCategory: "System Portal AMS",
    userType: null,
    message:
      "Hello Hiren2 Patel, you have received a new application on SFC & SCC AMS for Approval at 16-07-2024 02:47:22. Click here to take action.",
  },
  {
    requestName: null,
    subject: "New Application Request on PC & CC AMS",
    moduleName: "PC & CC AMS",
    requestCategory: "System Portal AMS",
    userType: null,
    message:
      "Hello Hiren2 Patel, you have received a new application on PC & CC AMS for Approval at 16-07-2024 02:31:20. Click here to take action.",
  },
]

const notificationsCount = notifications?.length

const Header = () => {
  // const countryData = useAppSelector((state) => state.user.country)
  // const loggedInUserDetails = useAuth()
  // const methods = useForm({
  //   mode: "onChange",
  //   reValidateMode: "onChange",
  //   // defaultValues: {
  //   //   language: {
  //   //     countryName: countryData.countryName,
  //   //     countryCode: countryData.countryCode,
  //   //     countryLanguageList: countryData.countryLanguageList,
  //   //   },
  //   // },
  // })

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const loggedInUserDetails = useAppSelector(
    (state) => state.user.auth.userName,
  )
  const anchorRef = useRef<HTMLButtonElement>(null)
  const notificationAnchorRef = useRef<HTMLButtonElement>(null)
  const [openNotification, setOpenNotification] = useState<boolean>(false)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }
  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }
    setOpen(false)
  }
  const handleNotificationToggle = () => {
    setOpenNotification((prevOpen: boolean) => !prevOpen)
  }

  const handleNotificationClose = (event: Event | React.SyntheticEvent) => {
    if (
      notificationAnchorRef.current &&
      notificationAnchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }

    setOpenNotification(false)
  }
  const logoutHandler = async () => {
    // const response = await logoutApi()
    // if (response.responseCode === 20000) {
    dispatch(logout())
    window.localStorage.clear()
    navigate("/auth/login", { replace: true })
    //   window.location.reload()
    // }
  }
  // const getCountryList = async () => {
  //   try {
  //     const response = await getCountryListApi({ pageNo: 0, pageSize: 100 })
  //     if (response.responseCode === 20000) {
  //       const filteredCountries = response?.data?.filter(
  //         (country: any) => assignedCountries?.indexOf(country.countryCode) !== -1,
  //       )
  //       setCountries(filteredCountries)
  //     }
  //   } catch (err) {
  //     console.log("Error in getting country list", err)
  //     setCountries([])
  //   }
  // }
  // const asyncOptionsSelector = (fieldName: string) => {
  //   switch (fieldName) {
  //     case "language":
  //       return countries
  //     default:
  //       return []
  //   }
  // }

  // const comboboxOpenFunCallSelector = () => {
  //   return getCountryList
  // }

  // useEffect(() => {
  //   if (countryData.countryCode !== watch("language")?.countryCode) {
  //     dispatch(
  //       updateCountry({
  //         countryName: watch("language")?.countryName,
  //         countryCode: watch("language")?.countryCode,
  //         countryLanguageList: watch("language")?.countryLanguageList,
  //       }),
  //     )
  //     window.sessionStorage.setItem("countryCode", watch("language")?.countryCode)
  //     navigate("/app/dashboard")
  //   }
  // }, [watch("language")?.countryCode])

  return (
    <Grid
      container
      item
      display="flex"
      gap={2}
      alignItems="center"
      justifyContent="flex-end"
      width="80%"
      height="100%"
    >
      <Grid item className="header_lang">
        {/* <FormProvider {...methods}>
          <form>
            <FieldsRender
              column="row"
              fieldDetails={[
                {
                  selector: "asyncCombobox",
                  label: "",
                  placeholder: "",
                  name: "language",
                  dropdownSelector: "countryCode",
                  apiKeyToSend: "country",
                  xs: 6,
                  disableClearable: true,
                },
              ]}
              isWrapRequired
              options={asyncOptionsSelector}
              onOpenFunCall={comboboxOpenFunCallSelector}
            />
          </form>
        </FormProvider> */}
      </Grid>
      <Grid item>
        <IconButton
          className="notification_icon"
          ref={notificationAnchorRef}
          id="custom-notification-button"
          aria-controls={
            openNotification ? "notification-composition-menu" : undefined
          }
          aria-expanded={openNotification ? "true" : undefined}
          aria-haspopup="true"
          disabled
          onClick={handleNotificationToggle}
        >
          {/* {/* <Badge variant="dot" color="error" overlap="circular" invisible={!notifications?.length}> */}
          <NotificationsOutlinedIcon />
          {/* </Badge> */}
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton
          className="avatar_icon"
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <Avatar alt="UserImage" src="/src/assets/UserCircle.svg" />
        </IconButton>
      </Grid>
      <Grid item>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                  >
                    <MenuItem>
                      <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="stretch"
                        zeroMinWidth
                      >
                        <Grid item>
                          <Typography variant="body2" display="inline-block">
                            {loggedInUserDetails}
                          </Typography>
                        </Grid>
                        {/* <Grid item>
                          <Grid container direction="row" justifyContent="flex-start" alignItems="center" zeroMinWidth>
                            <Grid item paddingTop="10px">
                              <ListItemIcon>
                                <EmailIcon fontSize="small" />
                              </ListItemIcon>
                            </Grid>
                            <Grid item>
                              <Typography variant="informationMessage">{loggedInUserEmail}</Typography>
                            </Grid>
                          </Grid>
                        </Grid> */}
                      </Grid>
                    </MenuItem>
                    <MenuItem onClick={logoutHandler}>
                      <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
      <Grid item>
        <Popper
          open={openNotification}
          anchorEl={notificationAnchorRef.current}
          role={undefined}
          placement="bottom-end"
          transition
          disablePortal
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <Paper>
                <ClickAwayListener onClickAway={handleNotificationClose}>
                  <Grid
                    container
                    width="400px"
                    height="388px"
                    overflow="scroll"
                    direction="row"
                    alignContent="flex-start"
                  >
                    <Grid container sx={{ height: "fit-content" }}>
                      <Grid item container pl={4} alignItems="center">
                        <Grid item xs={6}>
                          <Typography variant="h3">
                            Notifications ({notificationsCount || 0})
                          </Typography>
                        </Grid>
                        <Grid item xs={6} textAlign="right">
                          <Typography
                            variant="button"
                            onClick={() => {
                              setOpenNotification(false)
                              navigate("/app/mp/notification/request")
                            }}
                          >
                            See all
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        mt={0.5}
                        height="1px"
                        style={{ backgroundColor: "#f2f2f2" }}
                      />
                    </Grid>
                  </Grid>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  )
}

export default Header
