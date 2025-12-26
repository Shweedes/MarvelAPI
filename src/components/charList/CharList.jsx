import {Component} from "react";

import './charList.scss';
import MarvelService from "../../services/MarvelService.js";
import Spinner from "../spinner/Spinner.jsx";
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";

class CharList extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        chars: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 1,
        charEnded: false,
    }

    marvelService = new MarvelService()

    onError = () => {
        this.setState({loading: false ,error: true})
    }

    onRequest = (offset) => {
        this.onCharListLoading()
        this.marvelService.getAllCharacters(offset)
            .then(response => {
                this.onCharListLoaded(response)
            })
            .catch(() => {
                this.onError()
            })
    }

    onCharListLoading = () => {
        this.setState({newItemLoading: true})
    }

    onCharListLoaded = (newCharList) => {
        let ended = false
        if(newCharList.length < 9){
            ended = true
        }

        this.setState(({chars, offset}) => ({
            chars: [...chars, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    componentDidMount() {
        this.onRequest()
    }

    render() {

        const {onCharacterSelectedChange} = this.props;
        const {chars, loading, error, offset, newItemLoading, charEnded} = this.state;

        const content = !(loading || error) ? <View chars={chars} onCharacterSelectedChange={onCharacterSelectedChange}/> : null
        const spinner = loading ? <Spinner/> : null
        const errorMessage = error ? <ErrorMessage/> : null

        return (
            <div className="char__list">
                {content}
                {spinner}
                {errorMessage}
                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const View = ({chars, onCharacterSelectedChange}) => {
    return (
        <ul className="char__grid">
            {chars.map((item) => (
                    <li key={item.id} className="char__item" onClick={() => onCharacterSelectedChange(item.id)}>
                        <img src={item.thumbnail} alt={item.name} style={{objectFit: 'cover'}}/>
                        <div className="char__name">{item.name}</div>
                    </li>
            ))}
        </ul>
    )

}

export default CharList;
