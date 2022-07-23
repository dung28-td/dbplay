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
  UPDATE_REDIS_RECORD: {
    data: {
      updateRedisRecord: CoreRedisRecordFields | null
    }
    vars: {
      key: string
      input: RedisRecord
    }
  }
  DELETE_REDIS_RECORDS: {
    data: {
      deleteRedisRecords: 'ok' | null
    }
    vars: {
      keys: string[]
    }
  }
  EXEC_SQL_QUERY: {
    data: {
      execSQLQuery: Record<string, any>[] | null
    }
    vars: {
      query: string
    }
  }
}