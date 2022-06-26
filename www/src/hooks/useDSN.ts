import { useMemo } from "react";

const DSN_REGEX = /^(?<scheme>.+):\/\/(?<username>.*):(?<password>.*)@(?<host>.+)(:(?<port>.*)?)\/?(?<db>.*)?(?<query>\?.*)?$/

interface DSN {
  scheme: string
  host: string
  port?: string
  username?: string
  password?: string
  db?: string
  query?: string
}

export default function useDSN(dsn: string) {
  return useMemo(() => {
    const match = dsn.match(DSN_REGEX)
    return match?.groups as DSN | undefined
  }, [dsn])
}