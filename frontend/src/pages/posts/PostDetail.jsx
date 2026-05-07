import React, {useEffect, useState} from 'react'
import Button from '../../components/ui/Button'
import {getPostById, deletePost} from '../../api/post.api'
import PostTag from '../../components/posts/PostTag'
import './PostPagesAll.scss'
import { useNavigate } from 'react-router-dom'
import PostDetailHeader from '../../components/posts/PostDetailHeader'

const PostDetail = () => {
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className='page post-section post-detail'>
      <div className="inner">
        <PostDetailHeader 
        title="게시글 보기"
        showButton
        onClick={handleGoBack}
        buttonText='뒤로가기'
        buttonClass="back bl"
        />
      </div>
    </div>
  )
}

export default PostDetail