import { Link } from "react-router-dom";
import "./Error.css";

export const Error = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-500 bg-fixed bg-cover bg-bottom error-bg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-gray-50 text-center">
          {/* Error Number */}
          <div className="relative">
            <h1 className="relative text-8xl lg:text-9xl tracking-tighter-less text-shadow font-sans font-bold">
              <span>4</span>
              <span>0</span>
              <span>4</span>
            </h1>
            <span className="absolute top-0 -ml-20 md:-ml-28 lg:-ml-36 text-gray-300 font-semibold text-2xl md:text-3xl">
              Oops!
            </span>
          </div>

          {/* Page Not Found Text */}
          <h5 className="text-gray-300 font-semibold text-lg md:text-xl mt-3">
            Page not found
          </h5>
          <p className="text-gray-100 mt-2 mb-6 text-sm md:text-base px-4">
            The page you're looking for doesn't exist. Please check the URL or
            return to the homepage.
          </p>

          {/* Go to Home Button */}
          <Link
            to="/"
            className="bg-btnPrimary px-5 py-3 text-sm md:text-base shadow-sm font-medium tracking-wider text-gray-50 rounded-full hover:shadow-lg"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
