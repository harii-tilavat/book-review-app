import { useEffect, useState } from "react";
import DraftList from "../../components/Drafts/DraftList";
import { useDraftManager } from "../../hooks/useDraftManger";
import { PaginationModel } from "../../models/PaginationModel";

const MyDraftsPages = () => {
  const { drafts, getAllDrafts,isLoading } = useDraftManager();
  const [pagination, setPagination] = useState<PaginationModel>(new PaginationModel());

  useEffect(() => {
    getAllDrafts(pagination);
  }, [pagination.page, pagination.itemsPerPage]);

  function handlePageChange(newPage: number) {
    setPagination((prevState) => ({ ...prevState, page: newPage }));
  }
  return (
    <div>
      <DraftList drafts={drafts} pagination={pagination} onPageChange={handlePageChange} isLoading={isLoading}/>
    </div>
  );
};

export default MyDraftsPages;
