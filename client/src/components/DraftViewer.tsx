import React from "react";
import Markdown from "react-markdown";
import { PageModel } from "../models/DraftModel";

interface DraftViewerProps {
  pages: Array<PageModel>;
  label?: string;
}

const DraftViewer: React.FC<DraftViewerProps> = ({ pages, label = "Draft Preview" }) => {
  pages.sort((a, b) => a.order - b.order);
  return (
    <div className="container max-w-7xl mx-auto py-8">
      <h2 className="text-4xl  text-center mb-8 text-gray-800 dark:text-white font-semibold">{label}</h2>
      <div className="page-list space-y-8 max-h-[40rem] overflow-y-auto rounded-lg">
        {pages.map((page, index) => (
          <div className="mde-preview rounded-lg shadow-xl p-8 bg-white dark:bg-gray-800" key={page.order}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Page {index + 1}</h3>
              {<span className="text-sm text-gray-600 dark:text-gray-400">Type: {page.type || "N/A"}</span>}
            </div>
            {/* <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              <p>Created At: {page.createdAt || "Not available"}</p>
              <p>Last Modified: {page.updatedAt || "Not available"}</p>
            </div> */}
            <div className="mde-preview-content prose max-w-none text-gray-800 dark:text-gray-200">
              <Markdown>{page.content || "_No content available._"}</Markdown>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DraftViewer;
