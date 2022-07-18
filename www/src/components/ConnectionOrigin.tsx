import useDSN from "hooks/useDSN";
import { Fragment } from "react";

interface Props {
  dsn: string
}

export default function ConnectionOrigin({ dsn }: Props) {
  const match = useDSN(dsn)

  if (!match) return null

  const { host, port, db } = match

  return (
    <Fragment>
      {[
        [host, port].filter(Boolean).join(':'),
        db
      ].filter(Boolean).join('/')}
    </Fragment>
  )
}