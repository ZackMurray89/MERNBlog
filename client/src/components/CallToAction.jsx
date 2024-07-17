import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'

export default function CallToAction() {
  return (
    <div className='flex flex-col mt-4 mb-4 sm:flex-row p-3 border-4 border-green-500 justify-center items-center rounded rounded-tl-3xl rounded-br-3xl text-center'>
      <div className='flex-1 justify-center flex flex-col'>
        <h2 className='text-2xl'>Want to learn more?</h2>
        <p className='text-gray-400 my-2'>
          Come back weekly for new posts about your favorite WebDev technologies
          and concepts.
        </p>
        <Link
          to='/'
          target='_blank'
          className='flex justify-center items-center mt-8'
        >
          <Button
            gradientDuoTone='greenToBlue'
            className='rounded-tl-xl rounded-bl-none'
          >
            WebNexus.dev
          </Button>
        </Link>
      </div>
      <div className='p-7 flex-1'>
        <img src='https://cdn.pixabay.com/photo/2024/05/21/19/58/code-8779051_1280.jpg' />
      </div>
    </div>
  )
}
