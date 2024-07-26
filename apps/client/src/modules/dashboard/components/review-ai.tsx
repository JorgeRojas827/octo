"use client";

import { useAIStore } from "../store/ai.store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/common/components/ui/accordion";
import { CircleCheck, CircleX, FileCheckIcon } from "lucide-react";
import TextFormatter from "./review-content";
import React from "react";
import { usePullRequestsStore } from "../store/pull-requests.store";
import { TextGenerateEffect } from "@/common/components/ui/generated-text";
import { cn } from "@/lib/cn";
import ReviewContent from "./review-content";
import DiffViewer from "./diff-viewer";

const ReviewAI = () => {
  const { aiReviews, aiLoading } = useAIStore();
  const { selectedNumberPR } = usePullRequestsStore();

  if (!selectedNumberPR) return;

  return (
    <React.Fragment>
      <div
        className={cn(
          "w-full border py-2 min-h-[450px] p-4 mt-24 rounded-md",
          aiLoading && "items-center justify-center h-full !flex !flex-col"
        )}
      >
        <div className={cn("grid grid-cols-1 gap-4")}>
          {aiLoading ? (
            <TextGenerateEffect
              aiLoading={aiLoading}
              className="mb-5 max-w-[450px]"
            />
          ) : (
            <Accordion type="single" collapsible>
              {aiReviews?.map((review, index) => {
                const goodPoints =
                  review.automatedReview.match(/👍/g)?.length || 0;
                const badPoints =
                  review.automatedReview.match(/❌/g)?.length || 0;
                return (
                  <AccordionItem
                    key={index}
                    value={truncatePath(review.filename)}
                  >
                    <AccordionTrigger>
                      <span className="flex items-center text-sm gap-x-2">
                        {goodPoints > badPoints ? (
                          <CircleCheck size={18} className="text-green-700" />
                        ) : (
                          <CircleX size={18} className="text-red-700" />
                        )}
                        {truncatePath(review.filename)}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <DiffViewer changes={review.changes} />
                      <ReviewContent content={review.automatedReview} />
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

function truncatePath(path: string): string {
  const parts = path.split("/");
  if (parts.length <= 3) {
    return path;
  }

  const truncatedParts = parts.slice(-3);
  return "../" + truncatedParts.join("/");
}

export default ReviewAI;
