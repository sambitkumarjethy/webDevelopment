function DataGridLoader({ columns }) {
  return (
    <>
      {Array.from({ length: 5 }).map((_, row) => (
        <tr key={row}>
          {Array.from({ length: columns }).map((_, col) => (
            <td key={col} className="px-4 py-3">
              <div className="h-4 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export default DataGridLoader;
