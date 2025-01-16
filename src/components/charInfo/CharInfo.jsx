import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import useMarvelService from '../../services/MarvelService';

import PropTypes from 'prop-types';

import './charInfo.scss';

const CharInfo = ({ charId }) => {
  const [char, setChar] = useState({});
  const [status, setStatus] = useState('skeleton');

  const marvelService = new MarvelService();

  useEffect(() => {
    updateChar(charId);
  }, [charId]);

  const updateChar = (id) => {
    if (!id) return;
    onCharLoading();
    marvelService.getOneCharacter(id).then(onCharLoaded).catch(onError);
  };

  const onCharLoading = () => {
    setStatus('loading');
  };

  const onError = () => {
    setStatus('error');
  };

  const onCharLoaded = (char) => {
    setChar(char);
    setStatus('loaded');
  };

  let elem = null;

  switch (status) {
    case 'skeleton':
      elem = <Skeleton />;
      break;
    case 'loading':
      elem = <Spinner />;
      break;
    case 'error':
      elem = <ErrorMessage />;
      break;
    case 'loaded':
      elem = <View char={char} />;
      break;
  }

  return <div className="char__info">{elem}</div>;
};

export default CharInfo;

CharInfo.propTypes = {
  charId: PropTypes.number,
};

const View = ({ char }) => {
  const { description, homepage, name, thumbnail, wiki, comics } = char;

  let imageStyles = { objectFit: 'cover' };

  if (
    thumbnail ==
    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
  ) {
    imageStyles = { objectFit: 'contain' };
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt="abyss" style={imageStyles} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main" target="_blank">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary" target="_blank">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : (
          <li>There is no comics with this character.</li>
        )}
        {comics.map((item, i) => {
          if (i >= 10) return;
          return (
            <li key={i} className="char__comics-item">
              {item.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};
