import React, {useId} from 'react'
import PropTypes from 'prop-types'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    error,
    ...props
}, ref){
    const id = useId()
    return(
        <div className='w-full'>
            {label && <label 
            className='block text-sm font-medium text-gray-700 mb-2' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-4 py-3 rounded-lg bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent duration-200 border w-full transition-all shadow-sm ${
                error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 hover:border-gray-400'
            } ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    {typeof error === 'object' && error.message ? error.message : String(error)}
                </p>
            )}
        </div>
    )
})

Input.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ])
}

export default Input