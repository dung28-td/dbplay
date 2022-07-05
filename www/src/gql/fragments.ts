import { gql } from "@apollo/client";

export const ConnectionID = gql`
  fragment ConnectionID on Connection {
    id
  }
`

export const CoreConnectionFields = gql`
  fragment CoreConnectionFields on Connection {
    id
    name
    dsn
    connected
  }
`

export const CoreRedisRecordFields = gql`
  fragment CoreRedisRecordFields on RedisRecord {
    key
    type
    value
    expireAt
  }
`