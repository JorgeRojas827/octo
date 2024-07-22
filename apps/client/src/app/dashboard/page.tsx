import { currentUser } from "@clerk/nextjs/server";
import { Separator } from "@radix-ui/react-select";

import MaxWidthWrapper from "@/common/components/utils/max-width-wrapper";
import Notauthorized from "@/common/components/utils/not-authorized";
import DashboardHeader from "@/modules/dashboard/dashboard-header";
import RepositoryMetrics from "@/modules/dashboard/components/repository-metrics";
import DashboardOptions from "@/modules/dashboard/dashboard-options";

const page = async () => {
  const user = await currentUser();

  if (!user) {
    return <Notauthorized />;
  }

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
