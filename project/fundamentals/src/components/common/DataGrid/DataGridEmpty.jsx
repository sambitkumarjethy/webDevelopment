function DataGridEmpty({ columns }) {
  return (
    <tr>
      <td colSpan={columns} className="py-10 text-center text-slate-500">
        No records found.
      </td>
    </tr>
  );
}

export default DataGridEmpty;
