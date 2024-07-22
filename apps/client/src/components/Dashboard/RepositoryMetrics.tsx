import AIReview from "./AIReview";
import PullDetailsAndCharts from "./pull/PullDetailsAndCharts";
import OverviewCards from "./pull/OverviewCards";

const RepositoryMetrics = () => {
  return (
    <div className="w-full flex flex-col gap-4 mb-20">
      <OverviewCards />
      <PullDetailsAndCharts />
      <AIReview />
    </div>
  );
};

export default RepositoryMetrics;
