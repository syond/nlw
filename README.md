<div align="center">
  <img src="./.github/assets/logo.svg" alt="Ecoleta" />
</div>

<h4 align="center">
    A FullStack application developed with awesome technologies :)
</h4>

<p align="center">
  <img src="https://media.giphy.com/media/SXZCtunyeqIHC7W64Q/giphy.gif" width="auto" height="400" alt="demo-ecoleta-web.md.gif" border="0"></a>
  <img src="https://media.giphy.com/media/STlWQfKjLDRjuMbAZr/giphy.gif" width="auto" height="400" alt="demo-ecoleta-mobile.md.gif" border="0"></a>
</p>

---

## :coffee: About
With this web and mobile application you can register or just search points on the world map to collect some recyclable items.

## :runner: Goals
Apply all the important concepts of Rest API, NodeJS, React, React Native, using: Typescript; Express; Celebrate; Knex; SQLite; Axios; and other technologies...

## :floppy_disk: Installation

Before you start, you need to clone the repository using `git clone`.

1. Now we need to install the dependecies of the server, web, and mobile. Inside each one folder you'll run: `npm install` or `yarn install`.

2. Now we need to configure the enviroments variable. Inside each project folder you'll see a `.env.example` file, rename it to just `.env`, open each one and configure with your informations.

3. Ok! Now server project has a specific configuration, just run the following commands inside the server folder to prepare all the database:

    - `npx knex migrate:latest`
    - `npx knex seed:run`

4. Just run `npm run dev` for Server, and `npm start` for Web and Mobile. 

Ps: During the `npm start` execution in Mobile, remember to accept expo-cli installation when appears.

Now you are ready to go! :)


## :email: Contact
syond94@gmail.com | 
[Linkedin](https://linkedin.com/in/syond)
