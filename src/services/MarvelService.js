
export default class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=cbbe4d50226d238752d040de30906ebd';

    getResource = async (url) => {
        const req = await fetch(url);
        if (!req.ok) {
            throw new Error(`Could not fetch ${url}, status: ${req.status}`)
        }
        return await req.json();
    }

    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
    }

    getOneCharacter = (id) => {
        return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    }
}