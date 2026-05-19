import React, {useMemo} from 'react'

const useFilteredPosts = (posts, selectedTag, searchKeyword) => {
  return useMemo(()=>{
    const keyword = searchKeyword.toLowerCase().trim()
    const filteredByTag =
        selectedTag === '전체'
            ? posts
            : posts.filter((post)=>
                post.tags.includes(selectedTag)
            )
    
    const filtered = filteredByTag.filter((post)=>{
        if(!keyword) return true

        const titleMatch = post.title?.toLowerCase().includes(keyword)

        const contentMatch = post.content
            ?.toLowerCase()
            .includes(keyword)

        const tagMatch = post.tags?.some((tag)=> tag.toLowerCase().includes(keyword))

        return titleMatch || contentMatch || tagMatch
    })

    return filtered
  },[posts, selectedTag, searchKeyword])
}

export default useFilteredPosts