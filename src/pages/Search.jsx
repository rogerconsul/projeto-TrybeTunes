import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Card from '../components/CardAlbum';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      habilitado: false,
      carregando: false,
      valorInput: '',
      albuns: [],
      procurou: false,
      pesquisado: '',
    };

    this.verificaInput = this.verificaInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { valorInput } = this.state;
    this.setState({
      carregando: true,
      pesquisado: valorInput,
    }, async () => {
      const data = await searchAlbumsAPI(valorInput);
      this.setState(() => ({
        carregando: false,
        valorInput: '',
        albuns: [...data],
        procurou: true,
      }));
    });
  }

  verificaInput({ target }) {
    if (target.value.length > 1) {
      this.setState({
        habilitado: true,
      });
    } else {
      this.setState({
        habilitado: false,
      });
    }
    this.setState({
      valorInput: target.value,
    });
  }

  render() {
    const {
      habilitado,
      carregando,
      procurou,
      albuns,
      pesquisado,
    } = this.state;
    return (
      carregando ? <Loading /> : (
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
              onClick={ this.handleClick }
            >
              Pesquisar
            </button>
          </form>
          {
            // Unico jeito que consegui foi após criar um componente separado.
            // Precisei de tanta ajuda das salas de estudo que quase desisti.
            // https://dev.to/duomly/how-to-write-if-statement-in-react-js-3j9e
            // pra conseguir fazer os ternários com duas condicionais
          }
          { procurou && (
            <h3>{`Resultado de álbuns de: ${pesquisado}`}</h3>
          )}
          { albuns.length === 0 ? (
            <h3>Nenhum álbum foi encontrado</h3>
          ) : (
            albuns.map((album) => <Card key={ album.collectionId } album={ album } />)
          )}

        </div>
      )
    );
  }
}
export default Search;
