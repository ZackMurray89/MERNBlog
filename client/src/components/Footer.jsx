import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { BsFacebook, BsTwitter, BsGithub } from 'react-icons/bs'

export default function FooterCom() {
  return (
    <Footer
      container
      className='border border-t-8 border-green-500 bg-slate-200'
    >
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-col-1'>
          <div className='mt-5 mb-5'>
            <Link
              to='/'
              className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'
            >
              <img
                className='bg-gradient-to-r from-green-500 via-green-550 to-green-600 h-10 rounded-lg w-80 px-2 py-1'
                src='https://res.cloudinary.com/dsc6sui8b/image/upload/v1721484069/webnexusdev--blog-high-resolution-logo-white-transparent_mu6js0.svg'
                height='35px'
                width='198.22px'
              />
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <Footer.Title title='About' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='https://github.com/ZackMurray89/MERNBlog'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  GitHub Repo
                </Footer.Link>
                <Footer.Link
                  href='/about'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  WebNexus.dev Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Follow' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='https://github.com/ZackMurray89'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  GitHub
                </Footer.Link>
                <Footer.Link
                  href='https://x.com/zackmurray_dev'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  X / Twitter
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col>
                <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
                  Privacy Policy
                </Footer.Link>
                <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            href='#'
            by='WebNexus.dev Blog'
            year={new Date().getFullYear()}
          />
          <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
            <Footer.Icon href='#' icon={BsFacebook} />
            <Footer.Icon href='https://x.com/zackmurray_dev' icon={BsTwitter} />
            <Footer.Icon
              href='https://github.com/ZackMurray89/MERNBlog'
              icon={BsGithub}
            />
          </div>
        </div>
      </div>
    </Footer>
  )
}
