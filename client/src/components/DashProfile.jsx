import { Alert, Button, Modal, TextInput } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from '../redux/user/userSlice'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user)
  const [imageFile, setImageFile] = useState(null)
  const [imageFileUrl, setImageFileUrl] = useState(null)
  const [imageFileUploadingProgress, setImageFileUploadingProgress] =
    useState(null)
  const [imageFileUploadError, setImageFileUploadError] = useState(null)
  const [formData, setFormData] = useState({})
  const [imageFileUploading, setImageFileUploading] = useState(false)
  const [updateUserSucess, setUpdateUserSuccess] = useState(null)
  const [updateUserError, setUpdateUserError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const filePickerRef = useRef()
  const dispatch = useDispatch()
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImageFileUrl(URL.createObjectURL(file))
    }
  }
  useEffect(() => {
    if (imageFile) {
      uploadImage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile])

  const uploadImage = async () => {
    setImageFileUploading(true)
    setImageFileUploadError(null)
    const storage = getStorage(app)
    const fileName = new Date().getTime() + imageFile.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

        setImageFileUploadingProgress(progress.toFixed(0))
      },
      // eslint-disable-next-line no-unused-vars
      (error) => {
        setImageFileUploadError(
          'Could not upload image (File must be less than 2MB)'
        )
        setImageFileUploadingProgress(null)
        setImageFile(null)
        setImageFileUrl(null)
        setImageFileUploading(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageFileUrl(downloadUrl)
          setFormData({ ...formData, profilePicture: downloadUrl })
          setImageFileUploading(false)
        })
      }
    )
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUpdateUserError(null)
    setUpdateUserSuccess(null)
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made')
      return
    }
    if (imageFileUploading) {
      setUpdateUserError('Please wait for image to upload')
      return
    }
    try {
      dispatch(updateStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) {
        dispatch(updateFailure(data.message))
        setUpdateUserError(data.message)
      } else {
        dispatch(updateSuccess(data))
        setUpdateUserSuccess("User's profile updated successfully")
      }
    } catch (error) {
      dispatch(updateFailure(error.message))
      setUpdateUserError(error.message)
    }
  }

  const handleDeleteUser = async () => {
    setShowModal(false)
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message))
      } else {
        dispatch(deleteUserSuccess(data))
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

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

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full relative'
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadingProgress && (
            <CircularProgressbar
              value={imageFileUploadingProgress || 0}
              text={`${imageFileUploadingProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadingProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt='User'
            className={`rounded-full w-full h-full border-8 border-green-500 ${
              imageFileUploadingProgress &&
              imageFileUploadingProgress < 100 &&
              'opacity-60'
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
        )}
        <TextInput
          type='text'
          id='username'
          placeholder='Username'
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type='email'
          id='email'
          placeholder='Email'
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type='password'
          id='password'
          placeholder='Password'
          onChange={handleChange}
        />
        <Button
          type='submit'
          className='bg-gradient-to-r from-green-600 via-green-500 to-green-400'
          outline
          disabled={loading || imageFileUploading}
        >
          {loading ? 'Loading...' : 'Update'}
        </Button>
        {currentUser.isAdmin && (
          <Link to='/create-post'>
            <Button
              type='button'
              gradientDuoTone='greenToBlue'
              className='w-full'
            >
              Create Post
            </Button>
          </Link>
        )}
      </form>
      <div className='text-red-400 flex justify-between mt-5 mb-5'>
        <span onClick={() => setShowModal(true)} className='cursor-pointer'>
          Delete Account
        </span>
        <span onClick={handleSignOut} className='cursor-pointer'>
          Sign Out
        </span>
      </div>
      {updateUserSucess && (
        <Alert color='success' className='mt-5'>
          {updateUserSucess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
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
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>
                Yes, I&apos;m Sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
