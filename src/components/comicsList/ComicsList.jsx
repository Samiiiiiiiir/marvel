import { useState, useEffect, useCallback, createRef } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from './../../services/MarvelService';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './comicsList.scss';

const ComicsList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  const { status, getAllComics } = useMarvelService();

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = async () => {
    try {
      setLoading(true);
      const res = await getAllComics(offset);
      onComicsLoaded(res);
    } catch (e) {}
  };

  const onComicsLoaded = (res) => {
    setData((state) => [...state, ...res]);
    setLoading(false);
    setFirstLoading(false);
    setOffset((state) => state + 8);
  };

  const renderList = useCallback(
    (arr) => {
      const list = (
        <TransitionGroup component={'ul'} className="comics__grid">
          {arr.map(({ id, thumbnail, title, price }, i) => {
            // const nodeRef = createRef(null);
            return (
              <CSSTransition
                timeout={500}
                classNames="comics-item"
                key={i}
                // nodeRef={nodeRef}
              >
                <li className="comics__item">
                  <Link to={`/comics/${id}`}>
                    <img
                      src={thumbnail}
                      alt="ultimate war"
                      className="comics__item-img"
                    />
                    <div className="comics__item-name">{title}</div>
                    <div className="comics__item-price">{price}</div>
                  </Link>
                </li>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      );
      return list;
    },
    [data]
  );

  return (
    <div className="comics__list">
      {status == 'loading' && firstLoading ? <Spinner /> : null}
      {status == 'error' ? <ErrorMessage /> : null}
      {renderList(data)}
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
