import React from 'react'
import PropTypes from 'prop-types'

const Button = ({onClick, children, disabled = false, className = ''}) => {
  return (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`bg-gray-500 hover:text-white font-semibold focus:text-white focus:outline-none p-1 pl-3 pr-3 rounded-md ${className}`}
    >
      {children}
      </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool
}

export default Button