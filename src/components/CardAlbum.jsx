import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Card extends React.Component {
  render() {
    const {
      album: { artistName,
        artworkUrl100,
        collectionName,
        collectionId,
      },
    } = this.props;
    return (
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
        getMusics={ collectionId }
      >
        <div>
          <img src={ artworkUrl100 } alt={ artistName } />
          <h3>{ collectionName }</h3>
          <h4>{ artistName }</h4>
        </div>
      </Link>
    );
  }
}

Card.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
  }).isRequired,
};
export default Card;
