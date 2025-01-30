import { useState, useEffect } from 'react';

import useMarvelService from './../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {
  const [char, setChar] = useState({});
  const { status, getOneCharacter } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, []);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getOneCharacter(id).then(onCharLoaded);
  };

  return (
    <div className="randomchar">
      {status == 'loading' ? <Spinner /> : null}
      {status == 'error' ? <ErrorMessage /> : null}
      {status == 'loaded' ? <View char={char} /> : null}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button onClick={updateChar} className="button button__main">
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

export default RandomChar;

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;

  let imgClasses = 'randomchar__img';
  if (
    thumbnail ==
    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
  ) {
    imgClasses += ' randomchar__img--contain';
  }

  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className={imgClasses} />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main" target="_blank">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary" target="_blank">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};
