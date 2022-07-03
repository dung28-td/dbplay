import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { redisScanPagination } from "utils/apollo";

const clients: {
  [key: string]: ApolloClient<NormalizedCacheObject>
} = {}

if (process.env.NODE_ENV === 'development') {
  // @ts-ignore
  window.apolloClients = clients
}

export const generateApolloClient = (connectionId: string = "") => {
  if (!clients[connectionId]) {
     clients[connectionId] = new ApolloClient({
      uri: '/graphql',
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              redisKeys: redisScanPagination()
            }
          },
          RedisRecord: {
            keyFields: ["key"]
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