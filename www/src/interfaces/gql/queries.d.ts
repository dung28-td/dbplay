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
      redisKeys: Omit<CoreRedisRecordFields, 'value'>[]
    }
    vars: {
      input: string
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
}