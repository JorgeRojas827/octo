import PullOverCards from "./PullOverCards";
import PullRequestAndAI from "./PullRequestAndAI";


const RepositoryMetrics = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <PullOverCards />
      <PullRequestAndAI />
    </div>
  );
};

export default RepositoryMetrics;
