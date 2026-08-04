import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import DataGridLoader from "./DataGridLoader";
import DataGridEmpty from "./DataGridEmpty";
import DataGridToolbar from "./DataGridToolbar";
import DataGridPagination from "./DataGridPagination";

function DataGrid({
  columns = [],
  data = [],
  loading = false,

  page = 1,
  pageSize = 10,
  totalRows = 0,

  onPageChange,
  onPageSizeChange,
  onSearch,
}) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <DataGridToolbar onSearch={onSearch} />

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-100 dark:bg-slate-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-100"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {loading ? (
              <DataGridLoader columns={columns.length} />
            ) : table.getRowModel().rows.length === 0 ? (
              <DataGridEmpty columns={columns.length} />
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <DataGridPagination
        page={page}
        pageSize={pageSize}
        totalRows={totalRows}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}

export default DataGrid;
