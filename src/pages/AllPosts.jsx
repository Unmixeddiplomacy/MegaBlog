import React from 'react';
import {useEffect} from 'react'
import {Container, PostCard} from '../components/index'
import appwriteService from "../appwrite/config"
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../store/postsSlice';

function AllPosts() {
    const posts = useSelector(state => state.posts.items);
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    useEffect(() => {
        setLoading(true)
        appwriteService.getPosts([])
            .then((posts) => {
                if(posts){
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
            <div className="w-full py-20">
                <Container>
                    <div className="flex justify-center items-center min-h-[400px]">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600 text-lg">Loading posts...</p>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    if (error) {
        return (
            <div className="w-full py-20">
                <Container>
                    <div className="max-w-md mx-auto">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
                            <div className="flex items-center justify-center mb-4">
                                <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <h1 className="text-xl font-bold text-red-800 mb-2">Error Loading Posts</h1>
                            <p className="text-red-600 mb-4">{error}</p>
                            <button 
                                onClick={() => window.location.reload()}
                                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50'>
            <Container>
                <div className='mb-16 text-center'>
                    <h1 className='text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 drop-shadow-2xl'>All Posts</h1>
                    <p className='text-gray-600 text-xl max-w-2xl mx-auto font-medium'>Browse through all published content from our amazing community of writers</p>
                </div>
                {posts.length === 0 ? (
                    <div className="text-center max-w-2xl mx-auto animate-fade-in-up">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-2xl p-16 shadow-2xl">
                            <div className="flex items-center justify-center mb-8">
                                <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-blue-800 mb-4">
                                No Posts Available
                            </h2>
                            <p className="text-blue-600 mb-6 text-lg">
                                There are no posts published yet. Be the first to create amazing content!
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 animate-fade-in-up'>
                        {posts.map((post) => (
                            <div key={post.$id} className='w-full animate-fade-in-up'>
                                <PostCard {...post} pending={post.pending} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    )
}

export default AllPosts