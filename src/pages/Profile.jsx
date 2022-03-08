import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      carregando: true,
      jaCarregou: false,
    };

    this.carregaAPI = this.carregaAPI.bind(this);
  }

  componentDidMount() {
    this.setState({
      jaCarregou: true,
    }, () => this.carregaAPI());
  }

  async carregaAPI() {
    const { jaCarregou } = this.state;
    if (jaCarregou) {
      const usuario = await getUser();
      this.setState({
        user: usuario,
        carregando: false,
      });
    }
  }

  render() {
    const { carregando, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {carregando ? <Loading /> : (
          <div>
            <div>
              <img src={ user.image } alt={ user.name } data-testid="profile-image" />
              <h2>Nome</h2>
              <p>{user.name}</p>
              <h2>E-mail</h2>
              <p>{user.email}</p>
              <h2>Descrição</h2>
              <p>{user.description}</p>
            </div>
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        )}
      </div>
    );
  }
}

Profile.propTypes = {
  state: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default Profile;
