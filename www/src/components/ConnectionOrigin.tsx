import useDSN from "hooks/useDSN";
import { Fragment } from "react";

interface Props {
  dsn: string
}

export default function ConnectionOrigin({ dsn }: Props) {
  const match = useDSN(dsn)

  return (
    <Fragment>
      {[match?.host, match?.port].filter(Boolean).join(':')}
    </Fragment>
  )
}