import { useLayoutEffect, useReducer, useRef } from "react"

export default function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const optRef = useRef(options)
  const ref = useRef<T>(null)
  const [inView, setInview] = useReducer((_state: boolean, inView: boolean) => inView, false)

  useLayoutEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver((entries, _observer) => {
      for (const entry of entries) {
        if (entry.target !== ref.current) continue
        setInview(entry.isIntersecting)
      }
    }, optRef.current)

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [setInview])

  return {
    ref,
    inView
  }
}