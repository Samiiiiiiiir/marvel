import { useState, useEffect } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import PropTypes from 'prop-types';

import './charList.scss';

const CharList = ({ onCharSelected }) => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('loading');
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);
  const [activeElementId, setActiveElementId] = useState(null);

  const marvelService = new MarvelService();

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = (offset) => {
    setNewItemLoading(true);
    marvelService
      .getAllCharacters(offset)
      .then(onCharactersLoaded)
      .catch(onError);
  };

  const onCharactersLoaded = (newData) => {
    let isEnded = false;
    if (newData.length < 9) {
      isEnded = true;
    }

    setData((charList) => [...charList, ...newData]);
    setStatus('loaded');
    setNewItemLoading(false);
    setOffset((offset) => offset + 9);
    setCharEnded(isEnded);
  };

  const onError = () => {
    setStatus('error');
  };

  const changeActiveElem = (id) => {
    setActiveElementId(id);
  };

  const renderList = (arr) => {
    const elements = arr.map(({ thumbnail, name, id }) => {
      let styles = { objectFit: 'cover' };
      if (
        thumbnail ==
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
      ) {
        styles = { objectFit: 'contain' };
      }
      return (
        <li
          tabIndex={0}
          onClick={() => {
            onCharSelected(id);
            changeActiveElem(id);
          }}
          className={`char__item ${
            activeElementId == id ? ' char__item_selected' : ''
          }`}
          key={id}
        >
          <img src={thumbnail} alt="abyss" style={styles} />
          <div className="char__name">{name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{elements}</ul>;
  };

  let elem;

  switch (status) {
    case 'loading':
      elem = <Spinner />;
      break;
    case 'error':
      elem = <ErrorMessage />;
      break;
    case 'loaded':
      elem = renderList(data);
      break;
  }

  return (
    <div className="char__list">
      {elem}
      <button
        onClick={() => onRequest(offset)}
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{ display: charEnded ? 'none' : 'block' }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;

CharList.propTypes = {
  onCharSelected: PropTypes.func,
};
