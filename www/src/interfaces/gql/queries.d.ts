interface Queries {
  CONNECTIONS: {
    data: {
      connections: CoreConnectionFields[]
    }
    vars?: {}
  }
  CONNECTION: {
    data: {
      connection: CoreConnectionFields | null
    }
    vars: {
      connectionId: string
    }
  }
  REDIS_KEYS: {
    data: {
      redisKeys: RedisScanResult<RedisRecordKey>
    }
    vars: {
      cursor?: number
      pattern?: string
      count?: number
    }
  }
  REDIS_VALUE: {
    data: {
      redisValue: CoreRedisRecordFields | null
    }
    vars: {
      key: string
    }
  }
  SQL_TABLES: {
    data: {
      sqlTables: CoreSQLTableFields[]
    }
    vars?: {}
  }
  SQL_TABLE_RECORDS: {
    data: {
      sqlTable: null | (CoreSQLTableFields & {
        columns: CoreSQLColumnFields[]
        records: SQLRecordsFields
      })
    }
    vars: {
      schema: string,
      name: string,
      limit: number,
      offset: number
    }
  }
}