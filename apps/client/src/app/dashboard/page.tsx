import { Separator } from "@radix-ui/react-select";

import MaxWidthWrapper from "@/common/components/utils/max-width-wrapper";
import DashboardHeader from "@/modules/dashboard/dashboard-header";
import RepositoryMetrics from "@/modules/dashboard/components/repository-metrics";
import DashboardOptions from "@/modules/dashboard/dashboard-options";

const page = async () => {
  return (
    <div className="w-full">
      <MaxWidthWrapper>
        <DashboardHeader />
        <Separator />
        <DashboardOptions />
        <h3 className="text-xl font-semibold mb-4">
          Repository Metrics / Overview
        </h3>
        <RepositoryMetrics />
      </MaxWidthWrapper>
    </div>
  );
};

export default page;
