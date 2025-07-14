import React from 'react';
import {PostForm } from "../components"
import {Container } from "../components"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function AddPost() {
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate('/login');
    }
  }, [userData, navigate]);

  if (!userData) {
    return (
      <div className='w-full py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50'>
        <Container>
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Redirecting to login...</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className='w-full py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50'>
        <Container>
            <div className='mb-16 text-center'>
                <h1 className='text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 drop-shadow-2xl'>Create New Post</h1>
                <p className='text-gray-600 text-xl max-w-2xl mx-auto font-medium'>Share your thoughts, stories, and insights with the world</p>
            </div>
            <div className="max-w-3xl mx-auto bg-white/80 rounded-2xl shadow-2xl p-12 animate-fade-in-up">
                <PostForm />
            </div>
        </Container>
    </div>
  )
}

export default AddPost