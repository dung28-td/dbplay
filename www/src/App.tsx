import { Route, Routes } from 'react-router-dom';
import Layout from 'components/Layout';
import routes from 'routes';
import { Suspense } from 'react';
import NotFound from 'elements/NotFound';

const generateRoutes = ({ Component, routes, ...routeProps }: RoutePropsWithoutElement, idx: number) => {
  return (
    <Route
      key={idx}
      {...routeProps}
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <Component />
        </Suspense>
      }
    >
      {routes?.map((route, idx) => generateRoutes(route, idx))}
    </Route>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {routes.map((route, idx) => (
          generateRoutes(route, idx)
        ))}
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
