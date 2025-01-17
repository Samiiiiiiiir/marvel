import { useHttp } from '../hooks/http.hook';

const useMarvelService = (initial) => {
  const { status, request } = useHttp(initial);

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=cbbe4d50226d238752d040de30906ebd';
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map((item) => _transformCharacter(item));
  };

  const getOneCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getAllComics = async (offset = 0) => {
    const res = await request(
      `${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map((item) => _transfromComics(item));
  };

  const _transformCharacter = (res) => {
    return {
      id: res.id,
      name: res.name,
      description: res.description
        ? `${res.description.slice(0, 210)}...`
        : 'There is no data about the character.',
      thumbnail: `${res.thumbnail.path}.${res.thumbnail.extension}`,
      homepage: res.urls[0].url,
      wiki: res.urls[1].url,
      comics: res.comics.items,
    };
  };

  const _transfromComics = (res) => {
    return {
      id: res.id,
      thumbnail: `${res.thumbnail.path}.${res.thumbnail.extension}`,
      title: res.title,
      price: res.prices[0].price ? `${res.prices[0].price} $` : 'Not available',
    };
  };
  return { status, getAllCharacters, getOneCharacter, getAllComics };
};

export default useMarvelService;
