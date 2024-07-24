"use client";

import { useAIStore } from "../store/ai.store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/common/components/ui/accordion";
import { FileBadgeIcon } from "lucide-react";
import TextFormatter from "./TextFormatter";

const ReviewAI = () => {
  const { aiReviews, aiLoading } = useAIStore();

  if (aiLoading) {
    return (
      <div className="text-center text-lg font-semibold text-gray-500">
        Loading...
      </div>
    );
  }

  if (!aiLoading && (!aiReviews || aiReviews.length === 0)) {
    return (
      <div className="text-center text-lg font-semibold text-gray-500">
        No reviews yet
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      <Accordion type="single" collapsible>
        {aiReviews?.map((review) => (
          <AccordionItem key={review.filename} value={review.filename}>
            <AccordionTrigger>
              <span className="flex items-center gap-x-2">
                <FileBadgeIcon size={18} className="text-purple-600" />
                {review.filename}
              </span>
            </AccordionTrigger>
            <AccordionContent>
                <TextFormatter text={review.automatedReview} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ReviewAI;
