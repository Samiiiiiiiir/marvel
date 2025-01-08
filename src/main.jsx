import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app/App';
import './style/style.scss';

import MarvelService from './services/MarvelService';

const root = createRoot(document.getElementById('root'));

root.render(
    <StrictMode>
        <App />
    </StrictMode>
);

const marvelService = new MarvelService;

marvelService.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name)));