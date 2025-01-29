import { useState } from 'react';

import useMarvelService from '../../services/MarvelService';

import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import './charSearchForm.scss';

const CharSearchForm = () => {
  const [char, setChar] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { status, getCharacterByName } = useMarvelService();

  const onSubmit = (data) => {
    getCharacterByName(data.charName).then(onLoaded);
  };

  const onLoaded = (char) => {
    setChar(char);
  };

  return (
    <form className="char-search" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="char-search__title">Or find a character by name:</h2>
      <div className="char-search__inner">
        <input
          {...register('charName', {
            required: 'This field is required',
          })}
          className="char-search__input"
          type="text"
          placeholder="Enter name"
        />
        <button
          className="char-search__button button button__main"
          type="submit"
        >
          <div className="inner">find</div>
        </button>
      </div>
      {errors.charName ? (
        <div className="char-search__error">{errors.charName.message}</div>
      ) : null}
      {status === 'loading' ? <div>Loading...</div> : null}
      {(char && char.length == 0) || status === 'error' ? (
        <div className="char-search__error">
          The character was not found. Check the name and try again
        </div>
      ) : null}
      {char && char.length > 0 && status === 'loaded' ? (
        <View char={char} />
      ) : null}
    </form>
  );
};

const View = ({ char }) => {
  const { name, id } = char[0];
  return (
    <div className="char-search__info">
      <h2 className="char-search__info-text">There is! Visit {name} page?</h2>
      <Link
        to={`/characters/${id}`}
        className="char-search__info-button button button__secondary"
      >
        <div className="inner">TO PAGE</div>
      </Link>
    </div>
  );
};

export default CharSearchForm;
