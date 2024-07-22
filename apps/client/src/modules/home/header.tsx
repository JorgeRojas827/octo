import MaxWidthWrapper from "@/common/components/utils/max-width-wrapper";

const Header = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <MaxWidthWrapper className="relative flex flex-col items-center justify-center">
        <div className="relative z-20 flex flex-col items-center justify-center">
          <h1 className="text-7xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            AI Powered Code Review
          </h1>
          <h2 className="text-4xl font-bold  ">
            Analyze metrics + Provide Insights + Optimize Future PRs
          </h2>
          <p className="text-center text-lg px-44">
            Octo is a PR automation system that streamlines software development
            workflows. It helps teams efficiently manage and track pull
            requests, ensuring seamless integration and high code quality.
          </p>
        </div>
        <div className="absolute w-80 h-80 bg-pink-600 filter blur-3xl rounded-full top-[-60%] left-[10%] opacity-50 z-10 animate-blob animate-delay-2000"></div>
        <div className="absolute w-96 h-96 bg-purple-600 filter blur-3xl rounded-full top-[1%] left-[25%] opacity-50 z-10 animate-blob animate-delay-2000"></div>
        <div className="absolute w-60 h-60 bg-pink-600 filter blur-3xl rounded-full top-[-30%] left-[40%] opacity-50 z-10 animate-blob animate-delay-4000"></div>
        <div className="absolute w-96 h-96 bg-purple-600 filter blur-3xl rounded-full top-[-70%] left-[50%] opacity-50 z-10 animate-blob animate-delay-4000"></div>
        <div className="absolute w-96 h-96 bg-pink-600 filter blur-3xl rounded-full top-[1%] left-[65%] opacity-50 z-10 animate-blob animate-delay-6000"></div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Header;
