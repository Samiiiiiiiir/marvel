import { useState, useEffect } from 'react';
import useMarvelService from './../../services/MarvelService';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './comicsList.scss';

const ComicsList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);

  const { status, getAllComics } = useMarvelService();

  useEffect(() => {
    onRequest();
    setFirstLoading(false);
  }, []);

  const onRequest = () => {
    getAllComics().then(onCharactersLoaded);
    setLoading(true);
  };

  const onCharactersLoaded = (res) => {
    setData((state) => [...state, ...res]);
    setLoading(false);
  };

  const renderList = () => {
    const list = data.map(({ id, thumbnail, title, price }) => {
      return (
        <li className="comics__item" key={id}>
          <a href="#">
            <img
              src={thumbnail}
              alt="ultimate war"
              className="comics__item-img"
            />
            <div className="comics__item-name">{title}</div>
            <div className="comics__item-price">{price}</div>
          </a>
        </li>
      );
    });
    return <ul className="comics__grid">{list}</ul>;
  };

  let elem;

  switch (status) {
    case 'loading':
      if (firstLoading) {
        elem = <Spinner />;
      }
      break;
    case 'error':
      elem = <ErrorMessage />;
      break;
    default:
      elem = renderList();
      break;
  }

  return (
    <div className="comics__list">
      {elem}
      <button
        onClick={onRequest}
        className="button button__main button__long"
        disabled={loading}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
