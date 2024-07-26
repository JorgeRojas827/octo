import React from "react";

interface DiffViewerProps {
  changes: string;
}

const DiffViewer: React.FC<DiffViewerProps> = ({ changes }) => {
  const renderDiff = (diff: string) => {
    return diff.split("\n").map((line, index) => {
      if (line.startsWith("@@")) {
        return (
          <div key={index} className="font-bold text-gray-700">
            {line}
          </div>
        );
      }
      if (line.startsWith("-")) {
        return (
          <div key={index} className="text-red-500">
            {line}
          </div>
        );
      }
      if (line.startsWith("+")) {
        return (
          <div key={index} className="text-green-500">
            {line}
          </div>
        );
      }
      return;
    });
  };

  return (
    <div className="bg-opacity-50 bg-gray-900 border rounded-md p-4 my-4 font-mono">
      {renderDiff(changes)}
    </div>
  );
};

export default DiffViewer;
