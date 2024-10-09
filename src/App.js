import React, { useMemo } from 'react';

// redux for auth guard
import { useSelector } from 'react-redux';

// layout
import Layout from 'layout/Layout';

// routing modules
import RouteIdentifier from 'routing/components/RouteIdentifier';
import { getRoutes } from 'routing/helper';
import routesAndMenuItems from 'routes.js';
import Loading from 'components/loading/Loading';

// import 'Route' bileşeni burada sadece bir kez import ediliyor
import { Route } from 'react-router-dom';
import MasrafDetay from 'views/masraf/MasrafDetay'; // MasrafDetay'i doğru yerden import ediyoruz

const App = () => {
  const { currentUser, isLogin } = useSelector((state) => state.auth);

  const routes = useMemo(() => getRoutes({ data: routesAndMenuItems, isLogin, userRole: currentUser.role }), [isLogin, currentUser]);

  if (routes) {
    return (
      <Layout>
        <RouteIdentifier routes={routes} fallback={<Loading />} />
        {/* MasrafDetay route'u ekleniyor */}
        <Route path="/masraf/masrafdetay/:expenseId" component={MasrafDetay} />
      </Layout>
    );
  }

  return <Loading />;
};

export default App;
