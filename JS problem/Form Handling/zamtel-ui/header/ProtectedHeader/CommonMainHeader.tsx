import React from "react"
import { Box, Typography, Breadcrumbs as MuiBreadcrumbs } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "store"

interface BreadcrumbItem {
  name: string | string[]
  path?: string
  state?: any
  onClick?: () => void
}

interface CommonMainHeaderProps {
  moduleName?: string
  breadcrumbs?: BreadcrumbItem[]
  onClose?: () => void
}

function CommonMainHeader({
  moduleName,
  breadcrumbs,
  onClose,
}: CommonMainHeaderProps) {
  const navigate = useNavigate()

  // Get header name and current path from Redux store
  const headerName = useSelector((state: RootState) => state.user.ui.headerName)
  const currentPath =
    useSelector((state: RootState) => state.user.ui.route) ||
    window.location.pathname

  // console.log("CurrentPath", currentPath)

  // Format the path segments for breadcrumbs
  const pathSegments = currentPath
    .split("/")
    .filter(
      (segment: string) => segment && !["app", "mp", "cm"].includes(segment),
    )

  const displayModuleName = moduleName || headerName || "Management Portal"

  // Default breadcrumb items if not provided
  const defaultBreadcrumbs: BreadcrumbItem[] = [
    {
      name: "Management Portal",
      path: "/app/mp",
      onClick: onClose, // Now properly using the onClose prop
    },
    ...pathSegments.map((segment: string, index: number) => ({
      name: segment
        .split("-")
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      path:
        index === pathSegments.length - 1
          ? undefined
          : `/app/mp/cm/${pathSegments.slice(0, index + 1).join("/")}`,
    })),
  ]

  const items = breadcrumbs || defaultBreadcrumbs
  // console.log("ITEMS", items)

  return (
    <Box className="pageBreadcrumb">
      <Typography variant="caption" color="text.primary" className="pageName">
        {items[0].name || displayModuleName}
      </Typography>

      <MuiBreadcrumbs aria-label="breadcrumb" className="nav_breadcrumb">
        {items.map((item, index) => (
          <Box
            key={
              (!Array.isArray(item.name) && item.name) || Math.random() * 100
            } // Use a unique identifier
            component="span"
            sx={{
              cursor: item.path || item.onClick ? "pointer" : "default",
              color: index === items.length - 1 ? "text.primary" : "blue", // Current page in black, others in blue
              textDecoration: "none", // No underline
              "&:hover": {
                textDecoration: "none", // Ensure no underline on hover
              },
            }}
            onClick={() => {
              if (item.path) navigate(item.path, { state: item.state })
              if (item.onClick) item.onClick()
            }}
          >
            {index === items.length - 1 ? (
              <Typography color="text.primary" className="breadcrumb_text">
                {item.name}
              </Typography> // Current page
            ) : (
              item.path &&
              !Array.isArray(item.name) && (
                <Link
                  to={item.path}
                  className="breadcrumb_link"
                  style={{ textDecoration: "none" }} // Other breadcrumbs in blue
                >
                  {item.name}
                </Link>
              )
            )}

            {Array.isArray(item.name) &&
              item.name.length > 0 &&
              item.name.map(
                (ele: string | { path?: string; label: string }) => {
                  const label = typeof ele === "string" ? ele : ele.label
                  // const path = typeof ele === "string" ? "" : ele.path
                  return (
                    <React.Fragment
                      key={`breadcrumb-ele-${Math.random() * 100}`}
                    >
                      {label === "History" && " / "}
                      <Link
                        to="/"
                        className="breadcrumb_link"
                        style={{ textDecoration: "none" }}
                      >
                        {label}
                      </Link>
                    </React.Fragment>
                  )
                },
              )}
          </Box>
        ))}
      </MuiBreadcrumbs>
    </Box>
  )
}

// Add defaultProps for optional props
CommonMainHeader.defaultProps = {
  moduleName: "Management Portal", // Default module name
  breadcrumbs: [], // Default to an empty array
  onClose: undefined, // Default to no-op
}

export default CommonMainHeader
