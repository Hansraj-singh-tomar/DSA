/* eslint-disable no-empty */
const getHashString = (object) => {
  let sortedRequest = ""
  if (Array.isArray(object)) {
    object.forEach((item) => {
      if (typeof item === "object") sortedRequest += getHashString(item)
    })
  } else if (object instanceof Date) {
    sortedRequest += object.toISOString()
  } else {
    Object.keys(object)
      .sort()
      .forEach((v) => {
        if (v.toLowerCase() === "selfimage" || v.toLowerCase() === "imageids") {
        } else if (
          object[v] !== "" &&
          object[v] !== null &&
          object[v] !== undefined
        ) {
          if (typeof object[v] === "object") {
            sortedRequest += getHashString(object[v])
          } else sortedRequest += object[v]
        }
      })
  }
  return sortedRequest
}
export default getHashString
