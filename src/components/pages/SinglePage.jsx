import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';

const SinglePage = ({ Component, dataType }) => {
  const [data, setData] = useState();

  const { id } = useParams();
  const { status, getOneComics, getOneCharacter } = useMarvelService();

  useEffect(() => {
    getData();
  }, [id]);

  const getData = () => {
    switch (dataType) {
      case 'comics':
        getOneComics(id).then(onLoaded);
        break;
      case 'character':
        getOneCharacter(id).then(onLoaded);
        break;
    }
  };

  const onLoaded = (elem) => {
    setData(elem);
  };

  return (
    <>
      <AppBanner />
      {status == 'loading' ? <Spinner /> : null}
      {status == 'error' ? <ErrorMessage /> : null}
      {status == 'loaded' ? <Component data={data} /> : null}
    </>
  );
};

export default SinglePage;
