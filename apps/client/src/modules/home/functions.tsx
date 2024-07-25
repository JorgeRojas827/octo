import MaxWidthWrapper from "@/common/components/utils/max-width-wrapper";

const Functions = () => {
  return (
    <div className="w-full flex justify-center items-center my-40 md:my-0 md:h-screen">
      <MaxWidthWrapper className="flex flex-col justify-center items-center">
        <h4 className="text-6xl font-bold">How to use Octo:</h4>
        <section>
          <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
            <li className="md:flex-1">
              <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-purple-600">
                  Step 1
                </span>
                <span className="text-xl font-semibold">
                  Sign up for an account
                </span>
                <span className="mt-2 text-zinc-500">
                  Create an account with us to get started. It&apos;s free and
                  only takes a few seconds.
                </span>
              </div>
            </li>
            <li className="md:flex-1">
              <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-purple-600">
                  Step 2
                </span>
                <span className="text-xl font-semibold">
                  Select your repository
                </span>
                <span className="mt-2 text-zinc-500">
                  Choose the repository you want, select the branch and commit
                  you want to analyze.
                </span>
              </div>
            </li>
            <li className="md:flex-1">
              <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-purple-600">
                  Step 3
                </span>
                <span className="text-xl font-semibold">Ask AI to review</span>
                <span className="mt-2 text-zinc-500">
                  It&apos;s that simple. Try out Octo today - it really takes
                  less than a minute.
                </span>
              </div>
            </li>
          </ol>
        </section>
      </MaxWidthWrapper>
    </div>
  );
};

export default Functions;
