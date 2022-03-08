import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      habilitado: false,
    };

    this.verificaInput = this.verificaInput.bind(this);
  }

  verificaInput(input) {
    if (input.target.value.length > 1) {
      this.setState({
        habilitado: true,
      });
    } else {
      this.setState({
        habilitado: false,
      });
    }
  }

  render() {
    const { habilitado } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name="searchInput"
            id="SearchInput"
            placeholder="Nome do Artista"
            data-testid="search-artist-input"
            onChange={ this.verificaInput }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ !habilitado }
          >
            Pesquisar
          </button>
        </form>
        <p>Search</p>
      </div>
    );
  }
}
export default Search;
