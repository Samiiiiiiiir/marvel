import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import useMarvelService from '../../services/MarvelService';

import './singleComicPage.scss';

const SingleComicPage = () => {
  const { comicId } = useParams();
  const [comics, setComics] = useState(null);

  const { status, getOneComics } = useMarvelService();

  useEffect(() => {
    updateComics();
  }, [comicId]);

  const updateComics = () => {
    getOneComics(comicId).then(onComicsLoaded);
  };

  const onComicsLoaded = (comics) => {
    setComics(comics);
  };

  return (
    <>
      {status == 'loading' ? <Spinner /> : null}
      {status == 'error' ? <ErrorMessage /> : null}
      {status == 'loaded' ? <View comics={comics} /> : null}
    </>
  );
};

const View = ({ comics }) => {
  const { thumbnail, pageCount, price, title, description } = comics;
  return (
    <div className="single-comic">
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">
          {pageCount ? `${pageCount} pages` : 'No info about pages'}
        </p>
        <p className="single-comic__descr">Language: en-us</p>
        <div className="single-comic__price">{price}</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicPage;
