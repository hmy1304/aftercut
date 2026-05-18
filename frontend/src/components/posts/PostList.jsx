import React from 'react'
import PostCard from "./PostCard"

const PostList = ({posts, pagetype}) => {
  return (
    <div className='post-list'>
      {posts.map((post)=>(
        <PostCard key={post.id} post={post} pagetype={pagetype}/>
      ))}
    </div>
  )
}

export default PostList