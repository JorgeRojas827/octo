import { useEffect } from "react";

import { useTutorialStore } from "@/modules/tutorial/store";

import DetailsPR from "./details-pr";
import AIReview from "./ai-review";
import { driverObject } from "@/lib/driver";
import { useBranchesStore } from "../store/branch.store";
import { usePullRequestsStore } from "../store/pull-requests.store";

const GeneralDetails = () => {
  const { changeShown, detailsShown } = useTutorialStore();
  const { selectedBranch } = useBranchesStore();
  const { selectedPR } = usePullRequestsStore();

  useEffect(() => {
    if (detailsShown === false && selectedBranch && selectedPR) {
      driverObject.highlight({
        element: "#general-details",
        popover: {
          title: "Pull Request Details",
          description:
            "Here you can see the details of the selected pull request and ask for a review from the AI.",
          align: "center",
          side: "top",
        },
      });

      changeShown("detailsShown");
    }
  }, [selectedPR]);

  return (
    <div
      className="w-full grid grid-cols-1 gap-4 md:grid-cols-1 mb-5"
      id="general-details"
    >
      <DetailsPR />
      <div className="lg:hidden block">
        <AIReview />
      </div>
    </div>
  );
};

export default GeneralDetails;
