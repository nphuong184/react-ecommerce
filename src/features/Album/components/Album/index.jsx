import React from 'react';
import PropTypes from 'prop-types';

Album.propTypes = {
    album: PropTypes.array.isRequired,
};

function Album({album}) {
    return (
        <div className='album'>
            <div className='album_thumnail'>
                <img src={album.thumbnailUrl} alt={album.name} />
            </div>
            <p>{album.name}</p>
        </div>
    );
}

export default Album;