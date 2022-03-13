import React from 'react';
import PropTypes from 'prop-types';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import Header from '../components/Header';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      carregando: true,
      albumID: '',
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({
      carregando: false,
      albumID: id,
    });
  }

  render() {
    const { carregando, albumID } = this.state;
    return (
      <div data-testid="page-album">
        {carregando ? <Loading /> : (
          <div>
            <Header />
            <MusicCard id={ albumID } />
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
