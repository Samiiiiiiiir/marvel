import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import PropTypes from 'prop-types';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './charList.scss';

const CharList = ({ onCharSelected, selectedChar }) => {
  const [data, setData] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const { status, getAllCharacters } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(true) : setNewItemLoading(false);

    getAllCharacters(offset).then(onCharactersLoaded);
  };

  const onCharactersLoaded = (newData) => {
    let isEnded = false;
    if (newData.length < 9) {
      isEnded = true;
    }

    setData((charList) => [...charList, ...newData]);
    setNewItemLoading(false);
    setOffset((offset) => offset + 9);
    setCharEnded(isEnded);
  };

  const renderList = (arr) => {
    const elements = (
      <TransitionGroup component={'ul'} className="char__grid">
        {arr.map(({ thumbnail, name, id, nodeRef }) => {
          let styles = { objectFit: 'cover' };
          if (
            thumbnail ==
            'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
          ) {
            styles = { objectFit: 'contain' };
          }
          return (
            <CSSTransition
              key={id}
              nodeRef={nodeRef}
              timeout={500}
              classNames="character-item"
            >
              <li
                tabIndex={0}
                onClick={() => {
                  onCharSelected(id);
                }}
                className={`char__item ${
                  selectedChar == id ? ' char__item_selected' : ''
                }`}
                ref={nodeRef}
              >
                <img src={thumbnail} alt="abyss" style={styles} />
                <div className="char__name">{name}</div>
              </li>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    );
    return elements;
  };

  return (
    <div className="char__list">
      {status === 'loading' ? <Spinner /> : null}
      {status === 'error' ? <ErrorMessage /> : null}
      {renderList(data)}
      <button
        onClick={() => onRequest(offset, true)}
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
