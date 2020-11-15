import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import {AuthContext} from '../App'

const Layout = ({children}) => {
  const {state, dispatch} = useContext(AuthContext)
  const {isAuth} = state
  return (
    <div className="w-full">
      <div className='flex items-center justify-between'>
        <strong className='m-3'>
          Github Repository List
          </strong>
        {isAuth && (
        <button className='m-3' onClick={() => dispatch({type: 'logout'})}>Log Out</button>
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