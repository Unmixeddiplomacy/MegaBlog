import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50'>
        <Container>
            <div className='max-w-3xl mx-auto bg-white/80 rounded-2xl shadow-2xl p-12 animate-fade-in-up'>
                <PostForm post={post} />
            </div>
        </Container>
    </div>
  ) : null
}

export default EditPost