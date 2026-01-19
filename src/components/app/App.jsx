import {useState} from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary.jsx";

import decoration from '../../resources/img/vision.png';
import AppBanner from "../appBaner/AppBanner.jsx";
import ComicsList from "../comicsList/ComicsList.jsx";

const App = () => {

    const [selectedChar, setSelectedChar] = useState(null);

    const onCharacterSelectedChange = (id) => {
        setSelectedChar(id);
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                {/*<ErrorBoundary>*/}
                {/*    <RandomChar/>*/}
                {/*</ErrorBoundary>*/}
                {/*<div className="char__content">*/}
                {/*    <ErrorBoundary>*/}
                {/*        <CharList onCharacterSelectedChange = {onCharacterSelectedChange}/>*/}
                {/*    </ErrorBoundary>*/}
                {/*    <ErrorBoundary>*/}
                {/*        <CharInfo charId={selectedChar}/>*/}
                {/*    </ErrorBoundary>*/}
                {/*</div>*/}
                {/*<img className="bg-decoration" src={decoration} alt="vision"/>*/}
                <AppBanner/>
                <ComicsList />
            </main>
        </div>
    )
}

export default App;