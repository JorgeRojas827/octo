"use client";
import { SelectRepositories } from "./components/select-repositories";
import { SelectBranches } from "./components/select-branches";
import { SelectPullRequest } from "./components/select-pull-request";
import { CoffeeIcon } from "@/common/components/icons/coffee.icon";
import { useRepositoriesStore } from "./store/repository.store";

const DashboardOptions = () => {
  const { selectedRepo } = useRepositoriesStore();
  return (
    <div className="w-full">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 my-4">
        <SelectRepositories />
        <SelectBranches />
        <SelectPullRequest />
      </div>
      {!selectedRepo && (
        <div className="flex flex-col relative w-full mt-44 justify-center items-center">
          <CoffeeIcon />
          <div className="absolute flex flex-col justify-center items-center -bottom-10">
            <h6 className="md:text-2xl text-xl font-semibold">
              Start selecting a repository!
            </h6>
            <p className="md:text-sm text-xs text-muted-foreground">
              Or you can chill in this deep background...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardOptions;
