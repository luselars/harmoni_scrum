# HARMONI - Scrum team 2

Harmoni er en nettbasert applikasjon for å samle informasjon om arrangementer, slik at arrangører, artister og publikum kan holde oversikt over tidspunkter, artister, personale, billetter og mer.

## Oppsett:

Når man første gang skal kjøre applikasjonen, kjør:
npm install
i client mappen og i server mappen.

Så kjør Server/DataBase.sql på databasen du vil bruke.

## Kjøre klienten:
Fra hovedmappen:

```sh
cd Client
npm install
npm start 
```

## Kjøre serveren: 
Serverkoden kreven en mysql-database for å kjøre.
Endre dataene i Server/src/config/dbCredentials.js til en mysql-database du har tilgang til.

 Fra hovedmappen:

  ```sh
  cd Server
  npm install
  npm start 
  ```

## Åpne applikasjon:
http://localhost:3000

Advarsel: Prosjektet er bare testet i nettleserene Chrome og Firefox.