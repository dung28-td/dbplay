import { Route, Routes } from 'react-router-dom';
import Layout from 'components/Layout';
import routes from 'routes';
import { Suspense } from 'react';
import NotFound from 'elements/NotFound';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {routes.map(({ Component, ...routeProps }, idx) => (
          <Route
            key={idx}
            {...routeProps}
            element={
              <Suspense fallback={<div>Loadin...</div>}>
                <Component />
              </Suspense>
            }
          />
        ))}
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
