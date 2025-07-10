
import { Link } from 'react-router-dom'

const Header = () => {
  return <nav className='flex my-3 items-center justify-between'>
    <h2 className='text-3xl font-bold'>Simple Share</h2>
    <div className='space-x-4'>
        <Link to="/login" className='text-white bg-black py-2 px-4 rounded-md'>Login</Link>
        <Link to="/register" className=' py-2 px-4 border rounded-md'>Register</Link>
    </div>
  </nav>
}

export default Header