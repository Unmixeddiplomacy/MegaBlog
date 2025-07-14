import PropTypes from 'prop-types'

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    disabled = false,
    ...props
}) {
    const baseClasses = `px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`
    const enabledClasses = `${bgColor} ${textColor} hover:opacity-90 focus:ring-blue-500 active:scale-95 transform`
    const disabledClasses = `bg-gray-400 text-gray-600 cursor-not-allowed opacity-50`
    
    return (
        <button 
            type={type}
            className={`${baseClasses} ${disabled ? disabledClasses : enabledClasses}`} 
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool
}