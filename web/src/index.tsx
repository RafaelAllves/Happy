import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import './styles/global.scss';
import 'leaflet/dist/leaflet.css';


ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);
