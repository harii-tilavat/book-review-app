import React from "react";
import { PageModel } from "../../models/DraftModel";
import MDEditor from "@uiw/react-md-editor";

interface DraftViewerProps {
  pages: Array<PageModel>;
  label?: string;
}

const DraftViewer: React.FC<DraftViewerProps> = ({ pages, label = "Draft Preview" }) => {
  pages.sort((a, b) => a.order - b.order);
  // Variable to track content pages
  const titleContentPages = pages.filter((page) => page.type !== "CONTENT");
  return (
    <div className="container max-w-7xl mx-auto py-8">
      <h2 className="text-4xl  text-center mb-8 text-gray-800 dark:text-white font-semibold ">{label}</h2>
      <div className="page-list space-y-8 max-h-[50rem] overflow-y-auto rounded-lg shadow">
        {pages.map((page, index) => (
          <div className="page-preview rounded-lg shadow-xl p-8 bg-white dark:bg-gray-800" id={"page" + (index + 1)}>
            <div className="flex items-center justify-center mb-6">
              {page.type === "CONTENT" && <h3 className="text-md font-semibold text-gray-900 dark:text-gray-400">Page {index - titleContentPages.length + 1}</h3>}
              {page.type !== "CONTENT" && <span className="text-lg font-semibold text-gray-600 dark:text-gray-200">{page.type || "N/A"} PAGE</span>}
            </div>
            <div className=" max-w-none text-gray-800 dark:text-gray-200">
              <MDEditor.Markdown className="p-6 rounded-lg !bg-gray-900" source={page.content || "_No content available._"} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DraftViewer;
