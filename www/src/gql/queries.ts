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

export const SQL_TABLES = gql`
  ${fragments.CoreSQLTableFields}
  query SQLTables {
    sqlTables {
      ...CoreSQLTableFields
    }
  }
`

export const SQL_TABLE_RECORDS = gql`
  ${fragments.CoreSQLTableFields}
  ${fragments.CoreSQLColumnFields}
  ${fragments.SQLRecordsFields}
  query SQLTableRecords(
    $schema: String!,
    $name: String!,
    $limit: Int!,
    $offset: Int!
  ) {
    sqlTable(
      schema: $schema,
      name: $name
    ) {
      ...CoreSQLTableFields
      columns {
        ...CoreSQLColumnFields
      }
      records(
        limit: $limit,
        offset: $offset
      ) {
        ...SQLRecordsFields
      }
    }
  }
`