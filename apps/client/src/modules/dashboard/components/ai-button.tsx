/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { Badge } from "@/common/components/ui/badge";
import { useAIStore } from "../store/ai.store";
import { usePullRequestsStore } from "../store/pull-requests.store";
import { useRepositoriesStore } from "../store/repository.store";

const ButtonAI = () => {
  const { selectedRepo } = useRepositoriesStore();
  const { selectedNumberPR } = usePullRequestsStore();
  const { fetchAIReview } = useAIStore();

  return (
    <div className="flex w-full justify-between items-center mb-4">
      <button
        onClick={() => fetchAIReview(selectedRepo, selectedNumberPR)}
        className="px-4 py-4 bg-black rounded-lg leading-none flex items-center justify-between"
      >
        <span className="text-purple-600 group-hover:text-gray-100 transition duration-200 flex items-center">
          <svg
            className="w-4 h-4 fill-current text-white group-hover:text-gray-100 transition duration-200"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L22 20H2z" />
          </svg>
          <span className="ml-2">Ask AI to review PR</span>
        </span>
      </button>
      <Badge>
        It&apos;s that easy!
      </Badge>
    </div>
  );
};

export default ButtonAI;
