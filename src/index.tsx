import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store/store';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
