import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../../services/MarvelService';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import Spinner from '../../spinner/Spinner';

import './singleCharacterPage.scss'
const SingleCharacterPage = () => {
    const {characterId} = useParams();
    const [character, setCharacter] = useState(null);
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateComic()
    }, [characterId])

    const updateComic = () => {
        clearError();
        getCharacter(characterId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setCharacter(char);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !character) ? <View char={character}/> : null;
    return(
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
   
}
const View = ({char}) =>{
    const{ name, description, thumbnail} = char;

    return (
        <div className="single-character">
            <img src={thumbnail} alt={name} className="single-character__img"/>
            <div className="single-character__info">
                <h2 className="single-character__name">{name}</h2>
                <p className="single-character__descr">{description}</p>
            </div>
            <Link to="/" className="single-character__back">Back to all</Link>
        </div>
    )
}

export default SingleCharacterPage;