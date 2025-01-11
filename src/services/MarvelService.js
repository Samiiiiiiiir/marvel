
export default class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=cbbe4d50226d238752d040de30906ebd';
    _baseOffset = 210;

    getResource = async (url) => {
        const req = await fetch(url);
        if (!req.ok) {
            throw new Error(`Could not fetch ${url}, status: ${req.status}`)
        }
        return await req.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(item => this._transformCharacter(item));
    }

    getOneCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (res) => {
        return {
            id: res.id,
            name: res.name,
            description: res.description ? `${res.description.slice(0, 210)}...` : 'There is no data about the character.',
            thumbnail: `${res.thumbnail.path}.${res.thumbnail.extension}`,
            homepage: res.urls[0].url,
            wiki: res.urls[1].url,
            comics: res.comics.items,
        }
    }
}