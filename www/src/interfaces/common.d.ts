interface RedisScanResult<T> {
  cursor: number
  keys: T[]
}

interface RedisRecord {
  key: string
  type: RedisRecordType
  value: JSON
  expireAt: number | null
}

type RedisRecordKey = Pick<RedisRecord, 'key'>

interface SQLTable {
  schema: string
  name: string
  columns: SQLColumn[]
}

interface SQLColumn {
  name: string
  dataType: string
}

interface LimitOffsetPagination {
  limit: number
  offset: number
}