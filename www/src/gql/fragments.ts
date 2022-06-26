import { gql } from "@apollo/client";

export const CoreConnectionFields = gql`
  fragment CoreConnectionFields on Connection {
    id
    name
    dsn
    connected
  }
`