// import { FC } from "react"
import { ReactComponent as DashboardIconDark } from "../../../../assets/images/dashboard-icon-dark.svg"
import { ReactComponent as DashboardIconLight } from "../../../../assets/images/dashboard-icon-light.svg"
import { ReactComponent as MerchantManagementIconLight } from "../../../../assets/images/merchant-management-icon-light.svg"
import { ReactComponent as MerchantManagementIconDark } from "../../../../assets/images/merchant-management-icon-dark.svg"
import { ReactComponent as NotificationsManagementIconLight } from "../../../../assets/images/notifications-management-icon-light.svg"
import { ReactComponent as NotificationsManagementIconDark } from "../../../../assets/images/notifications-management-icon-dark.svg"
import { ReactComponent as CustomerManagementIconLight } from "../../../../assets/images/customer-management-icon-light.svg"
import { ReactComponent as CustomerManagementIconDark } from "../../../../assets/images/customer-management-icon-dark.svg"
import { ReactComponent as TransactionManagementIconLight } from "../../../../assets/images/transaction-management-icon-light.svg"
import { ReactComponent as TransactionManagementIconDark } from "../../../../assets/images/transaction-management-icon-dark.svg"
import { ReactComponent as GroupsIconBlack } from "../../../../assets/images/vuesax-linear-people-black.svg"
import { ReactComponent as TagsManagementIconLight } from "../../../../assets/images/tags-management-icon-light.svg"
import { ReactComponent as TagsManagementIconDark } from "../../../../assets/images/tags-management-icon-dark.svg"
import { ReactComponent as BillPaymentIconLight } from "../../../../assets/images/bill-payment-icon-light.svg"
import { ReactComponent as BillPaymentIconDark } from "../../../../assets/images/bill-payment-icon-dark.svg"
import { ReactComponent as ApprovalIconLight } from "../../../../assets/images/approval.svg"
import { ReactComponent as ApprovalIconDark } from "../../../../assets/images/approvalDark.svg"
import { ReactComponent as AppUpdateManagementIconLight } from "../../../../assets/images/app-update-management-icon-light.svg"
import { ReactComponent as AppUpdateManagementIconDark } from "../../../../assets/images/app-update-management-icon-dark.svg"
import { ReactComponent as QrCodeIconLight } from "../../../../assets/images/QrCodeIconLight.svg"
import { ReactComponent as QrCodeIconDark } from "../../../../assets/images/QrCodeIconDark.svg"
import { ReactComponent as UssdManagementIconLight } from "../../../../assets/images/ussd-management-icon-light.svg"
import { ReactComponent as UssdManagementIconDark } from "../../../../assets/images/ussd-management-icon-dark.svg"
import {
  ReactComponent as AgentManagementIconLight,
  ReactComponent as AgentManagementIconDark,
} from "../../../../assets/images/agent-management-icon-dark.svg"
import { ReactComponent as SystemConfigIcon } from "../../../../assets/images/system-portal.svg"
// import { ReactComponent as ReportSystemConfig } from "../../../../assets/images/report2.svg"
import { ReactComponent as ReportIcon } from "../../../../assets/images/Feature Reports.svg"

interface IProps {
  iconName: string
  className: string
  isActive: boolean
}

function IconSelector({ iconName, className, isActive }: IProps) {
  // function iconComponent(ActiveIcon: FC, InActiveIcon: FC) {
  //   return isActive ? <ActiveIcon /> : <InActiveIcon />
  // }
  switch (iconName) {
    case "dashboard":
      return isActive ? (
        <DashboardIconLight className={className} />
      ) : (
        <DashboardIconDark className={className} />
      )
    case "merchantManagement":
      return isActive ? (
        <MerchantManagementIconLight className={className} />
      ) : (
        <MerchantManagementIconDark className={className} />
      )
    case "notificationsManagement":
      return isActive ? (
        <NotificationsManagementIconLight className={className} />
      ) : (
        <NotificationsManagementIconDark className={className} />
      )
    case "customerManagement":
      return isActive ? (
        <CustomerManagementIconLight className={className} />
      ) : (
        <CustomerManagementIconDark className={className} />
      )
    case "transactionManagement":
      return isActive ? (
        <TransactionManagementIconLight className={className} />
      ) : (
        <TransactionManagementIconDark className={className} />
      )
    case "groups":
      return isActive ? (
        <GroupsIconBlack className={className} />
      ) : (
        <GroupsIconBlack className={className} />
      )
    case "tagsManagement":
      return isActive ? (
        <TagsManagementIconLight className={className} />
      ) : (
        <TagsManagementIconDark className={className} />
      )
    case "biller":
      return isActive ? (
        <BillPaymentIconLight className={className} />
      ) : (
        <BillPaymentIconDark className={className} />
      )
    case "reconPortalManagement":
      return isActive ? (
        <TransactionManagementIconLight className={className} />
      ) : (
        <TransactionManagementIconDark className={className} />
      )
    case "approvalManagement":
      return isActive ? (
        <ApprovalIconLight className={className} />
      ) : (
        <ApprovalIconDark className={className} />
      )
    case "appUpdateManagement":
      return isActive ? (
        <AppUpdateManagementIconLight className={className} />
      ) : (
        <AppUpdateManagementIconDark className={className} />
      )
    case "qrcode":
      return isActive ? (
        <QrCodeIconLight className={className} />
      ) : (
        <QrCodeIconDark className={className} />
      )
    case "ussdManagement":
      return isActive ? (
        <UssdManagementIconLight className={className} />
      ) : (
        <UssdManagementIconDark className={className} />
      )
    case "agentManagement":
      return isActive ? (
        <AgentManagementIconLight className={className} />
      ) : (
        <AgentManagementIconDark className={className} />
      )
    case "systemConfig":
      return isActive ? (
        <SystemConfigIcon className={className} />
      ) : (
        <SystemConfigIcon className={className} />
      )

    case "report":
      return isActive ? (
        <ReportIcon className={className} />
      ) : (
        <ReportIcon className={className} />
      )
    default:
      return null
  }
}
export default IconSelector
