import React from 'react'
import PostCard from "./PostCard"

const PostList = ({posts, onDelete, pagetype}) => {
  return (
    <div className='post-list'>
      {posts.map((post)=>(
        <PostCard key={post.id} post={post} onDelete={onDelete} pagetype={pagetype}/>
      ))}
    </div>
  )
}

export default PostList