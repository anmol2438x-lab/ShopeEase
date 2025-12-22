import { FiAlertTriangle, FiHome, FiRefreshCw, FiMail } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const ErrorPage = ({ errorCode = "404", errorTitle = "Page Not Found", errorMessage = "Oops! The page you're looking for doesn't exist." }) => {
  const primaryColor = '#d51243';
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header with accent color */}
        <div 
          className="h-2 w-full"
          style={{ backgroundColor: primaryColor }}
        ></div>
        
        <div className="p-8 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div 
              className="p-4 rounded-full bg-red-50 flex items-center justify-center"
              style={{ color: primaryColor }}
            >
              <FiAlertTriangle size={48} />
            </div>
          </div>
          
          {/* Error Code */}
          <h1 
            className="text-7xl font-bold mb-2 tracking-tight"
            style={{ color: primaryColor }}
          >
            {errorCode}
          </h1>
          
          {/* Error Title */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {errorTitle}
          </h2>
          
          {/* Error Message */}
          <p className="text-gray-600 mb-8">
            {errorMessage}
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <NavLink to='/'>
              <button
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <FiHome size={18} />
                Go Home
              </button>
            </NavLink>
            
            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FiRefreshCw size={18} />
              Try Again
            </button>
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-8 py-4 bg-gray-50 text-center">
          <p className="text-gray-500 text-sm">
            Need help?{' '}
            <NavLink 
              to='/contact'
              className="flex items-center justify-center gap-1 text-gray-700 hover:text-gray-900"
              style={{ color: primaryColor }}
            >
              <FiMail size={14} />
              Contact support
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;