import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {
    state = {
        data: [],
        status: 'loading',
    }

    marvelService = new MarvelService();

    componentDidMount = () => {
        this.marvelService.getAllCharacters()
            .then(this.onCharactersLoaded)
            .catch(this.onError)
    }

    onCharactersLoaded = (arr) => {
        this.setState({data: arr, status: 'loaded'})
    }

    onError = () => {
        this.setState({status: 'error'})
    }

    renderList = (arr) => {
        const elements = arr.map(({thumbnail, name, id}) => {
            let styles = { objectFit: 'cover' };
            if (thumbnail == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                styles = { objectFit: 'contain' };
            }
            return (
                <li onClick={() => this.props.onCharSelected(id)} className="char__item" key={id}>
                    <img src={thumbnail} alt="abyss" style={styles} />
                    <div className="char__name">{name}</div>
                </li>
            )
        })
        return (
            <ul className="char__grid">
                {elements}
            </ul>
        )
    }

    render() {
        const { data, status } = this.state;

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
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
            )
        }
}

export default CharList;