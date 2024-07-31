import { Badge } from "@/common/components/ui/badge";

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
