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
}