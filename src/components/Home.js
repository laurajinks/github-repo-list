import Axios from 'axios'
import React, {useState, useEffect, useContext, useMemo} from 'react'
import {Redirect} from 'react-router-dom'
import {AuthContext} from '../App'
import axios from 'axios'
import Repo from './Repo'

const Home = () => {
  const {state} = useContext(AuthContext)
  const [data, setData] = useState({})
  const {repositories = {}, login} = data

  useEffect(() => {
    if (state.accessToken) {
      axios.post('/repos', {accessToken: state.accessToken})
      .then(res => setData(res.data))
      .catch(err => console.log(err))
    }
  }, [state])

  const repos = useMemo(() => repositories.nodes || [], [data])

  if (!state.isAuth) {
    return <Redirect to='/login' />
  }

  return (
    <>
      <div className='flex justify-center mb-2 font-bold'>
        Welcome, {login}!
      </div>
      <div className='flex justify-center mb-2 font-semibold'>
        Total Repositories: {repositories.totalCount}
      </div>
      {repos.map(repo => (
        <Repo key={repo.id} data={repo} />
      ))}
    </>
  )
}

export default Home