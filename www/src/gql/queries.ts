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
  query RedisKeys(
    $cursor: Int,
    $pattern: String,
    $count: Int
  ) {
    redisKeys(
      cursor: $cursor,
      pattern: $pattern,
      count: $count
    ) {
      cursor
      keys {
        key
      }
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