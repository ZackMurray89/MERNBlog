import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default function CreatePost() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create Post</h1>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='type'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
          />
          <Select>
            <option value='uncategorized'>Select Category</option>
            <option value='html-css'>HTML/CSS</option>
            <option value='javascript'>JavaScript</option>
            <option value='reactjs'>React.js</option>
            <option value='nextjs'>Next.js</option>
            <option value='vuejs'>Vue.js</option>
            <option value='expressjs'>Express.js</option>
            <option value='other'>Other</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-emerald-500 border-dotted p-3'>
          <FileInput type='file' accept='image/*' />
          <Button type='button' gradientDuoTone='greenToBlue' size='sm' outline>
            Upload Image
          </Button>
        </div>
        <ReactQuill
          theme='snow'
          placeholder='Post...'
          className='h-72 mb-12'
          required
        />
        <Button type='submit' gradientDuoTone='greenToBlue'>
          Publish
        </Button>
      </form>
    </div>
  )
}
