import React, { useRef, useState } from 'react'
import './PostCreateEdit.scss'
import './PostPagesAll.scss'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { CATEGORY_OPTIONS } from '../../constans/category'
import PostTag from '../../components/posts/PostTag'
import { createPost } from '../../api/post.api'
import { uploadImage } from '../../api/upload.api'

const PostCreate = () => {
  const navigate = useNavigate()

  const [category, setCategory] = useState('ANIME')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [review, setReview] = useState('')
  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)
  const [isUploading, setIsUploading] = useState(false)  // ✅ 업로드 중 상태
  const fileInputRef = useRef(null)

  // ✅ 파일 선택 즉시 S3 업로드
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      const url = await uploadImage(file)
      setImageUrl(url)
    } catch (error) {
      console.error('이미지 업로드 실패', error)
      alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsUploading(false)
      // 같은 파일 재선택 가능하도록 value 초기화
      e.target.value = ''
    }
  }

  const handleAddTag = () => {
    const trimmed = tagInput.trim()
    if (!trimmed) return
    if (tags.includes(trimmed)) {
      setTagInput('')
      return
    }
    setTags((prev) => [...prev, trimmed])
    setTagInput('')
  }

  const handleTagInputKeyDown = (e) => {
    // 한글 입력(IME) 중일 때는 이벤트를 무시합니다.
    if (e.nativeEvent.isComposing) return

    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleDeleteTag = (tagToDelete) => {
    setTags((prev) => prev.filter((t) => t !== tagToDelete))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!title.trim()) {
      alert('제목을 입력하세요')
      return
    }
    if (!content.trim()) {
      alert('줄거리를 입력하세요')
      return
    }
    if (!review.trim()) {
      alert('후기를 입력하세요')
      return
    }

    try {
      setIsSaving(true)

      const payload = {
        category,
        title,
        content,
        review,
        tags,
        imageUrl,  // ✅ S3 URL이 담김
      }

      const res = await createPost(payload)
      console.log(res)
      navigate('/app')
    } catch (error) {
      console.error('메세지 저장 실패', error.response?.data)
    } finally {
      setIsSaving(false)
    }
  }

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
        <form onSubmit={handleSave} className='post-form'>
          <div className="post-card">
            <div className="post-upload-card">
              <div
                className={`post-upload-placeholder ${isUploading ? 'uploading' : ''}`}
                onClick={() => !isUploading && fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept='image/*'
                  className='post-uppload-input'
                  onChange={handleFileChange}
                />
                {/* ✅ 업로드 중 / 미리보기 / 안내 문구 분기 */}
                {isUploading ? (
                  <span className="upload-hint">업로드 중...</span>
                ) : imageUrl ? (
                  <img src={imageUrl} alt="미리보기" style={{ maxHeight: 200, objectFit: 'cover' }} />
                ) : (
                  <span className="upload-hint">클릭하여 이미지를 업로드하세요</span>
                )}
              </div>
            </div>

            <div className="post-field">
              <label className='post-label'>카테고리</label>
              <div className="post-input-wrap">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {CATEGORY_OPTIONS.map((opt) => (
                    <option value={opt.value} key={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="post-field">
              <label className='post-label'>제목</label>
              <Input
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요"
              />
            </div>

            <div className="post-tag-box">
              <label className='post-label'>태그</label>
              <div className="tags">
                <div className="tags-input-wrap">
                  <input
                    type="text"
                    className='post-tag-input'
                    placeholder='태그를 입력하고 추가 버튼을 누르세요'
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagInputKeyDown}
                  />
                  <Button
                    type="button"
                    text="추가"
                    className="primary"
                    onClick={handleAddTag}
                  />
                </div>
                <div className="tags-wrap">
                  {tags.map((tag, i) => (
                    <PostTag
                      key={`${tag}-${i}`}
                      tag={tag}
                      onDelete={handleDeleteTag}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="post-field">
              <label className='post-label'>줄거리</label>
              <div className="post-input-wrap">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
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
                  onChange={(e) => setReview(e.target.value)}
                  className='post-textarea'
                  placeholder='내용을 자유롭게 입력하세요'
                />
              </div>
            </div>

            <div className="post-actions">
              <Button
                type="submit"
                text={isSaving ? '저장 중...' : '저장하기'}
                className="primary"
                disabled={isSaving || isUploading}  // ✅ 업로드 중엔 저장 불가
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default PostCreate