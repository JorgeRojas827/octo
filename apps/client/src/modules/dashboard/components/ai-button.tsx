/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React from "react";
import { useAIStore } from "../store/ai.store";
import { usePullRequestsStore } from "../store/pull-requests.store";
import { useRepositoriesStore } from "../store/repository.store";

const ButtonAI = () => {
  const { selectedRepo } = useRepositoriesStore();
  const { selectedNumberPR } = usePullRequestsStore();
  const { fetchAIReview, aiLoading } = useAIStore();

  return (
    <React.Fragment>
      {selectedNumberPR && (
        <div className="flex w-full justify-between relative items-center md:mb-0 mb-4">
          <div className="absolute top-0 left-0 md:m-0 m-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-700 to-purple-700 rounded-lg blur opacity-90 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <button
                onClick={() => fetchAIReview(selectedRepo, selectedNumberPR)}
                disabled={aiLoading}
                className="relative px-4 py-4 bg-black rounded-lg leading-none flex items-center justify-between divide-x divide-gray-600"
              >
                <span className="transition duration-200 flex items-center">
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
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ButtonAI;
