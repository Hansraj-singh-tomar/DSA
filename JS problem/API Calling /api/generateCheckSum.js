/* eslint-disable no-empty */
// eslint-disable-next-line import/no-unresolved
import { encryptRequestData } from "app/utils/encryption1"
import getHashString from "./getHashString"

const getChecksum = (object, passkey, isResponse = false) => {
  if (object) {
    let sortedRequest = passkey
    Object.keys(object)
      .sort()
      .forEach((v) => {
        if (
          v.toLowerCase() === "selfimage" ||
          v.toLowerCase() === "imageids" ||
          v.toLowerCase() === "checksum" ||
          v.toLowerCase() === "data"
        ) {
        } else if (typeof object[v] === "string" && object[v].trim() === "") {
        } else if (object[v] !== "" && object[v] !== null) {
          if (typeof object[v] === "object") {
            sortedRequest += isResponse ? "" : getHashString(object[v])
          } else
            sortedRequest +=
              object[v] != null || object[v] !== undefined ? object[v] : ""
        }
      })
    let today = new Date()
    const dd = String(today.getDate()).padStart(2, "0")
    const mm = String(today.getMonth() + 1).padStart(2, "0") // January is 0!
    const yyyy = today.getFullYear()
    today = `${dd}-${mm}-${yyyy}`
    sortedRequest += today
    const hash = encryptRequestData(sortedRequest, passkey)
    return hash
  }
  return ""
}
export default getChecksum
