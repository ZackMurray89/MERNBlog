import { Navbar, TextInput, Button, Dropdown, Avatar } from 'flowbite-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon, FaSun } from 'react-icons/fa'
import { PiSignIn } from 'react-icons/pi'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice'
import { signoutSuccess } from '../redux/user/userSlice'
import { useEffect, useState } from 'react'

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  const path = useLocation().pathname
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user)
  const { theme } = useSelector((state) => state.theme)

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

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl)
    }
  }, [location.search])

  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(location.search)
    urlParams.set('searchTerm', searchTerm)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  return (
    <Navbar className='border-b-2 bg-slate-200'>
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >
        <span className=' h-10 px-2 py-1 mx-1 bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-lg text-white'>
          WebNexus.dev Blog
        </span>
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          sizing='sm'
          className='hidden lg:inline bg-[#f2f3f4]'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray'>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2 items-center justify-center'>
        <Button
          className='w-12 h- hidden sm:inline'
          color='gray'
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaMoon className='bg-[#f2f3f4]' /> : <FaSun />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt='user'
                img={currentUser.profilePicture}
                rounded
                className='border-2 border-green-500 rounded-full'
              />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button
              className=' bg-gradient-to-r from-green-600 via-green-500 to-green-400'
              outline
            >
              <span className='flex gap-1 items-center text-center text-xs subpixel-antialiased font-semibold'>
                <PiSignIn /> Sign In
              </span>
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link
            to='/'
            className='subpixel-antialiased text-base font-bold hover:text-green-400'
          >
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link
            to='/about'
            className='subpixel-antialiased text-base font-bold hover:text-green-400'
          >
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link
            to='/projects'
            className='text-base font-bold hover:text-green-400'
          >
            Projects
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
