import { SelectRepositories } from "./components/select-repositories";
import { SelectBranches } from "./components/select-branches";
import { SelectPullRequest } from "./components/select-pull-request";

const DashboardOptions = () => {
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-4 my-4">
      <SelectRepositories />
      <SelectBranches />
      <SelectPullRequest />
    </div>
  );
};

export default DashboardOptions;
