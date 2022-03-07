import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Search from '../pages/Search';
import Favorites from '../pages/Favorites';
import Profile from '../pages/Profile';

class Header extends React.Component {

  render() {
    return (
      <header data-testid="header-component">
        <BrowserRouter>
          <nav>
            <ul>

              <li>
                <Link
                  to="../pages/Search" 
                  data-testid="link-to-search"> 
                  Pesquisa
                </Link>
              </li>

              <li>
                <Link
                  to="../pages/Favorites"
                  data-testid="link-to-favorites">
                  Favoritas
                </Link>
              </li>

              <li>
                <Link
                  to="../pages/Profile" 
                  data-testid="link-to-profile"> 
                  Perfil
                </Link>
              </li>

            </ul>
          </nav>
          <Route exact path="../pages/Search" component={ Search } />
          <Route exact path="../pages/Favorites" component={ Favorites } />
          <Route exact path="../pages/Profile" component={ Profile } />
        </BrowserRouter>
      </header>
    );
  }
}
export default Header;
