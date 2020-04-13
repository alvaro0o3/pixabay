import React from 'react';
import styled from '@emotion/styled';
import heart from '../heart.svg';
import eye from '../eye.svg';

const Image = styled.img`
    height: 200px;

    @media (max-width: 767px) {
        height: auto;
    }
`;

const Icon = styled.img`
    width: 20px;
    margin-right: 4px;

`;

const Imagen = ({ imagen }) => {

    const { largeImageURL, likes, views, previewURL, tags } = imagen;

    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-4 mb-4">
            <div className="card">
                <Image src={previewURL} alt={tags} className="card-img-top" />

                <div className="card-body">
                    <p className="card-text"> <Icon src={heart} alt="likes" /> {likes}</p>
                    <p className="card-text"> <Icon src={eye} alt="views" /> {views}</p>
                </div>
                <div className="card-footer">
                    <a
                        href={largeImageURL}
                        target='_blank'
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-block text-white"
                    >Ver imagen</a>
                </div>
            </div>
        </div>
    );
}

export default Imagen;