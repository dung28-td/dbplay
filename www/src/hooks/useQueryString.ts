import { useCallback, useMemo, useRef } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";

export default function useQueryString() {
  const [searchParams, setSearchParams] = useSearchParams()
  const spRef = useRef(searchParams)

  const queryString = useMemo(() => {
    if (spRef.current !== searchParams) spRef.current = searchParams
    return spRef.current
  }, [searchParams])

  const setQueryString = useCallback((next: (prevSearchParams: URLSearchParams) => URLSearchParamsInit, options?: { replace?: boolean, state?: any }) => {
    const prevInit = new URLSearchParams(spRef.current.toString())
    const nextInit = next(prevInit)
    setSearchParams(nextInit, options)
  }, [])

  return [queryString, setQueryString] as const
}