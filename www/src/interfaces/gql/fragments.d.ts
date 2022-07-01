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
  __typename: 'RedisRecord'
}