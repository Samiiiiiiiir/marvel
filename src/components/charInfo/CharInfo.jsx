import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import useMarvelService from '../../services/MarvelService';

import PropTypes from 'prop-types';

import './charInfo.scss';

const CharInfo = ({ charId }) => {
  const [char, setChar] = useState({});

  const { status, getOneCharacter } = useMarvelService('skeleton');

  useEffect(() => {
    updateChar();
  }, [charId]);

  const updateChar = () => {
    if (!charId) return;
    getOneCharacter(charId).then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  return (
    <div className="char__info">
      {status == 'skeleton' ? <Skeleton /> : null}
      {status == 'loading' ? <Spinner /> : null}
      {status == 'error' ? <ErrorMessage /> : null}
      {status == 'loaded' ? <View char={char} /> : null}
    </div>
  );
};

const View = ({ char }) => {
  const { description, homepage, name, thumbnail, wiki, comics } = char;

  let imageStyles =
    thumbnail ==
    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
      ? { objectFit: 'contain' }
      : { objectFit: 'cover' };

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
        {comics.length ? null : (
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

CharInfo.propTypes = {
  charId: PropTypes.number,
};

export default CharInfo;
