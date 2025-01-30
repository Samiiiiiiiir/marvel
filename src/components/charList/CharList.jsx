import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import PropTypes from 'prop-types';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './charList.scss';

const CharList = ({ onCharSelected, selectedChar }) => {
  const [data, setData] = useState([]);
  const [firstLoading, setFirstLoading] = useState(true);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const { status, getAllCharacters } = useMarvelService();

  useEffect(() => {
    onRequest(offset);
  }, []);

  const onRequest = (offset) => {
    getAllCharacters(offset).then(onCharactersLoaded);
  };

  const onCharactersLoaded = (newData) => {
    let isEnded = newData.length < 9 ? true : false;
    if (firstLoading) {
      setFirstLoading(false);
    }
    setData((charList) => [...charList, ...newData]);
    setOffset((offset) => offset + 9);
    setCharEnded(isEnded);
  };

  const renderList = (arr) => {
    const elements = (
      <TransitionGroup component={'ul'} className="char__grid">
        {arr.map(({ thumbnail, name, id, nodeRef }) => {
          const styles =
            thumbnail ==
            'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
              ? { objectFit: 'contain' }
              : { objectFit: 'cover' };
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
      {status === 'error' ? <ErrorMessage /> : null}
      {renderList(data)}
      {status === 'loading' && firstLoading ? <Spinner /> : null}
      <button
        onClick={() => onRequest(offset)}
        className="button button__main button__long"
        disabled={status === 'loading' ? true : false}
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
