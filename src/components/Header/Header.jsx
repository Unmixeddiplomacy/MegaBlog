import {Logo , LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const navItems = [
    {
      name: "Home",
      slug: "/home",
      active: true
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  const authItems = [
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
  ]

  return (
    <header className='sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg w-full'>
      <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <nav className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex items-center'>
            <Link to='/home' className='hover:opacity-80 transition-all duration-200 transform hover:scale-105'>
              <Logo width='32px'  />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            {/* Main Navigation */}
            <ul className='flex items-center space-x-1'>
              {navItems.map((item) => 
               item.active ? (
                <li key={item.name}>
                  <button
                  onClick={() => navigate(item.slug)}
                  className='px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-lg transition-all duration-200 font-medium relative overflow-hidden group'
                  >
                    <span className='relative z-10'>{item.name}</span>
                    <span className='absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left'></span>
                  </button>
                </li>
               ) : null
               )}
            </ul>

            {/* Auth Navigation */}
            <div className='flex items-center space-x-4'>
              {authItems.map((item) => 
               item.active ? (
                <li key={item.name}>
                  <button
                  onClick={() => navigate(item.slug)}
                  className='px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-lg transition-all duration-200 font-medium'
                  >
                    {item.name}
                  </button>
                </li>
               ) : null
               )}
              
              {authStatus && (
                <LogoutBtn />
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className='md:hidden p-2 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
            </svg>
          </button>
        </nav>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className='pt-4 pb-4 border-t border-gray-200/50 bg-white/50 backdrop-blur-sm rounded-b-lg'>
            <div className='space-y-4'>
              {/* Main Navigation */}
              <div>
                <h3 className='text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3'>Navigation</h3>
                <ul className='space-y-2'>
                  {navItems.map((item) => 
                   item.active ? (
                    <li key={item.name}>
                      <button
                      onClick={() => {
                        navigate(item.slug)
                        setIsMenuOpen(false)
                      }}
                      className='w-full text-left px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-lg transition-all duration-200 font-medium'
                      >{item.name}</button>
                    </li>
                   ) : null
                   )}
                </ul>
              </div>

              {/* Auth Navigation */}
              <div>
                <h3 className='text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3'>Account</h3>
                <ul className='space-y-2'>
                  {authItems.map((item) => 
                   item.active ? (
                    <li key={item.name}>
                      <button
                      onClick={() => {
                        navigate(item.slug)
                        setIsMenuOpen(false)
                      }}
                      className='w-full text-left px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-lg transition-all duration-200 font-medium'
                      >{item.name}</button>
                    </li>
                   ) : null
                   )}
                  
                  {authStatus && (
                    <li className='pt-2'>
                      <LogoutBtn />
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header