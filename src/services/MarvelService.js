import {useHttp} from "../hooks/http.hook.js";

const useMarvelService = () => {

    const {loading, request, error, clearError} = useHttp()

    const _apiBase = 'https://marvel-server-zeta.vercel.app/'
    const _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df'
    const _baseOffset = 2;

    const getAllCharacters = async (offset = _baseOffset) => {
        const response = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
        return response.data.results.map(character => _transformCharacter(character))
    }

    const getCharacter = async (id) => {
        const response = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformCharacter(response.data.results[0])
    }

    const _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items,
        }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError}
}

export default useMarvelService