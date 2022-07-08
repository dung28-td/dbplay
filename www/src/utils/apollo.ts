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