import { useEffect, useState } from "react";

const usePagination = (data, itensPerPage) => {
  const [actualPage, setActualPage] = useState(1);
  const totalPages = Math.ceil(data.length / itensPerPage);

  const handleBackPage = () => {
    setActualPage((prevState) => prevState - 1);
  };

  const handleNextPage = () => {
    setActualPage((prevState) => prevState + 1);
  };

  const getItemsPage = () => {
    const firstIndex = (actualPage - 1) * itensPerPage;
    const lastIndex = actualPage * itensPerPage;

    return data.slice(firstIndex, lastIndex);
  };

  useEffect(() => {
    setActualPage(1);
  }, [data]);

  return {
    actualPage,
    totalPages,
    handleBackPage,
    handleNextPage,
    getItemsPage,
    setActualPage
  };
};

export default usePagination;
