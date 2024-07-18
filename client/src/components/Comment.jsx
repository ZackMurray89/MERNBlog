/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import moment from 'moment'
import { FaThumbsUp } from 'react-icons/fa'
import { useSelector } from 'react-redux'

// eslint-disable-next-line react/prop-types
export default function Comment({ comment, onLike, onEdit, onDelete }) {
  const [user, setUser] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(comment.content)
  const { currentUser } = useSelector((state) => state.user)
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

  const handleEdit = () => {
    setIsEditing(true)
    setEditedContent(comment.content)
  }

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
        <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
          <button
            type='button'
            onClick={() => onLike(comment._id)}
            className={`text-gray-400 hover:text-blue-400 ${
              currentUser &&
              comment.likes.includes(currentUser._id) &&
              '!text-blue-500'
            }`}
          >
            <FaThumbsUp className='text-sm' />
          </button>
          <p className='text-gray-400'>
            {comment.numberOfLikes > 0 &&
              comment.numberOfLikes +
                ' ' +
                (comment.numberOfLikes === 1 ? 'like' : 'likes')}
          </p>
          {currentUser &&
            (currentUser._id === comment.userId || currentUser.isAdmin) && (
              <>
                <button
                  type='button'
                  onClick={handleEdit}
                  className='text-gray-400 hover:text-blue-500'
                >
                  Edit
                </button>
                <button
                  type='button'
                  onClick={() => onDelete(comment._id)}
                  className='text-gray-400 hover:text-blue-500'
                >
                  Delete
                </button>
              </>
            )}
        </div>
      </div>
    </div>
  )
}
