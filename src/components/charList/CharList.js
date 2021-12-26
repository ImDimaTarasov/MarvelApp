import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import useMarvelService from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    
    const {loading, error, getAllCharacters} = useMarvelService();
    
    useEffect(()=> {
        onRequest(offset, true);
    },[])
    
    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        
        getAllCharacters(offset)
            .then(onCharsLoaded)
    }
    const onCharsLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true
        }

        setCharList(charList => [...charList, ...newCharList]);
        
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9 );
        setCharEnded(ended);
    }
   
    const itemRefs = useRef([]);
    
    
    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }
    const unfocusItem = () => {
        if (props.selectedChar == null) {
            itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        }
    }
    useEffect(() => {
        unfocusItem()
    },[props.selectedChar]);

    function renderItems(arr) {
        const duration = 500;
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
           
            return (
               <CSSTransition
               key ={item.id}
               timeout={duration} 
               classNames="char__item">
                    <li className="char__item"
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el}
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i);   
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            // focusOnItem(i);
                        }
                    }}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
               </CSSTransition>
            )
        })
        
        return (
            <ul className="char__grid">
                 <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }
    

    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}    
            <button 
            className="button button__main button__long"
            style={{'display' : charEnded? 'none' : 'block'}}
            disabled={newItemLoading}
            onClick={() => {onRequest(offset)}}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
   
}

CharList.propTypes = {
    onCharSelected : PropTypes.func.isRequired
}
export default CharList;