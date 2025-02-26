import Background from '@/components/Background'
import Login from '@/components/Login'
import { HomeIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

const LoginPage = () => {
  return (
    <Background>
      <div className='flex justify-center items-center h-screen mx-5'>
        <Login />
      </div>
      <div className="flex fixed bg-primary-dark bottom-10 right-5 p-3 rounded-full">
        <Link
          href='/'
          className="hover:scale-110 transition-all"
        >
          <HomeIcon className="w-6 h-6 text-white" />
        </Link>
      </div>
    </Background>
  )
}

export default LoginPage