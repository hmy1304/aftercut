import React, {useState, useEffect} from 'react'
import PostHeader from '../../components/posts/PostHeader'
import PostList from '../../components/posts/PostList'
import TagFilterBar from '../../components/posts/TagFilterBar'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import './PostPagesAll.scss'
import {useNavigate} from 'react-router-dom'
import useFilteredPosts from '../../hooks/useFilteredPosts'
import { getPosts } from '../../api/post.api'

const PostsAll = () => {
  const [selectedTag, setSelectedTag] = useState('전체')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [tags, setTags] = useState(['전체'])

  const [posts, setPosts] = useState([])
  const [fetchError, setFetchError] = useState('')
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3

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
          thumbnail:post.imageUrl || ''
        }))

        setPosts(mappedPosts)
      } catch (error) {
        setFetchError(error?.response?.data?.message || error.message || '게시글 조회에 실패했습니다.')
        setPosts([])
      }
    }
    fetchPosts()
  },[])

  const filteredPosts = useFilteredPosts(posts, selectedTag, searchKeyword)

  

  return (
    <div>PostsAll</div>
  )
}

export default PostsAll