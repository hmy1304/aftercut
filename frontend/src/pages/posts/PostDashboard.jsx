import React, {useEffect, useState, useMemo} from 'react'
import PostHeader from "../../components/posts/PostHeader"
import PostList from "../../components/posts/PostList"
import TagFilterBar from "../../components/posts/TagFilterBar"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"
import "./PostPagesAll.scss"
import {getPosts, deletePost} from "../../api/post.api"
import { useNavigate } from 'react-router-dom'
import useFilteredPosts from '../../hooks/useFilteredPosts'

const PostDashboard = () => {
  const [selectedTag, setSelectedTag] = useState('전체')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [tags, setTags] = useState(['전체'])

  const [posts, setPosts] = useState([])
  const navigate = useNavigate()
  const [fetchError, setFetchError] = useState('')

  const [sortType, setSortType] = useState('latest')
  const [showSortBox, setShowSorBox] = useState(false)

  useEffect(()=>{
    setFetchError('')
    const fetchPosts = async() => {
      try {
        const response = await getPosts()

        console.log(response)
        const rawPosts = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
            ? response.data
            : []

        const mappedPosts = (rawPosts || []).map((post)=>({
          id:post.id,
          category:post.category,
          title:post.title,
          content:post.content,
          tags:post.tags || [],
          thumbnail:post.imageUrl || '',
          createdAt:post.createdAt
        }))

        setPosts(mappedPosts)
        const uniqueTags = [
          '전체',
          ...new Set(mappedPosts.flatMap((post)=>post.tags || []))
        ]
        setTags(uniqueTags)
      } catch (error) {
        console.error(error?.response?.data?.message || error.message || '게시글 조회 실패')
        setPosts([])
      }
    }
    fetchPosts()
  },[])

  const filteredPosts = useFilteredPosts(posts, selectedTag, searchKeyword)

  const sortedPosts = useMemo(()=>{
    const copiedPosts = [...filteredPosts]

    return copiedPosts.sort((a, b)=>{
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()

      if(sortType === 'latest') {
        return dateB - dateA
      }

      return dateA - dateB
    })
  }, [filteredPosts, sortType])

  const handleCreatePost = () => {
    console.log('새 메모 작성')
    navigate('/app/posts/new')
  }

  const handlePostDelete = async(postId) => {
    try {
      await deletePost(postId)

      setPosts((prev)=>
        prev.filter((post)=>post.id !== postId)
      )
    } catch (error) {
      console.error('후기 삭제 오류', error.response?.data || error.message)
    }
  }

  return (
    <section className='page post-section'>
      <div className="inner">
        <PostHeader/>
        <div className="input-post">
          <Input 
          placeholder="검색할 제목을 입력하시오"
          value={searchKeyword}
          onChange={(e)=>setSearchKeyword(e.target.value)}
          />
        </div>
        <div className="tags-wrapper">
          <TagFilterBar 
          tags={tags}
          selectedTag={selectedTag}
          onChangeTag={setSelectedTag}
          />
          <div className="post-btn-wrap">
            <div className="filter-wrapper">
              <div 
              className="filter-btn"
              onClick={()=>setShowSorBox(!showSortBox)}
              >
                <img src="../../images/filter.svg" alt="filter" />
              </div>
              {showSortBox && (
                <div className='sort-box'>
                  <button
                  type='button'
                  onClick={()=>{
                    setSortType('latest')
                    setShowSorBox(false)
                  }}
                  >
                    최신순
                  </button>

                  <button
                  type='button'
                  onClick={()=>{
                    setSortType('oldest')
                    setShowSorBox(false)
                  }}
                  >
                    오래된 순
                  </button>
                </div>
              )}
            </div>
            <Button 
            text="후기 작성하기" 
            className="primary"
            onClick={handleCreatePost}/>
          </div>
        </div>
        <PostList posts={sortedPosts} onDelete={handlePostDelete} pagetype={true}/>
      </div>
    </section>
  )
}

export default PostDashboard