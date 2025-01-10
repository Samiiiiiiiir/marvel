import { Component } from 'react';

import './charInfo.scss';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';

class CharInfo extends Component {
    state = {
        char: {},
        status: 'skeleton'
    }

    marvelService = new MarvelService();

    updateChar = (id) => {
        this.onCharLoading();
        const { charId } = this.props;
        if (!charId) return;
        this.marvelService.getOneCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    onCharLoading = () => {
        this.setState({ status: 'loading' });
    }

    onError = () => {
        this.setState({ status: 'error' });
    }

    onCharLoaded = (char) => {
        this.setState({ char, status: 'loaded' });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.charId != prevProps.charId) {
            this.updateChar(this.props.charId);
        }
    }

    render() { 
        const { char, status } = this.state;

        let elem = null;

        switch (status) {
            case 'skeleton':
                elem = <Skeleton />
                break;
            case 'loading':
                elem = <Spinner />
                break;
            case 'error':
                elem = <ErrorMessage />
                break;
            case 'loaded':
                elem = <View char={char} />
        }
        
        return (
            <div className="char__info">
                {elem}
            </div>
        )
    }    
}

export default CharInfo;

const View = ({ char }) => {
    const { description, homepage, name, thumbnail, wiki, comics } = char;

    let imageStyles = { objectFit: 'cover' };

    if (thumbnail == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imageStyles = { objectFit: 'contain' };
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" style={imageStyles}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main" target="_blank">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary" target="_blank">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {(comics.length > 0) ? null : <li>There is no comics with this character.</li>}
                {comics.map((item, i) => {
                    if (i >= 10) return;
                    return (
                        <li key={i} className="char__comics-item">
                            {item.name}
                        </li>
                    )
                })}
            </ul>
        </>
    )
}