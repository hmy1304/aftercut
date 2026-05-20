import React from 'react'

const PostTag = ({ tag, onDelete, showDelete = true }) => {
  return (
    <span className='post-tag'>
      <span>{tag}</span>
      
      {showDelete && (
        <button
          type="button"
          className='post-tag-delete'
          onClick={(e) => {
            e.preventDefault()
            onDelete(tag)
          }}
        >
          ×
        </button>
      )}
    </span>
  )
}

export default PostTag