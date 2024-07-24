import TotalCommitsChart from "./total-commits-chart";
import PullRequestDetails from "./pull-request-details";
import TotalPullChart from "./total-pull-chart";
import { TimePullChart } from "./time-pull-chart";

const PullDetailsAndCharts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-1">
        <TimePullChart />
      </div>
      <TotalPullChart className="col-span-1" />
      <TotalCommitsChart className="col-span-1" />
    </div>
  );
};

export default PullDetailsAndCharts;
