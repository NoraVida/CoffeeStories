import React from 'react';
import { Link } from 'react-router-dom';

import coffeeImg from '../assets/img/cup-coffee.jpg';
// import coffeeCupIcon from '../assets/icons/coffeecup.png';

import '../scss/Main.scss';

export default function Main() {
  return (
    <>
      <section className="find-your-coffee">
        <div className="bg-image" />
        <h1>Találd meg a számodra legmegfelelőbb kávét</h1>
        <button className="btn btn-primary mt-5" type="button">
          <Link className="link" to="/coffees">
            Megnézem az értékeléseket
          </Link>
        </button>
      </section>

      <section className="services">
        <h2>Miket tudsz csinálni az oldalon?</h2>
        <div className="service-container">
          <article className="article--card">
            Böngészhetsz az egyes kávémárkák értékelési között
            {' '}
            és összehasonlíthatod azokat mások értékelései alapján
            {/* Kommentek írása és olvasása
            <img src={coffeeCupIcon} alt="coffee cup icon" className="acticle--icon" /> */}
          </article>
          <article className="article--card">
            Írhatsz saját értékeléseket az általad kiválasztott kávémárkákról
          </article>
          <article className="article--card">
            Vagy ha nem találod az értékelni kívánt kávémárkát, akkor Te is bővítheted a listát
          </article>
        </div>
        <div className="services-button-container">
          <button className="btn btn-primary mt-5 ps-5 pe-5" type="button">
            <Link className="link" to="/about">
              Tudj meg többet az oldaról
            </Link>
          </button>
        </div>
      </section>

      <section className="register-container">
        <div>
          <h2>Szívesen elmondanád a saját kávésztoridat?</h2>
          <p>Egy gyors regisztráció után, már véleményezhetsz is</p>
          <button className="btn btn-primary mt-5 ps-4 pe-4" type="button">
            <Link className="link" to="/register">
              Irány a regisztráció
            </Link>
          </button>
        </div>
        <img src={coffeeImg} alt="cup of coffee" className="cup-coffee" />
      </section>
    </>
  );
}
