import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";

const clients: {
  [key: string]: ApolloClient<NormalizedCacheObject>
} = {}

export const generateApolloClient = (connectionId: string = "") => {
  if (!clients[connectionId]) {
     clients[connectionId] = new ApolloClient({
      uri: '/graphql',
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              connection: {
                read(_, { args, toReference }) {
                  if (!args?.connectionId) return
                  return toReference({
                    id: args.connectionId,
                    __typename: 'Connection'
                  })
                }
              }
            }
          }
        }
      }),
      headers: {
        ...(connectionId && {
          'X-Connection-ID': connectionId
        })
      }
    })
  }

  return clients[connectionId]
}