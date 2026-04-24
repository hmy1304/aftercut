import React from 'react'

const PostTag = ({tag}) => {
  return (
    <span className='post-tag'>
      <span>
        {tag}
      </span>
      <button className='post-tag-delete'>X</button>
    </span>
  )
}

export default PostTag