import {useState, useEffect, useRef} from "react";

import './charList.scss';
import MarvelService from "../../services/MarvelService.js";
import Spinner from "../spinner/Spinner.jsx";
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";

const CharList = (props) => {

    const [chars, setChars] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const [charEnded, setCharEnded] = useState(false)

    const marvelService = new MarvelService()

    useEffect(() => {
        onRequest()
    }, [])

    const onRequest = (offset) => {
        onCharListLoading()
        marvelService.getAllCharacters(offset)
            .then(response => {
                onCharListLoaded(response)
            })
            .catch(() => {
                onError()
            })
    }

    const onCharListLoading = () => {
        setNewItemLoading(true)
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false
        if(newCharList.length < 9){
            ended = true
        }

        setChars((chars) => [...chars, ...newCharList])
        setLoading(false)
        setNewItemLoading(false)
        setOffset((offset) => offset + 9)
        setCharEnded(charEnded => ended)
    }

    const onError = () => {
        setLoading(false)
        setError(true)
    }

    const itemRefs = useRef([])

    const onClickSelectedChar = (id, index) => {

        itemRefs.current.forEach(item => {
            if (item && item.classList) {  // Проверяем, существует ли элемент
                item.classList.remove('char__item_selected');
            }
        })

        if (itemRefs.current[index]) {
            itemRefs.current[index].classList.add('char__item_selected');
        }

        props.onCharacterSelectedChange(id)
    }

    const content = !(loading || error) ? <View chars={chars} onClickSelectedChar={onClickSelectedChar} itemRefs={itemRefs}/> : null
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
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )

    // render() {
    //
    //     const content = !(loading || error) ? <View chars={chars} onClickSelectedChar={this.onClickSelectedChar} itemRefs={this.itemRefs}/> : null
    //     const spinner = loading ? <Spinner/> : null
    //     const errorMessage = error ? <ErrorMessage/> : null
    //
    //     return (
    //         <div className="char__list">
    //             {content}
    //             {spinner}
    //             {errorMessage}
    //             <button
    //                 className="button button__main button__long"
    //                 disabled={newItemLoading}
    //                 style={{'display': charEnded ? 'none' : 'block'}}
    //                 onClick={() => this.onRequest(offset)}
    //             >
    //                 <div className="inner">load more</div>
    //             </button>
    //         </div>
    //     )
    // }
}

const View = ({chars, onClickSelectedChar, itemRefs}) => {
    return (
        <ul className="char__grid">
            {chars.map((item, index) => (
                    <li key={item.id}
                        className="char__item"
                        onClick={() => onClickSelectedChar(item.id, index)}
                        ref={elem => {
                            itemRefs.current[index] = elem
                        }}>
                        <img src={item.thumbnail} alt={item.name} style={{objectFit: 'cover'}}/>
                        <div className="char__name">{item.name}</div>
                    </li>
            ))}
        </ul>
    )

}

export default CharList;
