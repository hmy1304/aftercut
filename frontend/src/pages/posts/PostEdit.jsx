import React, {useEffect, useRef, useState} from 'react'
import './PostCreateEdit.scss'
import './PostPagesAll.scss'
import {useNavigate, useParams} from 'react-router-dom'
import Button from '../../components/ui/Button'
import Input from "../../components/ui/Input"
import {CATEGORY_OPTIONS} from '../../constans/category'
import PostTag from '../../components/posts/PostTag'
import { getPostById, updatePost } from '../../api/post.api'

const PostEdit = () => {
  const {id} = useParams()
  const navigate = useNavigate()

  const [category, setCategory] = useState('ANIME')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [review, setReview] = useState('')
  const [tags, setTags] = useState([
    { label: '기본값' },
    { label: '추가 태그' }
  ])
  const fileInputRef = useRef(null)
  const [tagInput, setTagInput] = useState('')
  const [isAddingTag, setIsAddingTag] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const handleGoBack = () => {
    navigate(-1)
  }

  const loadPostDetail = async() => {
    try {
      setIsLoading(true)

      const res = await getPostById(id)
      console.log(res)
      const post = res?.data ?? res

      setCategory(post?.category ?? 'ANIME')
      setTitle(post?.title ?? '')
      setContent(post?.content ?? '')
      setReview(post?.review ?? '')
    } catch (error) {
      console.error('게시글을 불러오지 못했습니다.', error)
      navigate('/app')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    loadPostDetail()
  },[id])

  const handleUpdate = async(e) => {
    e.preventDefault()
    if(!title.trim()) {
      alert('제목을 입력하세요.')
      return
    }

    if(!content.trim()) {
      alert('줄거리를 입력하세요.')
      return
    }

    if(!review.trim()) {
      alert('후기를 입력하세요')
      return
    }

    try {
      setIsSaving(true)

      const payload = {
        category,
        title,
        content,
        review
      }

      if(confirm('수정하시겠습니까?')) {
        await updatePost(id, payload)
        navigate('/app')
      }
    } catch (error) {
      console.error('수정 실패', error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className='page post-section post-edit'>
      <div className="inner">
        <div className="create-header">
          <h2>작성</h2>
          <Button 
            text="뒤로가기"
            className="back"
            icons
            onClick={handleGoBack}
          />
        </div>
        <form onSubmit={handleUpdate} className='post-form'>
          <div className="post-card">
            <div className="post-upload-card">
              <div className="post-upload-placeholder">
                <input type="file" accept='image/*' className='post-uppload-input' />
                <img src="" alt="img" />
              </div>
            </div>

            <div className="post-field">
              <label className='post-label'>카테고리</label>
              <div className="post-input-wrap">
                <select 
                value={category}
                onChange={(e)=> setCategory(e.target.value)}
                >
                  {CATEGORY_OPTIONS.map((opt) => (

                    <option value={opt.value} key={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="post-title">
              <label className='post-label'>제목</label>
              <Input
                label="제목"
                name="title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                placeholder="제목을 입력하세요"
              />
            </div>

            <div className="post-tag-box">

              <div className="tags">
                <div className="tags-input-wrap">
                  <input type="text" className='post-tag-input' placeholder='tag를 자유롭게 입력하세요' />
                  <Button type="button" text="장르 추가" className="primary" />
                </div>
                <div className="tags-wrap">
                  <PostTag tag="tag1" />
                  <PostTag tag="tag1" />
                </div>
              </div>
            </div>

            <div className="post-field">
              <label className='post-label'>줄거리</label>
              <div className="post-input-wrap">
                <textarea 
                value={content}
                onChange={(e)=> setContent(e.target.value)}
                className='post-textarea' 
                placeholder='내용을 자유롭게 입력하세요' 
                />
              </div>
            </div>

            <div className="post-field">
              <label className='post-label'>후기</label>
              <div className="post-input-wrap">
                <textarea 
                value={review}
                onChange={(e)=>setReview(e.target.value)}
                className='post-textarea' 
                placeholder='내용을 자유롭게 입력하세요' 
                />
              </div>
            </div>

            <div className="post-actions">
              <Button
                type="submit"
                text="후기 수정"
                className="primary"
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default PostEdit