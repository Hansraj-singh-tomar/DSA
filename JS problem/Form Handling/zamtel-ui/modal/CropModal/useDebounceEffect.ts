import { useEffect, DependencyList } from "react"

export default function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps?: DependencyList | any[] | undefined,
) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn()
    }, waitTime)

    return () => {
      clearTimeout(t)
    }
  }, deps)
}
