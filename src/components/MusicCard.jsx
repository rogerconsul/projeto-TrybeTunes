import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      checkado: false,
      carregando: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { checkFavorito, trackId } = this.props;
    const numeroFavorito = []
    numeroFavorito.push(checkFavorito.map((musica) => musica));
    console.log(numeroFavorito);
    // const ehVerdade = checkFavorito.trackId === trackId;
    // this.setState({
    //   checkado: ehVerdade,
    // });
  }

  async handleChange() {
    this.setState({
      carregando: true,
    });
    const { checkado } = this.state;
    const { objetoMusica } = this.props;
    await addSong(objetoMusica);
    this.setState({
      checkado: !checkado,
      carregando: false,
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { carregando, checkado, checkFavorito } = this.state;
    if (carregando) {
      return (<Loading />);
    }
    return (
      <div>
        <div>
          <h3>{trackName}</h3>
          <audio
            data-testid="audio-component"
            src={ previewUrl }
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
              name={ trackName }
              id={ trackId }
              checked={ checkado }
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ () => this.handleChange() }
            />
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackId: PropTypes.objectOf.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  objetoMusica: PropTypes.objectOf.isRequired,
};

export default MusicCard;
