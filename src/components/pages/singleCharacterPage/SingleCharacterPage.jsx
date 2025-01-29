import { useEffect, useState } from 'react';

import { useParams, Link } from 'react-router-dom';
import useMarvelService from '../../../services/MarvelService';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';

import './singleCharacterPage.scss';

const SingleCharacterPage = () => {
  const { characterId } = useParams();
  const { status, getOneCharacter } = useMarvelService();
  const [char, setChar] = useState();

  useEffect(() => {
    getOneCharacter(characterId).then(onLoaded);
  }, []);

  const onLoaded = (res) => {
    setChar(res);
  };

  return (
    <>
      {status == 'loading' ? <Spinner /> : null}
      {status == 'error' ? <ErrorMessage /> : null}
      {status == 'loaded' ? <View char={char} /> : null}
    </>
  );
};

const View = ({ char }) => {
  const { name, thumbnail, description } = char;
  return (
    <div className="single-char">
      <img
        src={thumbnail}
        alt=""
        className="single-char__img"
        width={293}
        height={293}
      />
      <div className="single-char__desc">
        <h2 className="single-char__name">{name}</h2>
        <div className="single-char__text">
          <p>{description}</p>
        </div>
        <Link to="/" className="single-char__back">
          Go back
        </Link>
      </div>
    </div>
  );
};

export default SingleCharacterPage;
