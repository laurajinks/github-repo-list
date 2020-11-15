const express = require('express')
const {json} = require('body-parser')
const axios = require('axios')
require('dotenv').config()
const cors = require('cors')
const { buildSchema } = require('graphql')

const app = express();

app.use(json())
app.use(cors())

const RepoQuery = `query viewer {
  viewer {
    login
    repositories(first: 100) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        nameWithOwner
        url
        id
        description
        owner {
          avatarUrl(size: 50)
          url
        }
      }
    }
  }
}
  `

app.post('/auth', (req, res) => {
  axios.post(`https://github.com/login/oauth/access_token`, req.body)
    .then(response => {
      let params = new URLSearchParams(response.data)
      return res.status(200).json(params.get('access_token'))
    })
    .catch(error => res.status(400).json(error))
})

app.post('/repos', (req, res) => {
  const {accessToken} = req.body
  axios.post('https://api.github.com/graphql', {
    query: RepoQuery
  }, 
  {headers: {Authorization: `Bearer ${accessToken}`}})
  .then(response => {
    return res.status(200)
    .json(response.data.data.viewer || {})
  })
  .catch(error => res.status(400).json(error))
})

app.post('/notes', (req, res) => {
  console.log('req', req.body)
  axios.post('https://jsonplaceholder.typicode.com/posts', req.body)
  .then(response => res.status(200).json(response.data))
  .catch(error => res.status(400).json(error))
})

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));