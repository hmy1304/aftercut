import React from 'react'
import PostTag from './PostTag'
import "./PostComponentAll.scss"

const TagFilterBar = ({tags, onChangeTag}) => {
  return (
    <div className='tags'>
      {tags.map((tag, i)=>(
        <PostTag 
        key={`${tag}.${i}`}
        tag={tag}
        onClick={()=>onChangeTag(tag)}
        showDelete={false}
        />
      ))}
    </div>
  )
}

export default TagFilterBar