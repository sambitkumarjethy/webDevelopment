function DataGridPagination({
  page,
  pageSize,
  totalRows,
  onPageChange,
  onPageSizeChange,
}) {
  const totalPages = Math.ceil(totalRows / pageSize);

  return (
    <div className="flex items-center justify-between border-t border-slate-200 p-4 dark:border-slate-700">
      <div className="text-sm text-slate-600 dark:text-slate-300">
        Total Records : {totalRows}
      </div>

      <div className="flex items-center gap-3">
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="rounded border px-2 py-1"
        >
          <option>10</option>
          <option>20</option>
          <option>50</option>
        </select>

        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded border px-3 py-1"
        >
          Previous
        </button>

        <span>
          {page} / {totalPages || 1}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="rounded border px-3 py-1"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default DataGridPagination;
