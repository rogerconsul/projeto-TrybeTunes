import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: true,
      logado: false,
      carregando: false,
      name: '',
    };

    this.verificaInput = this.verificaInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { name } = this.state;
    this.setState({
      carregando: true,
    }, async () => {
      await createUser({ name });
      this.setState({
        carregando: false,
        logado: true,
      });
    });
  }

  verificaInput(input) {
    this.setState({
      name: input.target.value,
    });
    if (input.target.value.length > 2) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
  }

  render() {
    const { buttonDisabled, logado, carregando } = this.state;

    return (
      logado ? <Redirect to="/search" /> : (
        <div data-testid="page-login">
          {carregando ? <Loading /> : (
            <section>
              <input
                onChange={ this.verificaInput }
                type="text"
                name="login"
                id="login"
                placeholder="Insira seu nome"
                data-testid="login-name-input"
              />
              <button
                type="button"
                disabled={ buttonDisabled }
                data-testid="login-submit-button"
                onClick={ this.handleClick }
              >
                Entrar
              </button>
            </section>)}
        </div>
      ));
  }
}

export default Login;
