const PaginacaoServico = ({ totalPages, currentPage, handleBackPage, handleNextPage, onPageChange }) => {
    const generatePageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    return (
        <div className="flex items-center space-x-2 justify-center mt-8">
            <button
                onClick={handleBackPage}
                disabled={currentPage === 1}
                className={`disabled:bg-gray-100 disabled:text-gray-400 px-4 py-2 text-xl rounded-2xl bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 transition-colors ${currentPage === 1 ? 'cursor-not-allowed' : ''}`}
            >
                &lt;
            </button>

            {generatePageNumbers().map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => onPageChange(pageNumber)}
                    className={`px-4 py-2 text-xl rounded-2xl transition-colors ${pageNumber === currentPage ? 'bg-roseprimary text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                    {pageNumber}
                </button>
            ))}

            <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`disabled:bg-gray-100 disabled:text-gray-400 px-4 py-2 text-xl rounded-2xl bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 transition-colors ${currentPage === totalPages ? 'cursor-not-allowed' : ''}`}
            >
                &gt;
            </button>
        </div>
    )
}

export default PaginacaoServico;