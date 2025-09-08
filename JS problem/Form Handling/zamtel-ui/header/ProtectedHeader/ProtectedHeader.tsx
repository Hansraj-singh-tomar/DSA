import { Outlet } from "react-router-dom"
import "./ProtectedHeader.scss"
import { ReactComponent as Logo } from "assets/Group.svg"
import Sidebar from "app/sidebar/Sidebar1"
import Header from "./Header"

const FinalSidebar = import.meta.env.VITE_RBAC === "true" ? Sidebar : Sidebar

function ProtectedHeader() {
  return (
    <div className="main_wrapper">
      <div className="sidebar_wrapper">
        <div className="logo">
          <Logo />
        </div>
        <div className="sidebar_main">
          <FinalSidebar />
        </div>
      </div>
      <div className="right_container">
        <div className="header_wrapper">
          <Header />
        </div>
        <div className="main_container">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default ProtectedHeader
