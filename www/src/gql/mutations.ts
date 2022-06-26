import { gql } from "@apollo/client";
import * as fragments from './fragments'

export const CREATE_CONNECTION = gql`
  ${fragments.CoreConnectionFields}
  mutation CreateConnection($input: CreateConnectionInput!) {
    createConnection(input: $input) {
      ...CoreConnectionFields
    }
  }
`