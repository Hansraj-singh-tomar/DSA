import SomethingWentWrong from "app/pages/Error/SomethingWentWrong2"
import React from "react"

// import auditLogRequest from "./apiWrapper/auditLogRequest"
// import withAuditLogRequest from "./components/common/hoc/withAuditLogRequest"
// import NotFoundError from "./components/notFoundError"

class ErrorBoundary extends React.Component<
  any,
  { hasError: boolean; splittingError: string; pathname: string }
> {
  constructor(props: any) {
    super(props)
    this.state = {
      hasError: false,
      splittingError: "",
      pathname: "",
    }
  }

  static getDerivedStateFromError() {
    return { hasError: true, pathname: window.location.pathname }
  }

  componentDidUpdate(): void {
    const { pathname, hasError } = this.state
    if (hasError && pathname !== window.location.pathname) {
      this.setState({ hasError: false, splittingError: "", pathname: "" })
    }
  }

  componentDidCatch(error: any, errorInfo: any) {
    if (error?.name === "ChunkLoadError") {
      window.location.reload()
      return
    }

    console.log("🔥 Error caught by ErrorBoundary:", error)
    console.log("🧱 Component Stack:", errorInfo.componentStack)

    const splittingError = errorInfo.componentStack?.substr(0, 3500)
    this.setState({ splittingError })
    // This is required because error can be long can db column size is 4000 varchar only. To prevent error it should be less than 4000.
    // this.props.saveAuditAPI(
    //   JSON.stringify(splittingError),
    //   JSON.stringify(error.toString()),
    // )
  }

  render() {
    const { hasError, splittingError, pathname } = this.state
    const { children } = this.props
    if (hasError && window.location.pathname === pathname) {
      return (
        <SomethingWentWrong
          errorCode={400}
          errorText="Sorry! Something went wrong. Please try again after sometime."
          splittingError={splittingError}
        />
      )
    }
    return children
  }
}

// export default withAuditLogRequest(ErrorBoundary)
export default ErrorBoundary
