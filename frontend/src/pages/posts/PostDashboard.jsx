import React, {useState} from 'react'
import PostHeader from "../../components/posts/PostHeader"
import PostList from "../../components/posts/PostList"
import TagFilterBar from "../../components/posts/TagFilterBar"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"
import "./PostPagesAll.scss"

const PostDashboard = () => {
  const [selectedTag, setSelectedTag] = useState('전체')
  const [searchKeyword, setSearchKeyword] = useState('')
  const tags = ['태그1', '태그2', '태그3']

  const posts = [
    {
      id:1,
      category:'CASE STUDY',
      title:'Korba',
      content:'1',
      tags:['태그1', '태그2'],
      thumbnail: '/images/sample1.jpg'
    },
    {
      id:2,
      category:'CASE STUDY',
      title:'Picnote',
      content:'2',
      tags:['태그2'],
      thumbnail: '/images/sample2.jpg'
    },
    {
      id:3,
      category:'CASE STUDY',
      title:'Memo Archive',
      content:'3',
      tags:['태그3'],
      thumbnail: '/images/sample3.jpg'
    },
  ]

  const filteredByTag = selectedTag === '전체'
  ? posts
  : posts.filter((post)=>
    post.tags.includes(selectedTag)
  )
  
  const filteredPosts = filteredByTag.filter((post)=> {
    const keyword = searchKeyword.toLowerCase().trim()

    if(!keyword) return true

    return (
      post.title.toLowerCase().includes(keyword) ||
      post.content.toLowerCase().includes(keyword)
    )
  })

  const handleCreatePost = () => {
    console.log('새 메모 작성')
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
          onCreate={handleCreatePost}
          />
          <div className="btn-wrap">
            <div className="filter-btn">
              <img src="../../images/filter.svg" alt="filter" />
            </div>
            <Button 
            text="후기 작성하기" 
            className="primary"
            onClick={handleCreatePost}/>
          </div>
        </div>
        <PostList posts={filteredPosts}/>
      </div>
    </section>
  )
}

export default PostDashboard