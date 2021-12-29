import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

const setContent = (process, Component, newComicsLoading ) => {
    switch (process) {
        case 'waiting' : 
            return <Spinner/>;
        case 'loading' :
            return newComicsLoading ? <Component/> : <Spinner/>;
        case 'error' :
            return <ErrorMessage/>;
        case 'confirmed' :
            return <Component/>;
        default: 
            throw new Error('Unexpected process state'); 
    } 
}

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [offset, setOffset] = useState(7);
    const [comicsEnded, setComicsEnded] = useState(false);


    const {getAllComics, process, setProcess} = useMarvelService();

    useEffect(()=> {
        onRequest(offset, true);
        // eslint-disable-next-line
    }, [])
    
    const onRequest = (offset, initial) => {
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true);

        getAllComics(offset)
            .then(onComicsLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onComicsLoaded = (newComicsList) => {
        let ended = false;
        if(newComicsList.length < 8) {
            ended = true
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewComicsLoading(newComicsLoading => false);
        setOffset(offset => offset + 8);
        setComicsEnded(ended);
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {

            return (
                <li className="comics__item"
                    key = {i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.img} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}$</div>
                    </Link>
                </li>
            )
        })
        return(
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    return (
        <div className="comics__list">
            {setContent(process, () => renderItems(comicsList), newComicsLoading)}
            <button className="button button__main button__long"
            style={{'display' : comicsEnded? 'none' : 'block'}}
            disabled={newComicsLoading}
            onClick={() => {onRequest(offset)}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;