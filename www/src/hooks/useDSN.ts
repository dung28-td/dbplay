import { useMemo } from "react";

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
  return useMemo<DSN | undefined>(() => {
    const [scheme, data] = dsn.split("://")
    const [auth, server] = data.split("@")
    const [username, password] = auth.split(":")
    const [origin, path] = server.split("/")
    const [host, port] = origin.split(":")
    const [db, query] = (path || '').split("?")

    if (scheme && host) return { scheme, host, port, username, password, db, query }
    return undefined
  }, [dsn])
}