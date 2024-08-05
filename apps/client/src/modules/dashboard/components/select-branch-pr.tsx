"use client";

import { useEffect } from "react";
import { SelectBranches } from "./select-branches";
import { SelectPullRequest } from "./select-pull-request";
import { driverObject } from "@/lib/driver";
import { useTutorialStore } from "@/modules/tutorial/store";

const SelectBranchAndPR = () => {
  const { branchAndPRShown, changeShown } = useTutorialStore();

  useEffect(() => {
    if (branchAndPRShown === false) {
      driverObject.highlight({
        element: "#select-general",
        popover: {
          title: "Select Branch and Pull Request",
          description:
            "Select the branch and pull request to view the details.",
        },
      });

      changeShown("branchAndPRShown");
    }
  }, []);

  return (
    <div
      className="grid md:grid-cols-2 grid-cols-1 gap-4 my-4"
      id="select-general"
    >
      <SelectBranches />
      <SelectPullRequest />
    </div>
  );
};

export default SelectBranchAndPR;
