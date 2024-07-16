import MaxWidthWrapper from "../MaxWidthWrapper";

const Header = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <MaxWidthWrapper className="flex flex-col items-center justify-center">
        <div className="relative z-20 flex flex-col items-center justify-center">
          <h1 className="text-7xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            AI Powered Code Review
          </h1>
          <h2 className="text-4xl font-bold  ">
            Analyze metrics{" "}
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              +
            </span>{" "}
            Provide Insights{" "}
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              +
            </span>{" "}
            Optimize Future PRs
          </h2>
          <p className="text-center text-lg px-20">
            Octo is a PR automation system that streamlines software development
            workflows. It helps teams efficiently manage and track pull
            requests, ensuring seamless integration and high code quality.
          </p>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Header;
