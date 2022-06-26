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

export const REDIS_KEYS = gql`
  ${fragments.CoreRedisRecordFields}
  query RedisKeys($input: String!) {
    redisKeys(input: $input) {
      ...CoreRedisRecordFields
    }
  }
`

export const REDIS_VALUE = gql`
  ${fragments.CoreRedisRecordFields}
  query RedisValue($key: String!) {
    redisValue(key: $key) {
      ...CoreRedisRecordFields
    }
  }
`