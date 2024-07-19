/* eslint-disable react/jsx-key */
import { Button, Modal, Table } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { useSelector } from 'react-redux'

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user)
  const [comments, setComments] = useState([])
  const [showMore, setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [commentIdToDelete, setCommentIdToDelete] = useState('')

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`api/comment/getcomments`)
        const data = await res.json()
        if (res.ok) {
          setComments(data.comments)
          if (data.comments.length < 9) {
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (currentUser.isAdmin) {
      fetchComments()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser._id])

  const handleShowMore = async () => {
    const startIndex = comments.length
    try {
      const res = await fetch(
        `/api/comment/getcomments?startIndex=${startIndex}`
      )
      const data = await res.json()
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments])
        if (data.comments.length < 9) {
          setShowMore(false)
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleDeleteComment = async () => {
    setShowModal(false)
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method: 'DELETE',
        }
      )
      const data = await res.json()
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        )
        setShowModal(false)
      } else {
        console.log(data.message)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='table-auto overflow-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell className='bg-slate-200'>
                Date Updated
              </Table.HeadCell>
              <Table.HeadCell className='bg-slate-200'>
                Comment Content
              </Table.HeadCell>
              <Table.HeadCell className='bg-slate-200'>Likes</Table.HeadCell>
              <Table.HeadCell className='bg-slate-200'>PostID</Table.HeadCell>
              <Table.HeadCell className='bg-slate-200'>UserID</Table.HeadCell>
              <Table.HeadCell className='bg-slate-200'>Delete</Table.HeadCell>
            </Table.Head>
            {comments.map((comment) => (
              <Table.Body className='divide-y'>
                <Table.Row className='bg-[whitesmoke] dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{comment.content}</Table.Cell>
                  <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  <Table.Cell>{comment.postId}</Table.Cell>
                  <Table.Cell>{comment.userId}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true)
                        setCommentIdToDelete(comment._id)
                      }}
                      className='font-medium text-red-500 hover:underlne cursor-pointer'
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='text-teal-400 w-full self-center text-sm py-7 dark:text-gray-300'
            >
              Show More
            </button>
          )}
        </>
      ) : (
        <p>You have no comments yet</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this comment?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteComment}>
                Yes, I&apos;m sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
