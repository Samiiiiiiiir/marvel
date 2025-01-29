import { Link } from 'react-router-dom';

import './singleCharacterPage.scss';

const SingleCharacterPage = ({ data }) => {
  const { name, thumbnail, description } = data;
  return (
    <div className="single-char">
      <img
        src={thumbnail}
        alt=""
        className="single-char__img"
        width={293}
        height={293}
      />
      <div className="single-char__desc">
        <h2 className="single-char__name">{name}</h2>
        <div className="single-char__text">
          <p>{description}</p>
        </div>
        <Link to="/" className="single-char__back">
          Go back
        </Link>
      </div>
    </div>
  );
};

export default SingleCharacterPage;
