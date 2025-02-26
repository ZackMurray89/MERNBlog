import { Button } from 'flowbite-react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

export default function OAuth() {
  const auth = getAuth(app)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' })
    try {
      const resultsFromGooge = await signInWithPopup(auth, provider)
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: resultsFromGooge.user.displayName,
          email: resultsFromGooge.user.email,
          googlePhotoUrl: resultsFromGooge.user.photoURL,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        dispatch(signInSuccess(data))
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Button
      type='button'
      gradientDuoTone='greenToBlue'
      outline
      className='items-center text-center font-semibold'
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className='w-5 h-5 mr-2' />
      Continue With Google
    </Button>
  )
}
