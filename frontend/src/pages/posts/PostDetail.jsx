import React, { useEffect, useState } from 'react'
import Button from '../../components/ui/Button'
import { getPostById, deletePost } from '../../api/post.api'
import PostTag from '../../components/posts/PostTag'
import './PostPagesAll.scss'
import { useNavigate, useParams } from 'react-router-dom'
import PostDetailHeader from '../../components/posts/PostDetailHeader'

const PostDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  const handleGoBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(Number(id))
        console.log(data)
        setPost({ ...data })
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [id])

  if (loading) return <div>로딩중</div>
  if (!post) return <div>데이터 없음</div>

  // tags가 문자열 배열 또는 객체 배열 모두 대응
  const tagList = (post.tags ?? []).map((t) =>
    typeof t === 'string' ? t : t.label ?? t.name ?? String(t)
  )

  const handlePostDelete = async () => {
    if (confirm('게시글을 정말 삭제하시겠습니까?')) {
      try {
        await deletePost(id)
        navigate('/app', { replace: true })
      } catch (error) {
        console.error('게시글 삭제 오류', error)
      }
    }
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
        <div className='post-main'>
          {post.imageUrl && (
            <div className="img-wrap">
              <img src={post.imageUrl} alt={post.title} />
            </div>
          )}
          <div className="post-card-body">
            <p className="post-card-category">
              {post.category}
            </p>
            <h4 className="post-card-title">
              {post.title}
            </h4>
            <div className="tags">
              {tagList.map((tag, i) => (
                <PostTag key={`${tag}-${i}`} tag={tag} />
              ))}
            </div>
            <div className="btn-wrap">
              <Button
                text="수정"
                className="edit primary"
                onClick={() => { navigate(`/app/posts/${id}/edit`) }}
              />
              <Button
                text="삭제"
                className="delete primary"
                onClick={handlePostDelete}
              />
            </div>
            <div className="post-card-body-wrap">
              <div className='post-card-content-wrap'>
                <label className='post-label'>줄거리</label>
                <p className='post-card-content'>
                  {post.content}
                </p>
              </div>
              <div className="post-card-review-wrap">
                <label className='post-label'>후기</label>
                <p className='post-card-review'>
                  {post.review}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetail