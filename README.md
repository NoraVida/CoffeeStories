# Vida Nóra vizsgaremekje
## KávéSztorik – Kávé értékelő webalkalmazás

## Az alkalmazás célja
Napjainkban számos márkás kávék és az adott áruházak sajátmárkás kávéjai között válogathatunk, de olykor nehéz lehet eldönteni, hogy melyik kávénak a legfinomabb az illata vagy az íze vagy épp, hogyan érdemes fogyasztani.

Ez a platform megoldást kínál arra, hogy bárki megtekintheti a legismertebb vagy akár a ritkán hallott kávémárkák értékelését, a regisztrált felhasználók elmondhatják a véleményüket és pontozhatják az adott terméket, illetve akár kiegészíthetik az adott terméklistát, mindezt úgy, hogy bármilyen digitális eszközön optimális megjelenést biztosít.

## Főbb funkciók
- Regisztráció: felhasználónévvel, e-mail címmel és jelszóval
- Bejelentkezés: e-mail címmel és jelszóval
- Profil módosítása: másik felhasználónév, email-cím, és jelszó megadása - jelszavas megerősítéssel
- Profil törlése: jelszavas megerősítéssel
- Kávéklistájának megtekintése
- A lista új kávékkal való kiegészítése
- Egyéb jellemzők megtekintése az adott kávéról
- Értékelések és vélemények megtekintése az adott kávéról
- Új értékelés és vélemény írása az adott kávéról
- Értékelés és vélemény törlése 
- Leírás az oldalról
- Különféle cikkek olvasásának lehetősége a kávéról

## Jogosultságok
### Látogató
- Kávék megtekintése: láthatja a kávék listáját, és a hozzájuk tartozó értékeléseket, véleményeket
- Megtekintheti az oldal leírását
- Megtekintheti a kávékkal kapcsolatos cikkeket

### Regisztrált felhasználó
- Minden vonatkozik rá, ami a látogatóra is
- Módosíthatja a profilja adatait: felhasználónév, email-cím, jelszó
- Törölheti profilját
- Új kávékkal bővítheti a listát
- Új értékelést hozhat létre
- Saját értékelését visszavonhatja (törölheti)

## Oldalak

| Oldalak                  | Szerepük                                                                       |
| ------------------------ | ------------------------------------------------------------------------------ |
| /                        | Főoldal                                                                        |
| /user                    | Regisztráció (bejelentkezett felhasználónál: profil módosítása vagy törlése)   |
| /login                   | Felhasználó bejelentkezése                                                     |
| /coffees                 | Összes kávé kilistázása                                                        |
| /createnewproduct        | Lista kiegészítése új kávé hozzáadásával                                       |
| /coffees/id              | Adott kávé adatainak és értékeléseinek megjelenítése, új értékelés létrehozása |
| /about                   | Leírás az oldalról                                                             |
| /articles                | Cikkek megjelenítése a kávékról                                                |

## Adatbázis gyűjtemények
- _users_: regisztrált felhasználók
- _coffees_: értékelendő kávék
- _scoring_: adott kávéhoz tartozó értékelések mennyisége, átlaga, pontjai
- _rating_: adott felhasználó által írt értékelés és vélemény adott termékről
- _articles_: megjeleníteni kívánt cikkekek

## Technikai követelmények
**Backend**

- Node.js
- Express.js
- MongoDB
- JSON Web Token
- Docker

**Frontend**

- React
- Bootstrap
- Sass

## Könyvtárak
- `wireframes`: Az applikáció wireframe-jei
- `backend`: Az applikáció backend kódja - Express.js
- `frontend`: Az applikáció frontend kódja - React

## Az alkalmazás elindításának útmutatója
- A `.env.example` fájlok alapján `.env` fájlok létrehozása `backend` és `frontend` mappákban
- `docker-compose build` - az applikáció gyökérkönyvtárában futtatandó
- `docker-compose --env-file ./.env up` - parancs után az applikáció elindul az következő címeken: 
  - KávéSztorik frontend: http://localhost:3000/
  - KávéSztorik backend: http://localhost:8080/
