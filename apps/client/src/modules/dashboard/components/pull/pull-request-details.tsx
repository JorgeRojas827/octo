import { cn } from "@/lib/cn";
import SelectPullRequest from "../select-pull-request";
import DetailsPR from "../details-pr";

const PullRequestDetails = ({ className }: { className?: string }) => {
  return (
    <div className={cn("", className)}>
      <SelectPullRequest />
      <DetailsPR />
    </div>
  );
};

export default PullRequestDetails;
