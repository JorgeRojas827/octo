import { Badge } from "@/common/components/ui/badge";
import ButtonAI from "./ai-button";
import ReviewAI from "./review-ai";

const AIReview = () => {
  return (
    <div className="w-full bg-muted/50 min-h-[600px] p-4 rounded-md">
      <ButtonAI />
      <ReviewAI />
    </div>
  );
};

export default AIReview;
