import { useCallback, useMemo, useRef } from "react";
import { URLSearchParamsInit, useSearchParams as useRouterSearchParams } from "react-router-dom";

export default function useSearchParams() {
  const [searchParams, setSearchParams] = useRouterSearchParams()
  const spRef = useRef(searchParams)

  const sp = useMemo(() => {
    if (spRef.current !== searchParams) spRef.current = searchParams
    return spRef.current
  }, [searchParams])

  const setSp = useCallback((next: (prevSearchParams: URLSearchParams) => URLSearchParamsInit, options?: { replace?: boolean, state?: any }) => {
    const prevInit = new URLSearchParams(spRef.current.toString())
    const nextInit = next(prevInit)
    setSearchParams(nextInit, options)
  }, [setSearchParams])

  return [sp, setSp] as const
}