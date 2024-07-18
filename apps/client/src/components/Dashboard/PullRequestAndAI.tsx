import AskAI from "./AskAI"
import PullRequestDetails from "./PullRequestDetails"

const PullRequestAndAI = () => {
  return (
    <div className="flex justify-around gap-4">
        <PullRequestDetails className="w-full md:w-1/3" />
        <AskAI className="w-full md:w-2/3" />
    </div>
  )
}

export default PullRequestAndAI