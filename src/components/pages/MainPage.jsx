import { useState } from 'react';

import ErrorBoundary from './../errorBoundary/ErrorBoundary';
import RandomChar from './../randomChar/RandomChar';
import CharList from './../charList/CharList';
import CharInfo from './../charInfo/CharInfo';
import CharSearchForm from '../charSearchForm/CharSearchForm';

import { Helmet } from 'react-helmet';

const MainPage = () => {
  const [selectedChar, setSelectedChar] = useState(null);

  const onCharSelected = (id) => {
    setSelectedChar(id);
  };

  return (
    <>
      <Helmet>
        <meta name="description" content="Marvel information portal" />
        <title>Marvel information portal</title>
      </Helmet>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList
            onCharSelected={onCharSelected}
            selectedChar={selectedChar}
          />
        </ErrorBoundary>
        <div style={{ display: 'grid', gap: '30px' }}>
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
            <CharSearchForm />
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};

export default MainPage;
