/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useAIStore } from "../store/ai.store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/common/components/ui/accordion";
import {
  CircleCheck,
  CircleMinus,
  CircleX,
  GhostIcon,
  Github,
  GitPullRequest,
} from "lucide-react";
import React, { useEffect } from "react";
import { usePullRequestsStore } from "../store/pull-requests.store";
import { TextGenerateEffect } from "@/common/components/ui/generated-text";
import { cn } from "@/lib/cn";

import ReviewContent from "./review-content";
import DiffViewer from "./diff-viewer";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/common/components/ui/tabs";
import { useToast } from "@/common/hooks/use-toaster";
import { convertFeedbackToMarkdown } from "@/common/helpers/transformers";
import { LoadingSpinner } from "@/common/components/ui/loading";

const ReviewAI = () => {
  const { aiReviews, aiLoading } = useAIStore();
  const { toast } = useToast();
  const {
    selectedNumberPR,
    submitPullRequestReview,
    submitPullRequestLoading,
    submitPullRequestSuccess,
  } = usePullRequestsStore();

  useEffect(() => {
    if (submitPullRequestSuccess)
      toast({
        title: "Pull request submitted",
        description: "Your review has been submitted successfully",
        variant: "default",
      });
  }, [submitPullRequestSuccess]);

  if (!selectedNumberPR) return;

  return (
    <React.Fragment>
      <div
        className={cn(
          "w-full border py-2 min-h-[450px] p-4 mt-24 md:mt-0 rounded-md",
          (aiLoading || !aiReviews) &&
            "items-center justify-center h-full !flex !flex-col"
        )}
      >
        <div className="grid grid-cols-1 gap-4">
          {aiLoading ? (
            <TextGenerateEffect
              aiLoading={aiLoading}
              className="mb-10 max-w-[450px]"
            />
          ) : aiReviews ? (
            <React.Fragment>
              <Accordion type="single" className="lg:hidden block" collapsible>
                {aiReviews?.map((review, index) => {
                  const goodPoints =
                    review.automatedReview.match(/👍/g)?.length || 0;
                  const badPoints =
                    review.automatedReview.match(/❌/g)?.length || 0;

                  return (
                    <AccordionItem
                      key={index}
                      value={truncatePath(review.filename, 3)}
                    >
                      <AccordionTrigger>
                        <span className="flex items-center text-sm gap-x-2">
                          {goodPoints == badPoints ? (
                            <CircleMinus
                              size={18}
                              className="text-yellow-500"
                            />
                          ) : goodPoints > badPoints ? (
                            <CircleCheck size={18} className="text-green-500" />
                          ) : (
                            <CircleX size={18} className="text-red-500" />
                          )}
                          {truncatePath(review.filename, 3)}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ReviewContent content={review.automatedReview} />
                        <DiffViewer changes={review.changes} />
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
              <Tabs
                defaultValue={truncatePath(aiReviews![0].filename, 2)}
                className="hidden w-full h-full lg:grid md:grid-cols-12 gap-x-2"
              >
                <TabsList className="w-full h-fit col-span-4 min-w-fit gap-y-2 flex flex-col bg-gray-200/5">
                  {aiReviews?.map((review, index) => {
                    const goodPoints =
                      review.automatedReview.match(/👍/g)?.length || 0;
                    const badPoints =
                      review.automatedReview.match(/❌/g)?.length || 0;
                    return (
                      <TabsTrigger
                        key={index}
                        value={truncatePath(review.filename, 2)}
                        className="w-full items-start justify-start hover:bg-black/20 data-[state=active]:bg-black/50"
                      >
                        <span className="text-left flex gap-x-2">
                          {goodPoints == badPoints ? (
                            <CircleMinus
                              size={18}
                              className="text-yellow-500"
                            />
                          ) : goodPoints > badPoints ? (
                            <CircleCheck size={18} className="text-green-500" />
                          ) : (
                            <CircleX size={18} className="text-red-500" />
                          )}
                          {truncatePath(review.filename, 2)}
                        </span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
                {aiReviews?.map((review, index) => (
                  <TabsContent
                    key={index}
                    value={truncatePath(review.filename, 2)}
                    className="w-full col-span-8 my-0 p-5 py-0"
                  >
                    <div>
                      <div className="border flex justify-between bg-opacity-50 rounded-md p-4 mb-4">
                        <span className="flex items-center text-sm gap-x-2">
                          <GitPullRequest size={20} />
                          Generated review
                        </span>
                        <div
                          onClick={() =>
                            submitPullRequestReview(
                              convertFeedbackToMarkdown(review.automatedReview),
                              review.filename,
                              review.changes
                            )
                          }
                          className="text-xs rounded-md bg-white flex space-x-2 text-black p-3 py-1.5 cursor-pointer font-semibold"
                        >
                          {submitPullRequestLoading ? (
                            <LoadingSpinner />
                          ) : (
                            <Github size={16} />
                          )}

                          <span>Publish on GitHub</span>
                        </div>
                      </div>
                      <ReviewContent content={review.automatedReview} />
                    </div>
                    <DiffViewer changes={review.changes} />
                  </TabsContent>
                ))}
              </Tabs>
            </React.Fragment>
          ) : (
            <div className="flex flex-col space-y-1 justify-center items-center w-full h-full">
              <GhostIcon size={24} className="mr-2 opacity-50" />
              <span className="text-lg font-semibold opacity-50">
                Ask AI to review your pull request
              </span>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

function truncatePath(path: string, values: number): string {
  const parts = path.split("/");
  if (parts.length <= values) {
    return path;
  }

  const truncatedParts = parts.slice(-values);
  return "./" + truncatedParts.join("/");
}

export default ReviewAI;
