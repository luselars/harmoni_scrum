# HARMONI - Scrum team 2

Harmoni er en nettbasert applikasjon for å samle informasjon om arrangementer, slik at arrangører, artister og publikum kan holde oversikt over tidspunkter, artister, personale, billetter og mer.


## Kjøre klienten:

Fra hovedmappen:

```sh
cd Client
npm install
npm start
```

## Kjøre serveren:

Serverkoden kreven en mysql-database for å kjøre.

Endre dataene i **Server/src/config/dbCredentials.js** til en mysql-database du har tilgang til.

Kjør så sql-koden i **Server/DataBase.sql** på databasen din for å oprette de nødvendige tabellene.

Fra hovedmappen:

```sh
cd Server
npm install
npm start
```

## Åpne applikasjon:

http://localhost:3000

Advarsel: Prosjektet er bare testet i nettleserene Firefox og Chrome. JavaScript må være slått på for at alle nettsidens funksjoner skal fungere.