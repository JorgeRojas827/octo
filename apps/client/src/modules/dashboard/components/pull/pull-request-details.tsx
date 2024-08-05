"use client";
import { cn } from "@/lib/cn";
import DetailsPR from "../details-pr";
import { useRepositoriesStore } from "../../store/repository.store";
import React from "react";

const PullRequestDetails = ({ className }: { className?: string }) => {
  const { selectedRepo } = useRepositoriesStore();
  return (
    <div className={cn(className)}>
      {selectedRepo && (
        <React.Fragment>
          <DetailsPR />
        </React.Fragment>
      )}
    </div>
  );
};

export default PullRequestDetails;
