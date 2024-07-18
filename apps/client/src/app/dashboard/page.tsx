import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import DashboardOptions from "@/components/Dashboard/DashboardOptions";
import RepositoryMetrics from "@/components/Dashboard/RepositoryMetrics";
import Notauthorized from "@/components/Notauthorized";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@clerk/nextjs/server";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

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
