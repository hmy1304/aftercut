import React from 'react'
import { Link } from 'react-router-dom'
import PostTag from "./PostTag"
import Button from '../ui/Button'

const PostCard = ({post}) => {
  return (
    <Link to={`/app/posts/${post.id}`} className='post-card'>
      <article>
        <div className="img-wrap">
          <img src={post.thumbnail || 'images/placeholder.png'} alt={post.title} />
        </div>
        <div className="post-card-body">
          <p className='post-category'>{post.category}</p>
          <h3 className="post-tile">{post.title}</h3>
          <div className="tags">
            {(post.tags || []).map((tag, i)=>(
              <PostTag key={i} tag={tag}/>
            ))}
          </div>
          <p className="post-content">{post.content}</p>
        </div>
        <div className="btn-wrap">
          <Button text="삭제" className="primary"/>
        </div>
      </article>
    </Link>
  )
}

export default PostCard