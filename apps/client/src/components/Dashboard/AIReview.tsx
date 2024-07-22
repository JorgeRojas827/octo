import { Badge } from "../ui/badge";

const AIReview = () => {
  return (
    <div className="relative w-full bg-muted/50 h-[600px] rounded-md">
      <div className="absolute top-0 left-0 m-4">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <button className="relative px-4 py-4 bg-black rounded-lg leading-none flex items-center justify-between divide-x divide-gray-600">
            <span className="text-indigo-400 group-hover:text-gray-100 transition duration-200 flex items-center">
              <svg
                className="w-4 h-4 fill-current text-white group-hover:text-gray-100 transition duration-200"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L22 20H2z" />
              </svg>
              <span className="ml-2">Ask AI to review PR</span>
            </span>
          </button>
        </div>
      </div>
      <div className="absolute top-0 right-0 m-4">
        <Badge>Is this easy!</Badge>
      </div>
    </div>
  );
};

export default AIReview;
