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
      }
    }
  }
}
  `

app.post('/auth', (req, res) => {
  axios.post(`https://github.com/login/oauth/access_token`, req.body)
    .then(response => {
      let params = new URLSearchParams(response.data)
      console.log('access', params.get('access_token'))
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
    console.log('response', response)
    return res.status(200)
    .json(response.data.data.viewer.repositories || [])
  })
  .catch(error => {
    console.log('error', error)
    res.status(400).json(error)
  })
})

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));