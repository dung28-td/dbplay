interface CoreConnectionFields {
  id: string
  name: string | null
  dsn: string
  connected: boolean
  __typename: 'Connection'
}

interface CoreRedisRecordFields {
  key: string
  type: RedisRecordType
  value: JSON
  expireAt: number | null
  __typename: 'RedisRecord'
}

type CoreSQLTableFields = Pick<SQLTable, 'schema' | 'name'>

type CoreSQLColumnFields = Pick<SQLColumn, 'dataType' | 'name'>