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
    }

    marvelService = new MarvelService()

    onCharactersLoaded = (response) => {
        this.setState({chars: response, loading: false, error: false});
    }

    onError = () => {
        this.setState({loading: false ,error: true})
    }

    updateCharacters =  () => {
       this.marvelService.getAllCharacters()
           .then(response => {
               this.onCharactersLoaded(response)
               console.log(response)
           })
           .catch(() => {
               this.onError()
           })
    }

    componentDidMount() {
        this.updateCharacters()
    }

    render() {

        const {onCharacterSelectedChange} = this.props;
        const {chars, loading, error} = this.state;

        const content = !(loading || error) ? <View chars={chars} onCharacterSelectedChange={onCharacterSelectedChange}/> : null
        const spinner = loading ? <Spinner/> : null
        const errorMessage = error ? <ErrorMessage/> : null

        return (
            <div className="char__list">
                {content}
                {spinner}
                {errorMessage}
                <button className="button button__main button__long">
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
