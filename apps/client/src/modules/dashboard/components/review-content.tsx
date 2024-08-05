import React from "react";

const ReviewContent: React.FC<{ content: string }> = ({ content }) => {
  const sections = content
    .split("\n\n")
    .filter((section) => section.trim() !== "");

  return (
    <div className="space-y-4 px-3">
      {sections.map((section, index) => {
        const [title, ...points] = section
          .replaceAll(/👍/g, "•")
          .replaceAll(/❌/g, "•")
          .split("\n");

        return (
          <div key={index} className="space-y-2">
            <h4 className="font-medium">
              {title
                .replaceAll(/\*/g, "")
                .replaceAll(/\#/g, "")
                .replaceAll("PR Review", "")}
            </h4>
            <ul className="font-light text-sm space-y-1">
              {points.map((point, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="mr-2">{point.slice(0, 2)}</span>
                  <span>{point.slice(2).trim()}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewContent;
