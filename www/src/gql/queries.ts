import { gql } from "@apollo/client";
import * as fragments from './fragments'

export const CONNECTIONS = gql`
  ${fragments.CoreConnectionFields}
  query Connections {
    connections {
      ...CoreConnectionFields
    }
  }
`

export const CONNECTION = gql`
  ${fragments.CoreConnectionFields}
  query Connection($connectionId: ID) {
    connection(connectionId: $connectionId) {
      ...CoreConnectionFields
    }
  }
`