import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { ME_QUERY } from './components/Authentication/queries';
import Loader from './components/Utils/Loader';

import SignUp from './pages/Authentication/SignUp';
import Login from './pages/Authentication/Login';
import Logout from './pages/Authentication/Logout';

import Home from './pages/Home/index';
import TournamentPage from './pages/Tournament';
import TournamentSuperCategoryPage from './pages/Tournament/supercategory';
import UserProfile from './pages/User';
import NotFound from './pages/NoMatch';

export const CoreContext = React.createContext(null);

export default function Routes(props: any) {
  const { loading, error, data } = useQuery(ME_QUERY);
  let user: any;

  if (loading) {
    return <Loader />;
  }

  if (data.me === null || error) {
    user = null;
    // ef útrunnið token
    localStorage.removeItem('token');
  } else {
    user = data.me;
  }

  // getum notað þetta fyrir global breytur, með hooks notar maður useContext
  const coreContextValue: any = { user };

  return (
    <CoreContext.Provider value={coreContextValue}>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/tournament/:id' component={TournamentPage} />
          <Route
            exact
            path='/list/:id'
            component={TournamentSuperCategoryPage}
          />
          <Route exact path='/user/:id' component={UserProfile} />

          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/logout' component={Logout} />

          <Route component={NotFound} />
        </Switch>
      </Router>
    </CoreContext.Provider>
  );
}
