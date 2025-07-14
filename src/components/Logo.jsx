import PropTypes from 'prop-types'

function Logo({width = '100px'}) {
  return (
    <div className="flex items-center justify-center">
      <span 
        className="font-bold text-blue-600 tracking-tight leading-none" 
        style={{
          fontSize: width,
          fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif"
        }}
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
          Mega
        </span>
        <span className="text-blue-600">
          Blog
        </span>
      </span>
    </div>
  )
}

Logo.propTypes = {
  width: PropTypes.string
}

export default Logo