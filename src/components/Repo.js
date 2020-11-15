import React from 'react'
import PropTypes from 'prop-types'

const Repo = ({data}) => {
  return (
<div>{data.nameWithOwner}</div>
  )
}

Repo.propTypes = {
  data: PropTypes.object.isRequired
}

export default Repo