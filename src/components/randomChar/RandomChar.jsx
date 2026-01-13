import {useEffect, useState} from "react";

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

import Spinner from "../spinner/Spinner.jsx";
import MarvelService from "../../services/MarvelService.js";
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";

const RandomChar = () => {

    const [char,setChar] = useState({})
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(false)

    const marvelService = new MarvelService()

    useEffect(()=>{
        updateChar()
    }, [])

    const onCharLoaded = (char) => {
        setChar(char)
        setLoading(false)
        setError(false)
    }

    const onError = () => {
        setLoading(false)
        setError(true)
    }

   const  onCharLoading = () => {
        setLoading(true)
    }

    const updateChar = () => {
        const id = Math.floor(Math.random() * 21)
        onCharLoading()
        marvelService
            .getCharacter(id)
            .then(response => {
                onCharLoaded(response)
            })
            .catch(() => {
                onError()
            })
    }

    const onClickRandomCharButton = () => {
        updateChar()
    }

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error) ? <View char={char}/> : null

    return (
        <div className="randomchar">
            {errorMessage} {spinner} {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={onClickRandomCharButton} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({char}) => {

    const {name, description, thumbnail, homepage, wiki} = char;

    const getDescription = (desc) => {
        if (!desc || !desc.trim()) return "No data...";
        if (desc.length > 150) return `${desc.slice(0, 150)}...`;
        return desc;
    };

    return (
        <div className="randomchar__block">
            <img style={{objectFit: 'cover'}} src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {getDescription(description)}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;