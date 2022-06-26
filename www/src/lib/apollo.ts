import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";

const clients: {
  [key: string]: ApolloClient<NormalizedCacheObject>
} = {}

export const generateApolloClient = (connectionId: string = "") => {
  if (!clients[connectionId]) {
     clients[connectionId] = new ApolloClient({
      uri: '/graphql',
      cache: new InMemoryCache(),
      headers: {
        ...(connectionId && {
          'X-Connection-ID': connectionId
        })
      }
    })
  }

  return clients[connectionId]
}