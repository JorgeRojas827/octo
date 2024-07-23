import { GitBranch, GitCommitVertical, Users2Icon } from "lucide-react";

const DetailsPR = () => {
  let thereAreDetails = true;

  return (
    <div className="w-full border mt-4 rounded-md p-3 flex flex-col h- items-stretch">
      <div>
        <h3 className="text-xl font-semibold">Pull Request</h3>
        <p className="text-sm opacity-50">Opened 2 days ago</p>
      </div>

      {thereAreDetails ? (
        <div className="mt-8 space-y-4">
          <h4 className="text-xl font-semibold">Pull Request Details</h4>
          <section className="flex items-center gap-x-4">
            <GitBranch size={24} />
            <div>
              <p className="text-lg font-semibold">feature/branch-name</p>
              <p className="text-sm">Base branch: develop</p>
            </div>
          </section>
          <section className="flex items-center gap-x-4">
            <GitCommitVertical size={24} />
            <div>
              <p className="text-lg font-semibold">3 commits</p>
              <p className="text-sm">Last commit 1 day ago</p>
            </div>
          </section>
          <section className="flex items-center gap-x-4">
            <Users2Icon size={24} />
            <div>
              <p className="text-lg font-semibold">2 reviewers</p>
              <p className="text-sm">Olivia Smith, Noah Williams</p>
            </div>
          </section>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          <p className="text-sm opacity-50">No details available</p>
        </div>
      )}
    </div>
  );
};

export default DetailsPR;
