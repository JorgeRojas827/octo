import AIReview from "./ai-review";
import PullDetailsAndCharts from "./pull/pull-details-and-charts";
import OverviewCards from "./pull/overview-cards";
import DetailsPR from "./details-pr";

const RepositoryMetrics = () => {
  return (
    <div className="w-full flex flex-col gap-4 mb-20">
      <OverviewCards />
      <PullDetailsAndCharts />
      <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-12">
        <div className="md:col-span-4">
          <DetailsPR />
        </div>
        <div className="md:col-span-8">
          <AIReview />
        </div>
      </div>
    </div>
  );
};

export default RepositoryMetrics;
