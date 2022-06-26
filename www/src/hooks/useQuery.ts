import { QueryHookOptions, useQuery as useApolloQuery } from "@apollo/client";
import * as queries from 'gql/queries'

export default function useQuery<T extends keyof typeof queries>(
  key: T,
  options?: QueryHookOptions<Queries[T]['data'], Queries[T]['vars']>
) {
  return useApolloQuery<Queries[T]['data'], Queries[T]['vars']>(queries[key], options)
}