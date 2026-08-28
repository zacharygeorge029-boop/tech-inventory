import { useState, useMemo } from 'react';

export default function RegistryTable({ items, selectedItem, onSelectRow, filterRole, onFilterChange }) {
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 3; 

  const filteredItems = useMemo(() => {
    if (filterRole === 'All') return items;
    return items.filter((item) => item.role === filterRole);
  }, [items, filterRole]);

  const pageCount = Math.ceil(filteredItems.length / pageSize) || 1;
  const paginatedItems = useMemo(() => {
    const start = pageIndex * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, pageIndex, pageSize]);

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-cyan-300">Registry Table View</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm">Filter Role:</span>
          <select
            className="bg-slate-700 border border-slate-600 rounded p-1 text-sm text-white"
            value={filterRole}
            onChange={(e) => {
              onFilterChange(e.target.value);
              setPageIndex(0); 
            }}
          >
            <option value="All">All Roles</option>
            <option value="Engineer">Engineer</option>
            <option value="Tester">Tester</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="p-2 text-slate-400 font-medium">Gadget Name</th>
              <th className="p-2 text-slate-400 font-medium">Category</th>
              <th className="p-2 text-slate-400 font-medium">Manufacturer</th>
              <th className="p-2 text-slate-400 font-medium">Health Rating</th>
              <th className="p-2 text-slate-400 font-medium">User Role</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item) => (
              <tr
                key={item.id}
                onClick={() => onSelectRow(item)}
                className={`border-b border-slate-700/50 cursor-pointer hover:bg-slate-700/50 transition ${
                  selectedItem?.id === item.id ? 'bg-slate-700' : ''
                }`}
              >
                <td className="p-2 font-medium text-white">{item.gadget}</td>
                <td className="p-2 text-slate-300">{item.category}</td>
                <td className="p-2 text-slate-300">{item.manufacturer}</td>
                <td className="p-2 text-cyan-400 font-semibold">{item.healthRating}</td>
                <td className="p-2 text-slate-300">{item.role}</td>
              </tr>
            ))}
            {paginatedItems.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-slate-400">
                  No records matching criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 pt-2 border-t border-slate-700">
        <button
          className="bg-slate-700 hover:bg-slate-600 disabled:opacity-50 px-3 py-1 rounded text-sm"
          onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
          disabled={pageIndex === 0}
        >
          Previous
        </button>
        <span className="text-xs text-slate-400">
          Page {pageIndex + 1} of {pageCount}
        </span>
        <button
          className="bg-slate-700 hover:bg-slate-600 disabled:opacity-50 px-3 py-1 rounded text-sm"
          onClick={() => setPageIndex((prev) => Math.min(prev + 1, pageCount - 1))}
          disabled={pageIndex >= pageCount - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}