import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50">
            <Container>
                <div className="w-full flex justify-center mb-8 relative border rounded-2xl p-4 bg-white/80 shadow-2xl animate-fade-in-up">
                    <img
                        src={appwriteService.getFileView(post.featuredImage)}
                        alt={post.title}
                        className="rounded-2xl max-h-96 object-cover shadow-lg"
                    />
                    {isAuthor && (
                        <div className="absolute right-8 top-8 flex gap-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-4 drop-shadow-2xl">{post.title}</h1>
                </div>
                <div className="browser-css bg-white/70 rounded-xl p-8 shadow animate-fade-in-up">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}