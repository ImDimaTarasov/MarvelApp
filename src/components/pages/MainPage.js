import { useState } from "react";
import {Helmet} from "react-helmet";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import FindChar from "../findChar/FindChar";

import decoration from '../../resources/img/vision.png';

import './mainPages.scss';

const MainPage = () => {
    
    const [selectedChar, setSelectedChar] = useState(null);
   
    const onCharSelected = (id) => {
       setSelectedChar(id);
    }
    
    return( 
       <>
        <Helmet>
            <title>Marvel information portal</title>
            <meta
                name="description"
                content="Marvel information portal"
            />
        </Helmet>
         <ErrorBoundary>
            <RandomChar/>
        </ErrorBoundary>
        <div className="char__content">
            <ErrorBoundary>
                <CharList onCharSelected={onCharSelected} selectedChar={selectedChar}/>
            </ErrorBoundary>
           <div className="wrapper__char-info">
                <ErrorBoundary>
                    <CharInfo charId={selectedChar} onCharSelected={onCharSelected}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <FindChar/>
                </ErrorBoundary>
           </div>
        </div>
        <img className="bg-decoration" src={decoration} alt="vision"/>
       </>
    )
}
export default MainPage;