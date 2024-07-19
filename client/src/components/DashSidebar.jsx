import { Sidebar } from 'flowbite-react'
import {
  HiAnnotation,
  HiArrowSmRight,
  HiDocumentText,
  HiUser,
  HiUserGroup,
} from 'react-icons/hi'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { signoutSuccess } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function DashSidebar() {
  const location = useLocation()
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user)
  const [tab, setTab] = useState('')

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      })
      const data = await res.json()
      if (!res.ok) {
        console.log(data.message)
      } else {
        dispatch(signoutSuccess())
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const customTheme = {
    root: {
      base: 'h-full',
      inner:
        'h-full overflow-y-auto overflow-x-hidden rounded bg-slate-100 dark:bg-gray-800 px-3 py-4',
    },
    item: {
      active: 'bg-gray-300 dark:bg-gray-700',
    },
  }

  return (
    <Sidebar className='w-full md:w-56' theme={customTheme}>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-0.25'>
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              label={currentUser.isAdmin ? 'Admin' : 'User'}
              labelColor='dark'
              as='div'
              className='hover:bg-slate-300 dark:hover:bg-slate-600'
            >
              Profile
            </Sidebar.Item>
          </Link>

          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=users'>
              <Sidebar.Item
                active={tab === 'users'}
                icon={HiUserGroup}
                as='div'
                className='hover:bg-slate-300 dark:hover:bg-slate-600'
              >
                Users
              </Sidebar.Item>
            </Link>
          )}

          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=posts'>
              <Sidebar.Item
                active={tab === 'posts'}
                icon={HiDocumentText}
                as='div'
                className='hover:bg-slate-300 dark:hover:bg-slate-600'
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}

          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=comments'>
              <Sidebar.Item
                active={tab === 'posts'}
                icon={HiAnnotation}
                as='div'
                className='hover:bg-slate-300 dark:hover:bg-slate-600'
              >
                Comments
              </Sidebar.Item>
            </Link>
          )}
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            onClick={handleSignOut}
            icon={HiArrowSmRight}
            className='hover:bg-slate-300 dark:hover:bg-slate-600 cursor-pointer'
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
