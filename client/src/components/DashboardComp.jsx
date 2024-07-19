import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { TbUsersGroup } from 'react-icons/tb'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { FaRegComments } from 'react-icons/fa'
import { BsGraphUpArrow } from 'react-icons/bs'
import { Button, Table } from 'flowbite-react'
import { Link } from 'react-router-dom'

export default function DashboardComp() {
  const [users, setUsers] = useState([])
  const [comments, setComments] = useState([])
  const [posts, setPosts] = useState([])
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalPosts, setTotalPosts] = useState(0)
  const [totalComments, setTotalComments] = useState(0)
  const [lastMonthUsers, setLastMonthUsers] = useState(0)
  const [lastMonthPosts, setLastMonthPosts] = useState(0)
  const [lastMonthComments, setLastMonthComments] = useState(0)

  const { currentUser } = useSelector((state) => state.user)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers?limit=5`)
        const data = await res.json()
        if (res.ok) {
          setUsers(data.users)
          setTotalUsers(data.totalUsers)
          setLastMonthUsers(data.lastMonthUsers)
        }
      } catch (error) {
        console.log(error.message)
      }
    }

    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=5`)
        const data = await res.json()
        if (res.ok) {
          setPosts(data.posts)
          setTotalPosts(data.totalPosts)
          setLastMonthPosts(data.lastMonthPosts)
        }
      } catch (error) {
        console.log(error.message)
      }
    }

    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments?limit=5`)
        const data = await res.json()
        if (res.ok) {
          setComments(data.comments)
          setTotalComments(data.totalComments)
          setLastMonthComments(data.lastMonthComments)
        }
      } catch (error) {
        console.log(error.message)
      }
    }

    if (currentUser.isAdmin) {
      fetchUsers()
      fetchPosts()
      fetchComments()
    }
  }, [currentUser])

  return (
    <div className='p-3 md:mx-auto'>
      <div className='flex flex-wrap gap-4 justify-center'>
        {/* Users */}
        <div className='flex flex-col p-3 bg-slate-200 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 dark:text-gray-300 text-md uppercase'>
                Total Users:{' '}
              </h3>
              <p className='text-2xl'>{totalUsers}</p>
            </div>
            <TbUsersGroup className='bg-green-500 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-green-500 flex items-center gap-1'>
              <BsGraphUpArrow />
              {lastMonthUsers}
            </span>
            <div className='text-gray-500 dark:text-gray-300'>Last Month</div>
          </div>
        </div>

        {/* Posts */}
        <div className='flex flex-col p-3 bg-slate-200 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 dark:text-gray-300 text-md uppercase'>
                Total Posts:{' '}
              </h3>
              <p className='text-2xl'>{totalPosts}</p>
            </div>
            <IoDocumentTextOutline className='bg-purple-500 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-green-500 flex items-center gap-1'>
              <BsGraphUpArrow />
              {lastMonthPosts}
            </span>
            <div className='text-gray-500 dark:text-gray-300'>Last Month</div>
          </div>
        </div>

        {/* Comments */}
        <div className='flex flex-col p-3 bg-slate-200 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 dark:text-gray-300 text-md uppercase'>
                Total Comments:{' '}
              </h3>
              <p className='text-2xl'>{totalComments}</p>
            </div>
            <FaRegComments className='bg-teal-500 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-green-500 flex items-center gap-1'>
              <BsGraphUpArrow />
              {lastMonthComments}
            </span>
            <div className='text-gray-500 dark:text-gray-300'>Last Month</div>
          </div>
        </div>
      </div>
      <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>
        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md bg-slate-200 dark:bg-slate-800'>
          <div className='flex justify-between p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>Recent Users</h1>
            <Button outline gradientDuoTone='greenToBlue'>
              <Link to={'/dashboard?tab=users'}>See All</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className='bg-slate-300'>
                User Image
              </Table.HeadCell>
              <Table.HeadCell className='bg-slate-300'>Username</Table.HeadCell>
            </Table.Head>
            {users &&
              users.map((user) => (
                <Table.Body key={user._id} className='divide-y'>
                  <Table.Row className='bg-slate-200 dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt='user'
                        className='w-10 h-10 rounded-full bg-gray-500'
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>

        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md bg-slate-200 dark:bg-gray-800'>
          <div className='flex justify-between p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>Recent Posts</h1>
            <Button outline gradientDuoTone='greenToBlue'>
              <Link to={'/dashboard?tab=posts'}>See All</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className='bg-slate-300'>
                Post Image
              </Table.HeadCell>
              <Table.HeadCell className='bg-slate-300'>
                Post Title
              </Table.HeadCell>
              <Table.HeadCell className='bg-slate-300'>Category</Table.HeadCell>
            </Table.Head>
            {posts &&
              posts.map((post) => (
                <Table.Body key={post._id} className='divide-7'>
                  <Table.Row className='bg-slate-200 dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      <img
                        src={post.image}
                        alt='user'
                        className='w-14 h-10 rounded-md bg-gray-500'
                      />
                    </Table.Cell>
                    <Table.Cell className='w-96'>{post.title}</Table.Cell>
                    <Table.Cell className='w-5'>{post.category}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>

        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md bg-slate-200 dark:bg-gray-800'>
          <div className='flex justify-between p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>Recent Comments</h1>
            <Button outline gradientDuoTone='greenToBlue'>
              <Link to={'/dashboard?tab=comments'}>See All</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className='bg-slate-300'>
                Comment Content
              </Table.HeadCell>
              <Table.HeadCell className='bg-slate-300'>Likes</Table.HeadCell>
            </Table.Head>
            {comments &&
              comments.map((comment) => (
                <Table.Body key={comment._id} className='divide-y'>
                  <Table.Row className='bg-slate-200 dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell className='w-96'>
                      <p className='line-clamp-2'>{comment.content}</p>
                    </Table.Cell>
                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
      </div>
    </div>
  )
}
