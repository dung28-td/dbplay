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
      redisKeys: CoreRedisRecordFields[]
    }
    vars: {
      input: string
    }
  }
}