import React, { lazy } from "react";
import { IndexRouteProps, LayoutRouteProps, PathRouteProps } from "react-router-dom";

declare global {
  type RouteProps = {
    Component: React.LazyExoticComponent<React.ComponentType>,
    path?: string,
    routes?: RouteProps[]
  } & (PathRouteProps | LayoutRouteProps | IndexRouteProps)
  type RoutePropsWithoutElement = Omit<RouteProps, 'element'>
}

const routes: RoutePropsWithoutElement[] = [
  {
    path: '/',
    Component: lazy(() => import('elements/Home'))
  },
  {
    path: '/connections/:connectionId',
    Component: lazy(() => import('elements/ConnectionLayout')),
    routes: [
      {
        index: true,
        Component: lazy(() => import('elements/Connection'))
      },
      {
        path: 'records/new',
        Component: lazy(() => import('elements/NewRedisRecord'))
      },
      {
        path: 'records/:key',
        Component: lazy(() => import('elements/RedisRecord'))
      },
      {
        path: 'tables/:table',
        Component: lazy(() => import('elements/Home'))
      }
    ]
  }
]

export default routes