import React from 'react';
import { Map, TileLayer, Marker, Popup} from 'react-leaflet';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';

import '../styles/pages/orphanagesMap.scss';
import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from '../utils/mapIcon';

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
        center={[-1.361876, -48.4042172]}
        className="map"
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
        <Marker 
          position={[-1.361876, -48.4042172]}
          icon={mapIcon}
        >
          <Popup closeButton={false} minWidth={240} maxHeight={240} className="map-popup">
            Nome do Orfanato
            <Link to="/orphanages/0">
              <FiArrowRight size={28} color="#FFF"/>
            </Link>
          </Popup>
        </Marker>
      </Map>
      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#ffffff"/>
      </Link>
    </div>
  );
}

export default OrphanagesMap;
