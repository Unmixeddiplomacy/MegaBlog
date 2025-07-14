import {useState} from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const {register, handleSubmit, formState: { errors, isSubmitting }} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentuser()
                if(userData) dispatch(authLogin(userData));
                // Redirect to the page they were trying to access, or home
                const from = location.state?.from || "/home"
                navigate(from, { replace: true })
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
        <div className='max-w-md w-full space-y-8 bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 transform hover:scale-105 transition-all duration-300'>
            <div className="text-center">
                <div className="mx-auto h-16 w-16 flex items-center justify-center mb-4">
                    <Logo width="100%" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
                <p className="text-gray-600">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                    >
                        Sign up for free
                    </Link>
                </p>
            </div>
            
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 animate-pulse">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                </div>
            )}
            
            <form onSubmit={handleSubmit(login)} className='space-y-6'>
                <div>
                    <Input
                    label="Email address"
                    placeholder="Enter your email"
                    type="email"
                    error={errors.email?.message}
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                        }
                    })}
                    />
                </div>
                
                <div>
                    <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    error={errors.password?.message}
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                        }
                    })}
                    />
                </div>
                
                <Button
                type="submit"
                className="w-full py-3 text-lg font-medium transform hover:scale-105 transition-all duration-200"
                disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Signing in...
                        </div>
                    ) : 'Sign in'}
                </Button>
            </form>
        </div>
    </div>
  )
}

export default Login