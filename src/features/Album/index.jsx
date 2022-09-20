import React from 'react';
import PropTypes from 'prop-types';
import AlbumList from './components/AlbumList';

AlbumFeature.propTypes = {
    
};

function AlbumFeature(props) {
    const albumList = [
        {
            id:1,
            name:'Phuc',
            thumbnailUrl:'https://i1.sndcdn.com/artworks-nkd9HJFIJIltRIez-8z6j7A-t120x120.jpg'
        },
        {
            id:2,
            name:'Huong',
            thumbnailUrl:'https://i1.sndcdn.com/artworks-FbafzZKsCdWVa2Ir-sP4XFA-t120x120.jpg'
        },
        {
            id:3,
            name:'mam',
            thumbnailUrl:'https://i1.sndcdn.com/artworks-lh9Ff26SEy8BGWbe-l6iojg-t500x500.jpg'
        }
    ]
    return (
        <div>
            <h3>Phucc</h3>
            <AlbumList albumList={albumList} />
        </div>
    );
}

export default AlbumFeature;