import ButtonAI from "./ai-button";
import ReviewAI from "./review-ai";

const AIReview = () => {
  return (
    <div>
      <div className="md:hidden block">
        <ButtonAI />
      </div>
      <ReviewAI />
    </div>
  );
};

export default AIReview;
