import React, { useEffect } from 'react'
import '../styles/feed.scss'
import Post from '../components/Post'
import { usePost } from '../hooks/usePost'
import Navbar from '../../../shared/components/navbar/Navbar'
import Loading from '../../../shared/components/Loading/Loading'

const Feed = () => {

  const { feed, handleGetFeed, loading } = usePost()

  useEffect(() => {
    handleGetFeed();
  }, [])

  if (loading || !feed) {
    return (
      <Loading />
    )
  }



  return (
    <main className='feed-page'>
      <div className="feed">
        <div className="posts">

          {feed.map((post, index) => (
            <Post key={post.id ?? `${post.user}-${index}`} user={post.user} post={post} />
          ))}

        </div>
      </div>
    </main>
  )
}

export default Feed