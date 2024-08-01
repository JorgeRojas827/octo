"use client";
import { SelectRepositories } from "./components/select-repositories";
import { SelectBranches } from "./components/select-branches";
import { SelectPullRequest } from "./components/select-pull-request";
import { CoffeeIcon } from "@/common/components/icons/coffee.icon";
import { useRepositoriesStore } from "./store/repository.store";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/common/components/ui/tabs";
import RepositoryName from "./components/repository-name";
import RepositoryMetrics from "./components/repository-metrics";
import AIReview from "./components/ai-review";
import DetailsPR from "./components/details-pr";

const DashboardOptions = () => {
  const { selectedRepo } = useRepositoriesStore();
  return (
    <div className="w-full">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 my-4">
        <SelectRepositories />
        <div className="invisible">
          <SelectBranches />
        </div>
      </div>
      {selectedRepo && (
        <Tabs defaultValue="metrics" className="w-full">
          <TabsList className="w-full gap-x-2 bg-gray-200/10">
            <TabsTrigger value="metrics" className="w-1/2 hover:bg-black/15">
              Metrics
            </TabsTrigger>
            <TabsTrigger value="reviewer" className="w-1/2 hover:bg-black/15">
              AI Reviewer
            </TabsTrigger>
          </TabsList>
          <TabsContent value="metrics" className="w-full">
            <RepositoryName />
            <RepositoryMetrics />
          </TabsContent>
          <TabsContent value="reviewer">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 my-4">
              <SelectBranches />
              <SelectPullRequest />
            </div>
            <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-1 mb-5">
              <DetailsPR />
              <div className="lg:hidden block">
                <AIReview />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}
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
