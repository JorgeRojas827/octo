import MaxWidthWrapper from "@/common/components/utils/max-width-wrapper";
import Image from 'next/image';

const Functions = () => {
  return (
    <div className="w-full flex justify-center items-center my-48">
      <MaxWidthWrapper className="flex flex-col justify-center items-center">
        <h1 className="text-6xl font-bold mb-10 text-center">This is how Octa works:</h1>
        <div className="space-y-4 md:flex md:justify-center md:items-center md:gap-4">
          <div className="rounded-lg md:w-3/12">
            <Image src="/functionallity/signin.webp" alt="Sign in image" className="rounded-lg" layout="responsive" width={500} height={500}/>
          </div>
          <div className="rounded-lg md:w-6/12">
            <Image src="/functionallity/dashboard.webp" alt="Dashboard image" className="rounded-lg" layout="responsive" width={500} height={500}/>
          </div>
          <div className="rounded-lg md:w-3/12">
            <Image src="/functionallity/review.webp" alt="Review image" className="rounded-lg" layout="responsive" width={500} height={500}/>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Functions;
