import { useMemo, useRef } from "react";

export default function useLatestRef<T>(value: T) {
  const ref = useRef(value)

  useMemo(() => {
    if (ref.current === value) return
    ref.current = value
  }, [value])

  return ref
}