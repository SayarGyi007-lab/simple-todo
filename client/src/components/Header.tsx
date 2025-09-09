import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import type { RootState } from '../store'
import { useLogoutMutation } from '../slices/userApi'
import { clearUserInfo } from '../slices/auth'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo)
  const [logout, { isLoading }] = useLogoutMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const logoutHandler = async () => {
    try {
      await logout({})
      dispatch(clearUserInfo())
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <header className="w-full shadow-sm bg-cyan-400 sticky top-0 z-50 backdrop-opacity-55 rounded-t-lg rounded-b-lg">
      <nav className="flex items-center justify-between max-w-6xl mx-auto px-4 py-3">

        <Link
          to="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          Anonymous Note Share
        </Link>

        <div className="hidden md:flex space-x-4 items-center">
          {userInfo ? (
            <>
              <Link
                to="/profile"
                className="text-sm font-medium text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg transition"
              >
                Profile
              </Link>
              <button
                type="button"
                className="text-sm font-medium text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition disabled:opacity-50"
                onClick={logoutHandler}
                disabled={isLoading}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-white bg-black hover:bg-gray-800 px-4 py-2 rounded-lg transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium border border-gray-300 hover:border-gray-500 px-4 py-2 rounded-lg transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow-md px-4 py-3 space-y-2">
          {userInfo ? (
            <>
              <Link
                to="/profile"
                className="block w-full text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                onClick={() => setMobileOpen(false)}
              >
                Profile
              </Link>
              <button
                type="button"
                className="block w-full text-left text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg transition disabled:opacity-50"
                onClick={logoutHandler}
                disabled={isLoading}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block w-full text-white bg-black hover:bg-gray-800 px-3 py-2 rounded-lg transition"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block w-full border border-gray-300 hover:border-gray-500 px-3 py-2 rounded-lg transition"
                onClick={() => setMobileOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}

export default Header
