import RedisLayout from "layouts/RedisLayout";
import Postgres from "icons/Postgres";
import Redis from "icons/Redis";
import { Fragment } from "react";

export const CONNECTION_TYPES = {
  redis: {
    Icon: Redis,
    Layout: RedisLayout
  },
  rediss: {
    Icon: Redis,
    Layout: RedisLayout
  },
  postgres: {
    Icon: Postgres,
    Layout: Fragment
  }
}

export const REDIS_RECORD_TYPES = {
  STRING: {
    color: 'info'
  },
  HASH: {
    color: 'success'
  },
  LIST: {
    color: 'default'
  },
  SET: {
    color: 'warning'
  },
  ZSET: {
    color: 'error'
  }
} as const

declare global {
  type RedisRecordType = keyof typeof REDIS_RECORD_TYPES
}