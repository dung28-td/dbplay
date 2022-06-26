interface CoreConnectionFields {
  id: string
  name: string | null
  dsn: string
  connected: boolean
}

interface CoreRedisRecordFields {
  key: string
  type: RedisRecordType
  value: JSON
}