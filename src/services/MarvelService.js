class MarvelService {
    _apiBase = 'https://marvel-server-zeta.vercel.app/'

    _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df'

    _baseOffset = 2;

    getResource = async (url) => {
        let res = await fetch(url)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const response = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`)
        return response.data.results.map(character => this._transformCharacter(character))
    }

    getCharacter = async (id) => {
        const response = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
        return this._transformCharacter(response.data.results[0])
    }

    _transformCharacter = (char) => {
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
}

export default MarvelService;