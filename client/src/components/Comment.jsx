import { useEffect, useState } from 'react'
import moment from 'moment'

export default function Comment({ comment }) {
  const [user, setUser] = useState({})
  console.log(user)

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`)
        const data = await res.json()

        if (res.ok) {
          setUser(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [comment])

  return (
    <div className='flex p-4 border-b dak:border-gray-600 text-sm'>
      <div className='flex-shrink-0 mr-3'>
        <img
          className='w-10 h-10 rounded-full bg-gray-200'
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className='flex-1'>
        <div className='flex items-center mb-1'>
          <span className='font-bold mr-1 text-xs truncate'>
            {user ? `@${user.username}` : 'Anonymous User'}
          </span>
          <span className='font-semibold mr-1 text-xs text-gray-500'>
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className='text-gray-500 mb-2 dark:text-gray-300'>
          {comment.content}
        </p>
      </div>
    </div>
  )
}
