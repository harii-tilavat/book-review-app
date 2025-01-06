import React, { useState } from "react";
import { PageModel } from "../../models/DraftModel";
import { XMarkIcon } from "@heroicons/react/16/solid";
import MDEditor from "@uiw/react-md-editor";

interface MarkdownEditorProps {
  page: PageModel;
  onDeletePage: (order: number) => void;
  onUpdatePageContent: (order: number, value: string) => void;
}
const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ page, onDeletePage, onUpdatePageContent }) => {
  return (
    <div className="p-6 rounded-lg shadow-md dark:bg-gray-900 dark:text-white bg-gray-50 text-gray-900">
      <div className="page-header flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold dark:text-gray-100 text-gray-800 ">
          {page.type} Page #{page.order}
        </h3>
        <button onClick={() => onDeletePage(page.order)} className="text-red-400 hover:text-red-600 transition" title="Delete Page">
          <XMarkIcon className="h-8 w-8 " />
        </button>
      </div>
      <div className="editor">
        <MDEditor value={page.content} onChange={(value) => onUpdatePageContent(page.order, value || "")} preview="edit" className="!bg-white dark:!bg-gray-900"/>
      </div>
    </div>
  );
};

export default MarkdownEditor;
