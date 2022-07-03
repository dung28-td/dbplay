interface RedisScanResult<T> {
  cursor: number
  keys: T[]
}

interface RedisRecord {
  key: string
  type: RedisRecordType
  value: JSON
}