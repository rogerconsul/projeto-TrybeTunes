import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      usuario: '',
      carregando: false,
    };
  }

  componentDidMount() {
    this.setState({
      carregando: true,
    }, async () => {
      const { name } = await getUser();
      this.setState({
        usuario: name,
        carregando: false,
      });
    });
  }

  render() {
    const { usuario, carregando } = this.state;
    return (
      carregando ? <Loading /> : (
        <header data-testid="header-component">
          <p data-testid="header-user-name">{usuario}</p>
          <nav>
            <ul>

              <li>
                <Link
                  to="/search"
                  data-testid="link-to-search"
                >
                  Pesquisa
                </Link>
              </li>

              <li>
                <Link
                  to="/favorites"
                  data-testid="link-to-favorites"
                >
                  Favoritas
                </Link>
              </li>

              <li>
                <Link
                  to="/profile"
                  data-testid="link-to-profile"
                >
                  Perfil
                </Link>
              </li>

            </ul>
          </nav>
        </header>
      )
    );
  }
}
export default Header;
