# README.md

<h1 align="center"><img src="logo.png" alt="fastfeet-logo" width="250px"/></h1>

<h3 align="center">
  Express Application for FastFeet project
</h3>

<p align="center">
  A fast way to manage delivery companies!
</p>

<p id="insomniaButton" align="center">
  <a href="https://insomnia.rest/" target="_blank">
    <img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia">
  </a>
</p>

## **📚 About the project**

With this API is possible to manage users, recipients, delivery man and everything what is needed for the delivery flow.

To confirm the delivery was finished, the delivery man must send a recipient signature photo. This is one of the application business rules.

## **🚀 Technologies**

Technologies that I used to develop this application

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [Sequelize](https://sequelize.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/products/docker-desktop)
- [Multer](https://github.com/expressjs/multer)
- [Nodemailer](https://nodemailer.com/about/)
- [Handlebars](https://handlebarsjs.com/)
- [JWT-token](https://jwt.io/)
- [Bee-Queue](https://github.com/bee-queue/bee-queue)
- [Yup](https://github.com/jquense/yup)
- [Date-fns](https://date-fns.org/)
- [Nodemon](https://nodemon.io/)
- [Sucrase](https://github.com/alangpierce/sucrase)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)

## **💻 Getting started**

Import the `Insomnia.json` on Insomnia App

### **Requirements**

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/products/docker-desktop)

**Clone the project and access the folder**
```bash
$ git clone https://github.com/Beckhauser/fastfeet-api && cd fastfeet-api
```

**Follow the steps below**

```bash
# Install the dependencies
$ npm install
# Make a copy of '.env.example' to '.env'
# and set with YOUR environment variables.

# Start a postgres and redis instance

# Once the services are running, run the migrations
$ npx sequelize db:migrate

# Run the seed to create the 'admin-user'
$ npx sequelize db:seed --seed 20200521200848-admin-user.js

# Well done, project is started!
```

---

Made with 💛 by Lucas Beckhauser

PS: I didn't take the bootcamp, I just took the challenge on my own
