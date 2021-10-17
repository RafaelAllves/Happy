import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiPlus, FiX } from "react-icons/fi";

import '../styles/pages/create-orphanage.scss';
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import { LeafletMouseEvent } from "leaflet";


export default function CreateOrphanage() {

  const [position, setPosition] =  useState({ latitude: 0, longitude: 0})
  const [initialPosition, setInitialPosition] =  useState({ lat: 0, lng: 0})
  
  const [name, setName] =  useState('')
  const [about, setAbout] =  useState('')
  const [instructions, setInstructions] =  useState('')
  const [opening_hours, setOpeningHours] =  useState('')
  const [open_on_weekends, setOpenOnWeekends] =  useState(true)
  const [images, setImages] =  useState<File[]>([])
  const [previewimages, setPreviewImages] = useState<string[]>([])


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setInitialPosition({lat: latitude, lng: longitude});
    })
  }, []);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng} = event.latlng
    setPosition({ latitude: lat, longitude: lng})
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = {
      name,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      latitude,
      longitude
    } 

    console.log(data);
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {

    if (!event.target.files) return;

    const selectedImages = Array.from(event.target.files)
    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map( image => URL.createObjectURL(image))
    setPreviewImages(selectedImagesPreview)

  }

  function handleDeselectImage(index: number) {

    const selectedImages = images
    selectedImages.splice(index, 1)
    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map( image => URL.createObjectURL(image))
    setPreviewImages(selectedImagesPreview)
  }

  return (
    <div id="page-create-orphanage">

      <Sidebar/>

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={initialPosition} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              {
                position.latitude !== 0
                &&
                <Marker interactive={false} icon={mapIcon} position={[position.latitude, position.longitude]} />
              }
              
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={ event => setName(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} value={about} onChange={ event => setAbout(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {
                  previewimages.map((image, index) => {
                    return (
                      <div key={index} className="image-block">
                        <div className="remove-image" onClick={() => handleDeselectImage(index)}>
                          <FiX size={20} color="#FF669D" />
                        </div>
                        <img src={image} alt={name} />
                      </div>
                    )
                  })
                }
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input type="file" multiple onChange={handleSelectImages} id="image[]" />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={ event => setInstructions(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horario de Funcionamento</label>
              <input id="opening_hours" value={opening_hours} onChange={ event => setOpeningHours(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={open_on_weekends? "active" : ""}
                  onClick={()=> setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button 
                  type="button" 
                  className={open_on_weekends? "" : "active"}
                  onClick={()=> setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
