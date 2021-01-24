import React from 'react';
import '../styles/pages/orphanagesMap.scss';
import mapMarkerImg from '../images/map-marker.svg';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import 'leaflet/dist/leaflet.css';

import { Map, TileLayer} from 'react-leaflet';

function OrphanagesMap() {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy"/>
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>
        <footer>
          <strong>Belém</strong>
          <span>Pará</span>
        </footer>
      </aside>
      <Map 
        zoom={15}
        center={[-1.4365936, -48.4670979]}
        className="map"
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
      </Map>
      <Link to="" className="create-orphanage">
        <FiPlus size={32} color="#ffffff"/>
      </Link>
    </div>
  );
}

export default OrphanagesMap;
