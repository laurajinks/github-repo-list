import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import {AuthContext} from '../App'
import Button from './common/Button'

const Layout = ({children}) => {
  const {state, dispatch} = useContext(AuthContext)
  const {isAuth} = state
  return (
    <div className="w-full h-screen">
      <div className='flex items-center justify-between'>
        <strong className='m-3'>
          Github Repository List
          </strong>
        {isAuth && (
        <Button className='m-3' onClick={() => dispatch({type: 'logout'})}>Log Out</Button>
        )}
      </div>
      <div className='flex justify-center'>
        <div className='w-full md:w-2/3 lg:w-1/2 mt-8'>
          {children}
        </div>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node
}

export default Layout