interface Mutations {
  CREATE_CONNECTION: {
    data: {
      createConnection: CoreConnectionFields | null
    }
    vars: {
      input: {
        name?: string
        dsn: string
      }
    }
  }
  CREATE_REDIS_RECORD: {
    data: {
      createRedisRecord: CoreRedisRecordFields | null
    }
    vars: {
      input: RedisRecord
    }
  }
}