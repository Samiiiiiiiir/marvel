import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import PropTypes from 'prop-types';

import './charList.scss';

class CharList extends Component {
  state = {
    data: [],
    status: 'loading',
    newItemLoading: false,
    offset: 1500,
    charEnded: false,
    activeElementId: null,
  };

  marvelService = new MarvelService();

  componentDidMount = () => {
    this.onRequest();
  };

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharactersLoaded)
      .catch(this.onError);
  };

  onCharListLoading = () => {
    this.setState({ newItemLoading: true });
  };

  onCharactersLoaded = (newData) => {
    let isEnded = false;
    if (newData.length < 9) {
      isEnded = true;
    }

    this.setState(({ data, offset }) => {
      return {
        data: [...data, ...newData],
        status: 'loaded',
        newItemLoading: false,
        offset: offset + 9,
        charEnded: isEnded,
      };
    });
  };

  onError = () => {
    this.setState({ status: 'error' });
  };

  changeActiveElem = (id) => {
    this.setState({ activeElementId: id });
  };

  renderList = (arr) => {
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
            this.props.onCharSelected(id);
            this.changeActiveElem(id);
          }}
          className={`char__item ${
            this.state.activeElementId == id ? ' char__item_selected' : ''
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

  render() {
    const { data, status, newItemLoading, offset, charEnded } = this.state;

    let elem;

    switch (status) {
      case 'loading':
        elem = <Spinner />;
        break;
      case 'error':
        elem = <ErrorMessage />;
        break;
      case 'loaded':
        elem = this.renderList(data);
        break;
    }

    return (
      <div className="char__list">
        {elem}
        <button
          onClick={() => this.onRequest(offset)}
          className="button button__main button__long"
          disabled={newItemLoading}
          style={{ display: charEnded ? 'none' : 'block' }}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;

CharList.propTypes = {
  onCharSelected: PropTypes.func,
};
