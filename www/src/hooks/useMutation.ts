import { MutationHookOptions, useMutation as useApolloMutation } from "@apollo/client";
import * as mutations from 'gql/mutations'

export default function useMutation<T extends keyof typeof mutations>(
  key: T,
  options?: MutationHookOptions<Mutations[T]['data'], Mutations[T]['vars']>
) {
  return useApolloMutation<Mutations[T]['data'], Mutations[T]['vars']>(mutations[key], options)
}