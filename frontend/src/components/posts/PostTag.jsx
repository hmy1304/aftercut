import React from 'react'

const PostTag = ({ tag, onDelete }) => {
  return (
    <span className='post-tag'>
      <span>{tag}</span>
      {onDelete && (
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