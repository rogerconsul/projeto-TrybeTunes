import React from 'react';
import PropTypes from 'prop-types';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      carregando: true,
      musicsList: [],
      artista: '',
      album: '',
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getMusics(id).then((musicas) => this.setState({
      musicsList: [...musicas],
      artista: musicas[0].artistName,
      album: musicas[0].collectionName,
      carregando: false,
    }));
  }

  render() {
    const { carregando, musicsList, artista, album } = this.state;
    const refinado = musicsList.slice(1);
    return (
      <div data-testid="page-album">
        {carregando ? <Loading /> : (
          <div>
            <Header />
            <div>
              <h1 data-testid="artist-name">{artista}</h1>
              <h4 data-testid="album-name">
                {album}
              </h4>
            </div>
            { refinado.map((musica) => (<MusicCard
              objetoMusica={ musica }
              key={ musica.trackId }
              trackName={ musica.trackName }
              previewUrl={ musica.previewUrl }
              trackId={ musica.trackId }
            />))}
          </div>

        )}

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf.isRequired,
};
export default Album;
