import MaxWidthWrapper from "@/common/components/utils/max-width-wrapper";
import DashboardHeader from "@/modules/dashboard/dashboard-header";
import RepositoryMetrics from "@/modules/dashboard/components/repository-metrics";
import DashboardOptions from "@/modules/dashboard/dashboard-options";
import { Separator } from "@/common/components/ui/separator";
import RepositoryName from "@/modules/dashboard/components/repository-name";

const page = async () => {
  return (
    <div className="w-full">
      <MaxWidthWrapper>
        <DashboardHeader />
        <Separator />
        <DashboardOptions />
      </MaxWidthWrapper>
    </div>
  );
};

export default page;
