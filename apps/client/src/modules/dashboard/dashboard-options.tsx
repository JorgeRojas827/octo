import { SelectRepositories } from "./components/select-repositories";
import { SelectBranches } from "./components/select-branches";

const DashboardOptions = () => {
  return (
    <div className="flex items-center gap-x-4 my-4">
      <SelectRepositories />
      <SelectBranches />
    </div>
  );
};

export default DashboardOptions;
