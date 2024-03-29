import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import '../styles/pages/landing.scss';
import logoImg from '../images/logo.svg';

const Landing = () => {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logoImg} alt="Happy"/>
        <main>
          <h1>Leve felicidade para o mudo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>
        <div className="location">
          <strong>Belém</strong>
          <span>Pará</span>
        </div>
        <Link to="/orphanages/create" className="enter-app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)"/>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
