import { FieldPolicy } from "@apollo/client"
import { uniq } from "./array"

export function redisScanPagination<T>(keyArgs: FieldPolicy['keyArgs'] = ['pattern']): FieldPolicy<RedisScanResult<T>> {
  return {
    keyArgs,
    merge: (existing, incoming) => {
      return {
        ...existing,
        ...incoming,
        keys: uniq([...(existing?.keys || []), ...incoming.keys], o => JSON.stringify(o))
      }
    }
  }
}

export function sqlRecordsPagination(keyArgs: FieldPolicy['keyArgs'] = false): FieldPolicy<SQLRecordsFields> {
  return {
    keyArgs,
    read: (existing, { args }) => {
      if (!args || !existing) return

      const { offset, limit } = args

      return {
        ...existing,
        rows: existing?.rows.slice(offset, offset + limit)
      }
    },
    merge: (existing, incoming, { args }) => {
      const offset = args?.offset || 0
      const rows = existing?.rows ? existing.rows.slice(0) : []
      for (let i = 0; i < (incoming.rows?.length || 0); i++) {
        rows[offset + i] = incoming.rows[i]
      }

      return {
        ...existing,
        ...incoming,
        rows
      }
    }
  }
}