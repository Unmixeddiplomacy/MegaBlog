
import { useState , useEffect } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import {login , logout } from "./store/authSlice"
import {Footer} from "./components";
import {Header} from "./components";
import { Outlet, useLocation } from 'react-router-dom'

function App() {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect (() => {
    authService.getCurrentuser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .catch((error) => {
      console.error("Auth initialization error:", error);
      dispatch(logout())
    })
    .finally(() => setLoading(false))
  },[dispatch])

  // Check if current route is auth page
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return !loading ? (
    <div className='min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden'>
      {/* Background gradient overlay */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-indigo-600/5 pointer-events-none'></div>
      
      {/* Header - Show on all pages except auth pages */}
      {!isAuthPage && (
        <div className='relative z-10'>
          <Header />
        </div>
      )}
      
      {/* Main Content */}
      <main className={`flex-1 w-full relative z-10 ${!isAuthPage ? 'pt-0' : 'pt-0'}`}>
        <Outlet /> 
      </main>
      
      {/* Footer - Show on all pages except auth pages */}
      {!isAuthPage && (
        <div className='relative z-10 mt-auto'>
          <Footer />
        </div>
      )}
    </div>
  ) : (
    <div className='min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden'>
      {/* Background gradient overlay */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-indigo-600/5 pointer-events-none'></div>
      
      <div className='text-center relative z-10'>
        <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4'></div>
        <p className='text-gray-600 text-lg font-medium'>Loading MegaBlog...</p>
      </div>
    </div>
  )
}

export default App
