
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import useMarvelService from '../../../services/MarvelService';
import setContent from '../../../utils/setContent';
import AppBanner from '../../appBanner/AppBanner';

import './singleComicPage.scss';

const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);
    const {getComic, clearError, process, setProcess} = useMarvelService();
    

    useEffect(() => {
        updateComic()
        // eslint-disable-next-line
    }, [comicId])

    const updateComic = () => {
        clearError();
        getComic(comicId)
            .then(onComicLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    return(
        <>
            {setContent(process, View, comic)}
        </>
    )
}

const View = ({data}) =>{
    const{ title, description, img, price, pageCount, language} = data;

    return (
        <>
            <AppBanner/>
            <div className="single-comic">
                
                <Helmet>
                    <title>{title}</title>
                    <meta
                        name="description"
                        content={`${title} comics book`}
                    />
                </Helmet>
                <img src={img} alt={title} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">Pages: {pageCount}s</p>
                    <p className="single-comic__descr">Launguage: {language}</p>
                    <div className="single-comic__price">Price: {price}</div>
                </div>
                <Link to="/comics" className="single-comic__back">Back to all</Link>
            </div>
        </>
    )
}

export default SingleComicPage;