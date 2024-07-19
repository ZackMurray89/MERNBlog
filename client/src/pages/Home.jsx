import { Link } from 'react-router-dom'
import CallToAction from '../components/CallToAction'
import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/post/getPosts`)
      const data = await res.json()
      setPosts(data.posts)
    }
    fetchPosts()
  }, [])

  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold lg:text-6xl'>
          Welcome to WebNexus.dev
        </h1>
        <p className='text-gray-500 text-sx sm:text-sm'>
          WebNexus.dev is a blog for all web developers. Here we will cover
          everything from HTML/CSS to the most popular and latest front-end and
          back-end frameworks.
        </p>
        <Link
          to='/search'
          className='text-xs sm:text-sm text-green-500 font-bold hover:underline'
        >
          View All Posts
        </Link>
      </div>
      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>

      <div className='max-w-[90rem] mx-auto p-3 flex flex-col columns-3 gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4 justify-center'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-green-500 hover:underline text-center font-semibold'
            >
              View All Posts
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
