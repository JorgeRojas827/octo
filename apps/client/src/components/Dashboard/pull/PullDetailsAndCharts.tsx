import TotalCommitsChart from "./TotalCommitsChart"
import PullRequestDetails from "./PullRequestDetails"
import TotalPullChart from "./TotalPullChart"

const PullDetailsAndCharts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PullRequestDetails className="col-span-1" />
        <TotalPullChart className="col-span-1" />
        <TotalCommitsChart className="col-span-1" />
    </div>
  )
}

export default PullDetailsAndCharts