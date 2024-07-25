"use client";

import { useAIStore } from "../store/ai.store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/common/components/ui/accordion";
import { FileCheckIcon } from "lucide-react";
import TextFormatter from "./TextFormatter";
import React from "react";
import { usePullRequestsStore } from "../store/pull-requests.store";

const ReviewAI = () => {
  const { aiReviews, aiLoading } = useAIStore();
  const { selectedNumberPR } = usePullRequestsStore();

  if (!selectedNumberPR) return;

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
    <React.Fragment>
      <div className="w-full bg-muted/50 min-h-[450px] p-4 mt-24 rounded-md">
        <div className="grid grid-cols-1 gap-4">
          <Accordion type="single" collapsible>
            {aiReviews?.map((review) => (
              <AccordionItem key={review.filename} value={review.filename}>
                <AccordionTrigger>
                  <span className="flex items-center gap-x-2">
                    <FileCheckIcon size={18} className="text-purple-600" />
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
      </div>
    </React.Fragment>
  );
};

export default ReviewAI;
