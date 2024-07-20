export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center '>
      <div className='max-w-2xl mx-auto p-16 text-center border-4 border-green-500 rounded-md'>
        <div>
          <h1 className='text-3xl font font-semibold text-center my-7'>
            <img
              className='bg-gradient-to-r from-green-500 via-green-550 to-green-600 h-[100px] rounded-lg w-[800px] px-2 py-1'
              src='https://res.cloudinary.com/dsc6sui8b/image/upload/v1721484069/webnexusdev--blog-high-resolution-logo-white-transparent_mu6js0.svg'
              height='100px'
              width='500px'
            />
          </h1>
          <h1 className='text-6xl my-7'>About</h1>
          <div className='text-md text-gray-500 dark:text-gray-300 flex flex-col gap-6'>
            <p>
              Welcome to the WebNexus.dev Blog. This blog was created by Zack
              Murray as a personal project to share about all of the web
              development technologies he is currently learning and using. Zack
              is newer to the web development world, but has already gained a
              deep passion for programming and developing websites, apps, and
              more.
            </p>
            <p>
              Here you&apos;ll find weekly articles on web development topics
              like front-end and back-end frameworks, languages like JavaScript
              and TypeScript, and anything else surrounding the field.
            </p>
            <p>
              Please feel free to join and leave comments on the posts, and make
              suggestions on topics you&apos;d like to see in the future. We
              believe we can grow this community into something special, and be
              a place where all developers, new and old, can grow and improve.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
