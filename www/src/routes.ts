import React, { lazy } from "react";
import { IndexRouteProps, LayoutRouteProps, PathRouteProps } from "react-router-dom";

type RouteProps = {
  Component: React.LazyExoticComponent<React.ComponentType>
} & (PathRouteProps | LayoutRouteProps | IndexRouteProps)

const routes: RouteProps[] = [
  {
    path: '/',
    Component: lazy(() => import('elements/Home'))
  }
]

export default routes