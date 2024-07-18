import TotalCommitsChart from "./TotalCommitsChart"
import TotalPullChart from "./TotalPullChart"

const PullCharts = () => {
  return (
    <div className="flex justify-around">
        <TotalPullChart />
        <TotalCommitsChart />
    </div>
  )
}

export default PullCharts