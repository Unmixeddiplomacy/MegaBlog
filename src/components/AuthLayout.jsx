import {useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function Protected({children , authentication = true}) {

   const navigate = useNavigate()
   const location = useLocation()
   const [loader, setLoader] = useState(true)
   const authStatus = useSelector(state => state.auth.status)
   
   useEffect(() => {
      if(authentication && authStatus !== authentication){
        // Redirect to login if trying to access protected route
        navigate("/login", { state: { from: location.pathname } })
      }else if(!authentication && authStatus !== authentication){
        // Redirect to home if already authenticated and trying to access auth pages
        navigate("/home")
      }
      setLoader(false)
   }, [authStatus , navigate, authentication, location.pathname])
   
  return loader ? (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-3"></div>
        <p className="text-gray-600">Checking authentication...</p>
      </div>
    </div>
  ) : <>{children}</>
}

Protected.propTypes = {
  children: PropTypes.node.isRequired,
  authentication: PropTypes.bool
}

