import PullCharts from "./PullCharts";
import PullOverCards from "./PullOverCards";
import PullRequestAndAI from "./PullRequestAndAI";


const RepositoryMetrics = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <PullOverCards />
      <PullRequestAndAI />
      <PullCharts />
    </div>
  );
};

export default RepositoryMetrics;
