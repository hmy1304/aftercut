import React, {useEffect, useState} from 'react'
import { deletePost } from '../../api/post.api'
import { Link, useNavigate } from 'react-router-dom'
import PostTag from "./PostTag"
import Button from '../ui/Button'

const PostCard = ({post, pagetype}) => {
  const navigate = useNavigate()

  const handlePostDeleteDash = async(e) => {
    e.preventDefault
    if(confirm('후기를 정말 삭제하시겠습니까?')) {
      try {
        await deletePost(Number(post.id))
        navigate('/app', {replace:true})
      } catch (error) {
        console.error('후기 삭제 오류', error.response.data)
      }
    }
  }

  const handlePostDeleteAll = async(e) => {
    e.preventDefault
    if(confirm('후기를 정말 삭제하시겠습니까?')) {
      try {
        await deletePost(Number(post.id))
        navigate('/app/posts/all', {replace:true})
      } catch (error) {
        console.error('후기 삭제 오류', error.response.data)
      }
    }
  }

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
          <Button text="삭제" className="primary" onClick={pagetype ? handlePostDeleteDash : handlePostDeleteAll}/>
        </div>
      </article>
    </Link>
  )
}

export default PostCard