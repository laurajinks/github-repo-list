import Axios from 'axios'
import React, {useState, useEffect, useContext, useMemo} from 'react'
import {Redirect} from 'react-router-dom'
import {AuthContext} from '../App'
import axios from 'axios'
import Repo from './Repo'

const Home = () => {
  const {state} = useContext(AuthContext)
  const [data, setData] = useState({})

  useEffect(() => {
    if (state.accessToken) {
      axios.post('/repos', {accessToken: state.accessToken})
      .then(res => setData(res.data))
      .catch(err => console.log(err))
    }
  }, [])

  const repos = useMemo(() => data.nodes || [], [data])

  if (!state.isAuth) {
    return <Redirect to='/login' />
  }

  return (
    <>
    {repos.map(repo => (
      <Repo key={repo.id} data={repo} />
    ))}
    </>
  )
}

export default Home