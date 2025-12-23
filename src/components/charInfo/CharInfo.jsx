import {Component} from "react";

import './charInfo.scss';
import MarvelService from "../../services/MarvelService.js";
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";
import Spinner from "../spinner/Spinner.jsx";
import Skeleton from "../skeleton/Skeleton.jsx";

class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false,
    }

    marvelService = new MarvelService()

    onCharLoaded = (char) => {
        this.setState({char, loading: false, error: false});
    }

    onError = () => {
        this.setState({loading: false, error: true});
    }

    onCharLoading = () => {
        this.setState({loading: true});
    }

    updateChar = () => {
        const {charId} = this.props

        if(!charId){
            return
        }

        this.onCharLoading()

        this.marvelService.getCharacter(charId)
            .then(response=>{
                this.onCharLoaded(response)
            })
            .catch(() => {
                this.onError()
            })
    }

    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps) {
        if(this.props.charId !== prevProps.charId){
            this.updateChar()
        }
    }

    render() {
        const {char, loading, error} = this.state;

        const sceleton =  char || loading || error ? null : <Skeleton/>
        const errorMessage = error ? <ErrorMessage/> : null
        const spinner = loading ? <Spinner/> : null
        const content = !(loading || error || !char) ? <View char={char}/> : null

        return (
            <div className="char__info">
                {sceleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({char}) => {

    const {name, description, thumbnail, homepage, wiki, comics} = char

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : "There are no comics with this character."}
                {comics.map((item, index) => {
                    if(index === 10) {
                        return null
                    }
                    return (
                        <li key={index} className="char__comics-item">
                            {item}
                        </li>
                    )}
                )}
            </ul>
        </>
    )
}

export default CharInfo;