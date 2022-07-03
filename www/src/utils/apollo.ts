import { FieldPolicy } from "@apollo/client"
import { uniq } from "./array"

export function redisScanPagination<T>(keyArgs: FieldPolicy['keyArgs'] = ['pattern']): FieldPolicy<RedisScanResult<T>> {
  return {
    keyArgs,
    merge: (existing, incoming) => {
      if (existing?.cursor === incoming.cursor) return existing

      return {
        ...existing,
        ...incoming,
        keys: uniq([...(existing?.keys || []), ...incoming.keys])
      }
    }
  }
}