import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import AppBanner from '../../appBanner/AppBanner';
import useMarvelService from '../../../services/MarvelService';
import setContent from '../../../utils/setContent';


import './singleCharacterPage.scss'
const SingleCharacterPage = () => {
    const {characterId} = useParams();
    const [character, setCharacter] = useState(null);
    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateComic()
        // eslint-disable-next-line
    }, [characterId])

    const updateComic = () => {
        clearError();
        getCharacter(characterId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharLoaded = (char) => {
        setCharacter(char);
    }

    
    return(
        <>
            {setContent(process, View, character)}
        </>
    )
   
}
const View = ({data}) =>{
    const{ name, description, thumbnail} = data;

    return (
        <>
            <AppBanner/>
            <div className="single-character">
                <Helmet>
                    <title>{name}</title>
                    <meta
                        name="description"
                        content={`page about ${name}`}
                    />
                </Helmet>
                <img src={thumbnail} alt={name} className="single-character__img"/>
                <div className="single-character__info">
                    <h2 className="single-character__name">{name}</h2>
                    <p className="single-character__descr">{description}</p>
                </div>
                <Link to="/" className="single-character__back">Back to all</Link>
            </div>
        </>
    )
}

export default SingleCharacterPage;