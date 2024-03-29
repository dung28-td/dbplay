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

export const CREATE_REDIS_RECORD = gql`
  ${fragments.CoreRedisRecordFields}
  mutation CreateRedisRecord($input: RedisRecordInput!) {
    createRedisRecord(input: $input) {
      ...CoreRedisRecordFields
    }
  }
`

export const UPDATE_REDIS_RECORD = gql`
  ${fragments.CoreRedisRecordFields}
  mutation UpdateRedisRecord(
    $key: ID!
    $input: RedisRecordInput!
  ) {
    updateRedisRecord(
      key: $key,
      input: $input
    ) {
      ...CoreRedisRecordFields
    }
  }
`

export const DELETE_REDIS_RECORDS = gql`
  mutation DeleteRedisRecords($keys: [ID]) {
    deleteRedisRecords(keys: $keys)
  }
`

export const EXEC_SQL_QUERY = gql`
  mutation ExecSQLQuery($query: String!) {
    execSQLQuery(query: $query)
  }
`