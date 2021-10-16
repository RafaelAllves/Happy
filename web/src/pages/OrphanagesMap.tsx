import React, { useEffect, useState } from 'react';
import { Map, TileLayer, Marker, Popup} from 'react-leaflet';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';

import '../styles/pages/orphanagesMap.scss';
import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';


interface Image {
  id: number;
  url: string;
}

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string,
  instructions: string,
  opening_hours: string,
  open_on_weekends: boolean,
  images: Image[]
}

function OrphanagesMap() {

  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  useEffect(() => {
    api.get('/orphanages').then(response => {
      setOrphanages(response.data as Orphanage[])
    })
  }, [])

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
        
        {
          orphanages.map(orphanage => {
            return (
              <Marker 
                position={[orphanage.latitude, orphanage.longitude]}
                icon={mapIcon}
                key={orphanage.id}
              >
                <Popup closeButton={false} minWidth={240} maxHeight={240} className="map-popup">
                  {orphanage.name}
                  <Link to={`/orphanages/${orphanage.id}`}>
                    <FiArrowRight size={28} color="#FFF"/>
                  </Link>
                </Popup>
              </Marker>
            )
          })
        }
      </Map>
      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#ffffff"/>
      </Link>
    </div>
  );
}

export default OrphanagesMap;
