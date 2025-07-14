import React from 'react';
import {useEffect} from 'react'
import appwriteService from "../appwrite/config"
import { Container,PostCard } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import { setPosts } from '../store/postsSlice'
import { useNavigate } from 'react-router-dom'

function Home() {
    const posts = useSelector(state => state.posts.items)
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        appwriteService.getPosts()
            .then((posts) => {
                if (posts) {
                    dispatch(setPosts(posts.documents))
                }
            })
            .catch((err) => {
                setError(err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [dispatch])
  
    if (loading) {
        return (
            <div className="w-full flex items-center justify-center py-20">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading amazing content...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="w-full flex items-center justify-center px-4 py-20">
                <div className="max-w-md w-full">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
                        <div className="flex items-center justify-center mb-4">
                            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h1 className="text-xl font-bold text-red-800 mb-2">
                            Oops! Something went wrong
                        </h1>
                        <p className="text-red-600 mb-4">{error}</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-24 lg:py-40 w-full overflow-hidden shadow-2xl rounded-b-3xl animate-fade-in">
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-600/20"></div>
                <Container>
                    <div className="relative z-10 text-center max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight tracking-tight drop-shadow-2xl">
                            Welcome to{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 animate-gradient-x">
                                MegaBlog
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-10 text-blue-100 leading-relaxed font-medium">
                            Discover amazing stories, share your thoughts, and connect with a community of writers and readers
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            {!posts.length && authStatus && (
                                <button 
                                    onClick={() => navigate('/add-post')}
                                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-10 py-4 rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 transform hover:scale-110 font-semibold text-xl shadow-2xl border-2 border-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-200"
                                >
                                    Create Your First Post
                                </button>
                            )}
                            {!authStatus && (
                                <>
                                    <button 
                                        onClick={() => navigate('/signup')}
                                        className="bg-white text-blue-600 px-10 py-4 rounded-xl hover:bg-gray-100 transition-all duration-200 transform hover:scale-110 font-semibold text-xl shadow-2xl border-2 border-blue-200 focus:outline-none focus:ring-4 focus:ring-blue-100"
                                    >
                                        Get Started
                                    </button>
                                    <button 
                                        onClick={() => navigate('/login')}
                                        className="border-2 border-white text-white px-10 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200 transform hover:scale-110 font-semibold text-xl focus:outline-none focus:ring-4 focus:ring-blue-200"
                                    >
                                        Sign In
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Content Section */}
            <section className="py-20 lg:py-32 w-full animate-fade-in-up">
                <Container>
                    {posts && posts.length === 0 ? (
                        <div className="text-center max-w-2xl mx-auto">
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-lg p-12 shadow-lg">
                                <div className="flex items-center justify-center mb-6">
                                    <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-bold text-blue-800 mb-4">
                                    Be the First to Share
                                </h2>
                                <p className="text-blue-600 mb-6 text-lg">
                                    No posts available yet. Be the first to create amazing content and share your stories with the world!
                                </p>
                                {authStatus && (
                                    <button 
                                        onClick={() => navigate('/add-post')}
                                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 font-semibold text-lg shadow-lg"
                                    >
                                        Create Your First Post
                                    </button>
                                )}
                                {!authStatus && (
                                    <button 
                                        onClick={() => navigate('/signup')}
                                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 font-semibold text-lg shadow-lg"
                                    >
                                        Join and Start Writing
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <>
                            {posts.length === 1 && (
                                <div className="text-center mb-8 animate-fade-in-up">
                                    <div className="inline-block bg-green-100 text-green-800 px-6 py-3 rounded-full shadow font-semibold text-lg">
                                        🎉 Congratulations on your first post!
                                    </div>
                                </div>
                            )}
                            <div className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 drop-shadow-lg">Latest Posts</h2>
                                <p className="text-gray-600 text-xl max-w-2xl mx-auto font-medium">
                                    Discover amazing stories and insights from our community of writers
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fade-in-up">
                                {posts.map((post) => (
                                    <div key={post.$id} className="w-full animate-fade-in-up">
                                        <PostCard {...post} pending={post.pending} />
                                    </div>
                                ))}
                            </div>
                            {authStatus && posts.length > 0 && (
                                <div className="text-center mt-16">
                                    <button 
                                        onClick={() => navigate('/add-post')}
                                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 font-semibold text-lg shadow-lg"
                                    >
                                        Create New Post
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </Container>
            </section>

            {/* Features Section */}
            <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50/30 w-full animate-fade-in-up">
                <Container>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold text-gray-800 mb-4 drop-shadow-lg">Why Choose MegaBlog?</h2>
                        <p className="text-gray-600 text-xl max-w-2xl mx-auto font-medium">
                            Experience the best blogging platform with powerful features and beautiful design
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Easy to Use</h3>
                            <p className="text-gray-600">Create beautiful posts with our intuitive editor and user-friendly interface</p>
                        </div>
                        <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Fast & Responsive</h3>
                            <p className="text-gray-600">Lightning-fast performance and responsive design that works on all devices</p>
                        </div>
                        <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Community Driven</h3>
                            <p className="text-gray-600">Connect with writers and readers from around the world in our growing community</p>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    )
}

export default Home