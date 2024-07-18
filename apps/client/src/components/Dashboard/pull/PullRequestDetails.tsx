import { cn } from "@/lib/utils";
import SelectPullRequest from "../SelectPullRequest";
import DetailsPR from "../DetailsPR";

const PullRequestDetails = ({ className }: { className?: string }) => {
  return (
    <div className={cn("",className)}>
      <SelectPullRequest />
      <DetailsPR />
    </div>
  );
};

export default PullRequestDetails;
