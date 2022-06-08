import React from 'react';
import { Link } from 'react-router-dom';
import '../scss/Main.scss';
import coffeeImg from '../assets/img/cup-coffee.jpg';
import coffeeCupIcon from '../assets/icons/coffeecup.png';

function Main() {
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
            Kommentek írása és olvasása
            <img src={coffeeCupIcon} alt="coffee cup icon" className="acticle--icon" />
          </article>
          <article className="article--card">Kávék értékelése</article>
          <article className="article--card">Új kávémárkák megjelenítse</article>
        </div>
        <button className="btn btn-primary mt-5" type="button">
          <Link className="link" to="/">
            Tudj meg rólunk többet
          </Link>
        </button>
      </section>

      <section className="register-container">
        <div>
          <h2>Szívesen elmondanád a saját kávésztoridat?</h2>
          <p>Egy gyors regisztráció után, már véleményezhetsz is</p>
          <button className="btn btn-primary mt-5" type="button">
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

export default Main;
