import React, {useState, useEffect, useContext} from 'react'
import {Redirect, useLocation} from 'react-router-dom'
import {AuthContext} from '../App'
import axios from 'axios'
import Button from './common/Button'


export default function Login() {
  const {state, dispatch} = useContext(AuthContext)
  const [data, setData] = useState({ error: false, loading: false })
  const {clientID, redirectURI} = state
  const location = useLocation()

  useEffect(() => {
    if (data.loading || data.error) return
    const {search = ''} = location
    const hasCode = search.includes('?code=')
    if (hasCode) {
      setData(d => ({ ...d, loading: true }))
      const newUrl = search.split('?code=')

      const requestData = {
        client_id: state.clientID,
        redirect_uri: state.redirectURI,
        client_secret: state.clientSecret,
        code: newUrl[1]
      }

      axios.post(state.proxyURL + '/auth', requestData)
        .then(res => {
          dispatch({
            type: 'login',
            payload: { accessToken: res.data}
          })
        })
        .catch(err => {
          setData({
            loading: false,
            error: true
          })
        })
    }
  }, [state, dispatch, location, data])

  if (state.isAuth) {
    return <Redirect to='/' />
  }

  return (
    <div className='bg-gray-100 p-3 py-56 w-auto m-3 rounded-lg'>
      {data.loading ? (
        <div className='flex justify-center'>
          <Button onClick={() => {}} disabled>Loading...</Button>
        </div>
      ) : (
        <>
          <div className='flex justify-center mb-10 font-bold text-4xl'>
            Welcome!
          </div>
          <div className='flex justify-center'>
            <a
              href={`https://github.com/login/oauth/authorize?scope=user%20repo%20public_repo&client_id=${clientID}&redirect_uri=${redirectURI}`}
            >
              <Button onClick={() => {}}>Login with GitHub</Button>
            </a>
          </div>
        </>
      )}
    </div>
  )
}