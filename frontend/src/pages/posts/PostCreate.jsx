import React from 'react'
import './PostCreateEdit.scss'
import './PostPagesAll.scss'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import {CATEGORY_OPTIONS} from '../../constans/category'
import PostTag from '../../components/posts/PostTag'

const PostCreate = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <section className='page post-section post-create'>
      <div className="inner">
        <div className="create-header">
          <h2>작성</h2>
          <Button 
            text="뒤로가기"
            className="back"
            icons
            onClick={handleBack}
          />
        </div>
        <form action="" className='post-form'>
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
                <select >
                  {CATEGORY_OPTIONS.map((opt) => (

                    <option value={opt.value} key={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <Input
              label="제목"
              name="title"
              placeholder="제목을 입력하세요"
            />

            <div className="post-tag-box">

              <div className="tags">
                <div className="tags-input-wrap">
                  <input type="text" className='post-tag-input' placeholder='tag를 자유롭게 입력하세요' />
                  <Button type="button" text="장르 추가" className="primary" />
                </div>
                <PostTag tag="tag1" />
                <PostTag tag="tag1" />
              </div>
            </div>

            <div className="post-field">
              <label className='post-label'>줄거리</label>
              <div className="post-input-wrap">
                <textarea className='post-textarea' placeholder='내용을 자유롭게 입력하세요' />
              </div>
            </div>

            <div className="post-field">
              <label className='post-label'>후기</label>
              <div className="post-input-wrap">
                <textarea className='post-textarea' placeholder='내용을 자유롭게 입력하세요' />
              </div>
            </div>

            <div className="post-actions">
              <Button
                type="submit"
                text="저장하기"
                className="primary"
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default PostCreate