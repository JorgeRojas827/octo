import MaxWidthWrapper from "@/common/components/utils/max-width-wrapper";
import GetStartedButton from "./components/get-started";
import BubbleAnimation from "./components/bubble-animation";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <MaxWidthWrapper className="relative flex flex-col items-center justify-center">
        <div className="z-20 flex flex-col items-center justify-center gap-y-4 md:gap-0">
          <h1 className="text-6xl  md:text-8xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            AI Powered Code Review
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold">
            Analyze metrics / Provide Insights / Optimize Future PRs
          </h2>
          <p className="md:text-center text-sm md:text-base md:px-30 lg:px-44 md:mt-4">
            Octo is a PR automation system that streamlines software development
            workflows.
            <span className="hidden sm:block">
              It helps teams efficiently manage and track pull requests,
              ensuring seamless integration and high code quality.
            </span>
          </p>
          <GetStartedButton>
            Get Started <ArrowRight size={24} className="ml-2 font-bold" />
          </GetStartedButton>
        </div>
        <BubbleAnimation />
      </MaxWidthWrapper>
    </div>
  );
};

export default Hero;
