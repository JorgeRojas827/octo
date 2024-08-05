import React from "react";

const BubbleAnimation = () => {
  return (
    <React.Fragment>
      <div className="absolute w-40 h-40 md:w-80 md:h-80 bg-pink-600 filter blur-3xl rounded-full top-[30%] md:top-[-60%] -left-[10%] md:left-[10%] opacity-30 z-10 animate-blob animate-delay-2000"></div>
      <div className="absolute w-56 h-56 md:w-96 md:h-96 bg-purple-600 filter blur-3xl rounded-full top-[0%] md:top-[1%] left-[15%] md:left-[25%] opacity-30 z-10 animate-blob animate-delay-2000"></div>
      <div className="absolute w-20 h-20 md:w-60 md:h-60 bg-pink-600 filter blur-3xl rounded-full top-[-20%] md:top-[-30%] left-[30%] md:left-[40%] opacity-30 z-10 animate-blob animate-delay-4000"></div>
      <div className="absolute w-56 h-56 md:w-96 md:h-96 bg-purple-600 filter blur-3xl rounded-full top-[40%] md:top-[-70%] left-[40%] md:left-[50%] opacity-30 z-10 animate-blob animate-delay-4000"></div>
      <div className="absolute w-56 h-56 md:w-96 md:h-96 bg-pink-600 filter blur-3xl rounded-full top-[-11%] md:top-[1%] left-[55%] md:left-[65%] opacity-30 z-10 animate-blob animate-delay-6000"></div>
    </React.Fragment>
  );
};

export default BubbleAnimation;
