import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/common/components/ui/accordion";
import { File } from "lucide-react";
import React from "react";

interface DiffViewerProps {
  changes: string;
}

const DiffViewer: React.FC<DiffViewerProps> = ({ changes }) => {
  const renderDiff = (diff: string) => {
    if (!diff) {
      return (
        <div className="text-gray-500">
          This file does not have a programming language associated with it.
        </div>
      );
    }

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
    <Accordion
      type="single"
      defaultValue="changes"
      className="mt-5"
      collapsible
    >
      <AccordionItem value="changes">
        <AccordionTrigger className=" border bg-opacity-50 rounded-md px-5">
          <span className="flex items-center text-sm gap-x-2">
            <File size={16} />
            File changes
          </span>
        </AccordionTrigger>
        <AccordionContent className="mt-5">
          <div className="bg-opacity-50 bg-gray-900 border rounded-md p-4 text-xs md:my-0 my-4 font-mono">
            {renderDiff(changes)}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DiffViewer;
