# Github Repo List

## Tools required

- Node
- NPM
- Git

## Getting Started

- Clone the repo
- `cd` into the clone repo directory
- install 3rd party dependencies, `npm i`
- add .env file at root of directory
- include the following keys in your .env:
  REACT_APP_CLIENT_ID: From Github
  REACT_APP_CLIENT_SECRET: From Github
  REACT_APP_REDIRECT_URI: `http://localhost:3000/login`
  REACT_APP_PROXY_URL: `http://localhost:5000`
  SERVER_PORT: 5000

### Running the application

`npm start`
`nodemon server/index.js`
