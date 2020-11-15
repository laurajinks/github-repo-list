import Axios from 'axios'
import React, {useState, useEffect, useContext, useMemo} from 'react'
import {AuthContext} from '../App'
import axios from 'axios'

const Home = () => {
  const {state, dispatch} = useContext(AuthContext)
  const [data, setData] = useState({})

  useEffect(() => {
    if (state.accessToken) {
      axios.post('/repos', {accessToken: state.accessToken})
      .then(res => setData(res.data))
      .catch(err => console.log(err))
    }
  }, [])

  const repos = useMemo(() => data.nodes || [], [data])

  return (
    <>
    {repos.map(repo => (
      <div key={repo.id}>{repo.nameWithOwner}</div>
    ))}
    </>
  )
}

export default Home