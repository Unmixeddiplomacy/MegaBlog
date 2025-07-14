import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import appwriteService from "../appwrite/config"
import { useState } from 'react'

function PostCard({$id, title, featuredImage, pending}) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Generate image URL only if featuredImage exists
  const imageUrl = featuredImage ? appwriteService.getFileView(featuredImage) : null;

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <Link to={`/post/${$id}`} className="block group h-full">
        <div className={`w-full h-full bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200/50 hover:border-blue-300/50 transform hover:-translate-y-2 flex flex-col relative overflow-hidden ${pending ? 'opacity-60 pointer-events-none' : ''}`}>
            {/* Gradient overlay on hover */}
            <div className='absolute inset-0 bg-gradient-to-br from-blue-50/0 to-indigo-50/0 group-hover:from-blue-50/30 group-hover:to-indigo-50/30 transition-all duration-300 pointer-events-none'></div>
            {pending && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                    <span className="text-blue-600 font-semibold">Uploading…</span>
                </div>
            )}
            <div className='w-full justify-center mb-4 overflow-hidden rounded-xl flex-shrink-0 relative bg-gray-100'>
                {/* Loading state */}
                {imageLoading && (
                    <div className="w-full h-48 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                )}
                {/* Image or fallback */}
                {!imageError && imageUrl ? (
                    <img 
                        src={imageUrl} 
                        alt={title} 
                        className={`w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 ${imageLoading ? 'hidden' : ''}`}
                        onError={handleImageError}
                        onLoad={handleImageLoad}
                    />
                ) : (
                    <div className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                        <div className="text-center">
                            <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-gray-500 text-sm">No image available</p>
                            {!featuredImage && (
                                <p className="text-xs text-gray-400 mt-1">No image ID</p>
                            )}
                        </div>
                    </div>
                )}
                {/* Image overlay gradient */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            </div>
            <div className="flex-1 flex flex-col relative z-10">
                <h2 className='text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 mb-3 flex-1'>
                  {title}
                </h2>
                <div className="mt-auto">
                    <div className="flex items-center text-sm text-gray-500 group-hover:text-blue-500 transition-colors duration-200">
                        <span className="inline-flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Read more
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </Link>
  )
}

PostCard.propTypes = {
  $id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  featuredImage: PropTypes.string,
  pending: PropTypes.bool
}

export default PostCard