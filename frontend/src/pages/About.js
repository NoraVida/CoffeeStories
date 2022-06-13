import React from 'react';

function About() {
  return (
    <section className="form--background">
      <div className="card p-5 form--container">
        <h2 className="mb-4">Az oldal célja</h2>
        <div className="about-text-container">
          <div className="about-text">
            Napjainkban számos márkás kávék és az adott áruházak sajátmárkás kávéjai
            között válogathatunk, de olykor nehéz lehet eldönteni, hogy melyik
            kávénak a legfinomabb az illata vagy az íze vagy épp, hogyan érdemes
            fogyasztani.
          </div>
          <div className="about-text">
            Ez az oldal megoldást kínál arra, hogy bárki
            megtekintse a legismertebb vagy akár a ritkán hallott kávémárkák
            értékelését.

            Egy gyors regisztráció után, már Te is írhatsz értékelést, sőt
            új kávékat is feltehetsz a listára, ha nem találod azt amit keresel.
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
