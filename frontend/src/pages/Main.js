import React from 'react';
import { Link } from 'react-router-dom';
import '../scss/Main.scss';
import coffeeImg from '../assets/img/cup-coffee.jpg';

function Main() {
  return (
    <>
      <section className='find-your-coffee'>
        <h1>Találd meg a számodra legmegfelelőbb kávét</h1>
        <button className='btn btn-primary mt-5'>
          <Link className='link' to='/coffees'>
            Megnézem az értékeléseket
          </Link>
        </button>
      </section>

      <section className='services'>
        <h2>Miket tudsz csinálni az oldalon?</h2>
        <div className='service-container'>
          <article>Kommentek írása és olvasása</article>
          <article>Kávék értékelése</article>
          <article>Új kávémárkák megjelenítse</article>
        </div>
        <button className='btn btn-primary mt-5'>
          <Link className='link' to='/'>
            Tudj meg többet
          </Link>
        </button>
      </section>

      <section className='register-container'>
        <div>
          <h2>Szívesen elmondanád a saját kávésztoridat?</h2>
          <p>Egy gyors regisztráció után, már véleményezhetsz is</p>
          <button className='btn btn-primary mt-5'>
            <Link className='link' to='/register'>
              Irány a regisztráció
            </Link>
          </button>
        </div>
        <img src={coffeeImg} alt='cup of coffee' className='cup-coffee' />
      </section>
    </>
  );
}

export default Main;
