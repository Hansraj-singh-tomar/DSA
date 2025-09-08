import { ModalInfo } from "app/templates/alertModal/AlertModalNew"
import { createContext, Dispatch, SetStateAction } from "react"

const AlertModalContext = createContext<
  Dispatch<SetStateAction<ModalInfo | null>>
>(() => {})

export default AlertModalContext
