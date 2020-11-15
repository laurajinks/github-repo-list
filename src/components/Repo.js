import React, {useState, useRef, useEffect, useContext} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {AuthContext} from '../App'
import {toast} from 'react-toastify'
import Button from './common/Button'

const Repo = ({data}) => {
  const {state} = useContext(AuthContext)
  const [showEdit, setShowEdit] = useState(false)
  const [notes, setNotes] = useState('')
  const [input, setInput] = useState('')
  const {nameWithOwner, id, url, description, owner} = data
  const inputRef = useRef(null)

useEffect(() => {
  if (showEdit && inputRef) inputRef.current.focus()
}, [showEdit, inputRef])

const handleEdit = () => {
  setShowEdit(true)
  setInput(notes)
}

const handleCancel = () => {
  setShowEdit(false)
  setInput('')
}

const handleSubmit = () => {
  if (!input) return
  axios.post(state.proxyURL + '/notes', {notes: input, id})
  .then(res => {
    setNotes(res.data.notes || '')
    setInput('')
    setShowEdit(false)
    toast.success('Successfully Added Note')
  })
  .catch(err => toast.error(err.details || 'Error Adding Note'))
}

  return (
    <div className='bg-gray-100 p-3 py-5 w-auto m-3 rounded-lg'>
      <div className='relative pb-5'>
        <div className='flex items-center m-1 mb-5'>
          <a href={owner.url} target='_blank' className='mr-5'>
            <img src={owner.avatarUrl} alt='avatar' />
          </a>
      <a href={url} target='_blank' className='hover:text-gray-500'>
        {nameWithOwner}
      </a>
        </div>
      {description && (
        <div className='mb-2'>
          <strong>Description: </strong>{description}
        </div>
        )}
      {showEdit ? (
        <div>
        <div className='flex justify-center'>
          <textarea
            ref={inputRef}
            className='w-full p-1 m-1'
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        </div>
        <div className='flex justify-center'>
          <Button className='m-2' onClick={handleSubmit}>Save</Button>
          <Button className='m-2' onClick={handleCancel}>Cancel</Button>
          </div>
        </div>
      ) : (
        <div>
          {notes && <div className='mb-2'><strong>Notes: </strong>{notes}</div>}
        </div>
      )}
      {!showEdit && (
        <div className='flex justify-center'>
          <Button onClick={handleEdit}>
            {notes ? 'Edit' : 'Add'} Notes
          </Button>
        </div>
      )}
    </div>
  </div>
  )
}

Repo.propTypes = {
  data: PropTypes.object.isRequired
}

export default Repo