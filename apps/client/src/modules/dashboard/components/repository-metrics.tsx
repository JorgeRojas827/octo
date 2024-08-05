import PullDetailsAndCharts from "./pull/pull-details-and-charts";
import OverviewCards from "./pull/overview-cards";

const RepositoryMetrics = () => {
  return (
    <div className="w-full flex flex-col gap-4 mb-20">
      <OverviewCards />
      <PullDetailsAndCharts />
    </div>
  );
};

export default RepositoryMetrics;
