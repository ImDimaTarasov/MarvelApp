import { BrowserRouter as Router, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";

import AppHeader from "../appHeader/AppHeader";
import MainPage from "../pages/MainPage";
import ComicsPage from "../pages/ComicsPage";
import SingleComicPage from "../pages/singleComicPage/SingleComicPage";
import Page404 from "../pages/404";
import SingleCharacterPage from "../pages/singleCharacterPage/SingleCharacterPage";


const App = () =>{
   
    
    return (
        <Router>
            <div className="app">
                
                <AppHeader/>
                <main>
                    <Switch>
                        
                        <Route exact path="/">
                            <MainPage/>
                        </Route>

                        <Route exact path="/comics">
                            <ComicsPage/>
                        </Route>

                        <Route exact path="/comics/:comicId">
                            <SingleComicPage/>
                        </Route>
                        <Route exact path="/characters/:characterId">
                            <SingleCharacterPage/>
                        </Route>
                        <Route path="*"> 
                            <Page404/>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    )
    
}

export default App;