import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import useDebounce from "../../../hooks/useDebounce";

function DataGridToolbar({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const search = useDebounce(keyword);

  const handleChange = (e) => {
    const value = e.target.value;

    setKeyword(value);

    onSearch?.(value);
  };

  useEffect(() => {
    onSearch?.(search);
  }, [search]);

  return (
    <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-700">
      <div className="relative w-80">
        <FaSearch className="absolute left-3 top-3 text-slate-400" />

        <input
          value={keyword}
          onChange={handleChange}
          placeholder="Search..."
          className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-3 outline-none focus:border-emerald-500 dark:border-slate-600 dark:bg-slate-900"
        />
      </div>
    </div>
  );
}

export default DataGridToolbar;
