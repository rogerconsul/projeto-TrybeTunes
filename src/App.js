import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/album/:id" component={ Album } />
          <Route path="/profile/edit" render={ () => <ProfileEdit /> } />
          <Route path="/profile" render={ () => <Profile /> } />
          <Route path="/favorites" render={ () => <Favorites /> } />
          <Route path="/search" render={ () => <Search /> } />
          <Route exact path="/" render={ () => <Login /> } />
          <Route path="*" render={ () => <NotFound /> } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
