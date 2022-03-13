import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      musicsList: [],
      artista: '',
      album: '',
    };
  }

  componentDidMount() {
    const { id } = this.props;
    getMusics(id).then((musicas) => this.setState({
      musicsList: [...musicas],
      artista: musicas[0].artistName,
      album: musicas[0].collectionName,
    }));
  }

  render() {
    const { musicsList, artista, album } = this.state;
    return (
      <div>
        <div>
          <h1 data-testid="artist-name">{artista}</h1>
          <h4 data-testid="album-name">
            {album}
          </h4>
        </div>
        { musicsList.map((musica) => (
          musica.kind !== 'song' ? '' : (
            <div key={ musica.trackId }>
              <h3>{ musica.trackName }</h3>
              <audio
                data-testid="audio-component"
                src={ musica.previewUrl }
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
              </audio>
              <label htmlFor="favoriteCheckBox">
                Favorita
                <input
                  type="checkbox"
                  name="favorita"
                  id="favoriteCheckBox"
                  data-testid={ `checkbox-music-${musica.trackId}` }
                />
              </label>
            </div>
          )))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  id: PropTypes.objectOf.isRequired,
};
export default MusicCard;

// O arquivo musicsAPI.js contém uma função que faz uma requisição à uma API e retorna os as músicas de um álbum, ela recebe como parâmetro uma string, que deve ser o id do álbum. O retorno dessa função, quando encontra as informações, é um array onde o primeiro elemento é um objeto com informações do álbum e o restante dos elementos são as músicas do álbum. Atenção: caso não encontre nenhuma informação, a API retornará um array vazio.
