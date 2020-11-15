import React, {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'

const Repo = ({data}) => {
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
  setNotes(input)
  setInput('')
  setShowEdit(false)
}

  return (
    <div className='bg-gray-100 p-3 py-5 w-auto m-3 rounded-lg'>
      <div className='relative pb-5'>
        <div className='flex items-center m-1 mb-5'>
          <a href={owner.url} target='_blank' className='mr-5'>
            <img src={owner.avatarUrl} alt='avatar' />
          </a>
      <a href={url} target='_blank'>{nameWithOwner}</a>
        </div>
      {description && <div><strong>Description: </strong>{description}</div>}
      {showEdit ? (
        <div>
        <div className='flex justify-center'>
          <textarea
            ref={inputRef}
            className='w-full p-1 m-1'
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
        </div>
        <div className='flex justify-center'>
          <button className='p-2' onClick={handleSubmit}>Save</button>
          <button className='p-2' onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <div>
          {notes && <div><strong>Notes: </strong>{notes}</div>}
        </div>
      )}
      {!showEdit && (
        <button onClick={handleEdit}>
          {notes ? 'Edit' : 'Add'} Notes
        </button>
      )}
    </div>
  </div>
  )
}

Repo.propTypes = {
  data: PropTypes.object.isRequired
}

export default Repo