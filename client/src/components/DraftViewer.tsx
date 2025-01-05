import React from "react";
import Markdown from "react-markdown";
import { PageModel } from "../models/DraftModel";

interface DraftViewerProps {
  pages: Array<PageModel>;
  label?: string;
}

const DraftViewer: React.FC<DraftViewerProps> = ({ pages, label = "Draft Preview" }) => {
  return (
    <div className="container max-w-6xl mx-auto py-6 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">{label}</h2>
      <div className="page-list space-y-8 max-h-[40rem] overflow-y-auto rounded-lg">
        {pages.map((page) => (
          <div className="mde-preview rounded-lg shadow-lg p-6 bg-gray-100 dark:bg-gray-700" key={page.order}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold ">
                {/* Page {index + 1} (Order: {page.order}) */}
                Page {page.order}
              </h3>
              <span className="text-sm ">Type: {page.type || "N/A"}</span>
            </div>
            <div className="mde-preview-content prose max-w-none">
              <Markdown>{page.content || "_No content available._"}</Markdown>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DraftViewer;
