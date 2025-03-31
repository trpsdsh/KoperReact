/// <reference types="vite/client" /> 
//    https://vite.dev/guide/features.html#client-types <- тут написано что это такое
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './redux/store';

const rootElement = document.getElementById('root')!; // ! Говорит что null точно не будет https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html
const root = ReactDOM.createRoot(rootElement);
root.render(
  <Provider store={store}>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </Provider>,
);