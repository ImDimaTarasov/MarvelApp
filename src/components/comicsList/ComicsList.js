import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';

import { useState, useEffect, useRef } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import useMarvelService from '../../services/MarvelService';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [offset, setOffset] = useState(7);
    const [comicsEnded, setComicsEnded] = useState(false);


    const {loading, error, getAllComics} = useMarvelService();

    useEffect(()=> {
        onRequest(offset, true);
    }, [])
    
    const onRequest = (offset, initial) => {
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true);

        getAllComics(offset)
            .then(onComicsLoaded)
    }

    const onComicsLoaded = (newComicsList) => {
        let ended = false;
        if(newComicsList.length < 8) {
            ended = true
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewComicsLoading(newComicsLoading => false);
        setOffset(offset => offset + 8);
        setComicsEnded(ended => ended);
    }
    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('comics__item_selected'));
        itemRefs.current[id].classList.add('comics__item_selected');
        itemRefs.current[id].focus();
    }
    
    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.img === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            return (
                <li className="comics__item"
                    key = {i}
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el}
                    onClick={(e) => {
                        focusOnItem(i);
                        e.preventDefault();
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            focusOnItem(i);
                        }
                    }}>
                    <a href="/#">
                        <img src={item.img} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}$</div>
                    </a>
                </li>
            )
        })
        return(
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }
    const items = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newComicsLoading ? <Spinner/> : null;
    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
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