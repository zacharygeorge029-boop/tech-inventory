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
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 lg:p-8 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white tracking-tight">Registry View</h2>
        <select className="bg-black border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-blue-500" value={filterRole} onChange={(e) => { onFilterChange(e.target.value); setPageIndex(0); }}>
          <option value="All">All Roles</option>
          <option value="Engineer">Engineer</option>
          <option value="Tester">Tester</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-zinc-800 text-zinc-500 uppercase tracking-wider text-xs">
              <th className="font-medium pb-3 px-2">Gadget</th>
              <th className="font-medium pb-3 px-2">Category</th>
              <th className="font-medium pb-3 px-2">Brand</th>
              <th className="font-medium pb-3 px-2">Rating</th>
              <th className="font-medium pb-3 px-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item) => (
              <tr key={item.id} onClick={() => onSelectRow(item)} className={`border-b border-zinc-800/50 cursor-pointer transition-colors ${selectedItem?.id === item.id ? 'bg-blue-500/10' : 'hover:bg-zinc-800/40'}`}>
                <td className="py-3 px-2 font-medium text-zinc-100">{item.gadget}</td>
                <td className="py-3 px-2 text-zinc-400">{item.category}</td>
                <td className="py-3 px-2 text-zinc-400">{item.brand}</td>
                <td className="py-3 px-2 text-blue-400 font-medium">{item.healthRating}%</td>
                <td className="py-3 px-2 text-zinc-400">{item.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6 pt-4 border-t border-zinc-800">
        <button className="bg-black border border-zinc-800 hover:border-zinc-700 disabled:opacity-50 px-4 py-1.5 rounded-lg text-xs font-medium transition-colors" onClick={() => setPageIndex((p) => Math.max(p - 1, 0))} disabled={pageIndex === 0}>
          Previous
        </button>
        <span className="text-xs text-zinc-500 font-medium">
          Page {pageIndex + 1} of {pageCount}
        </span>
        <button className="bg-black border border-zinc-800 hover:border-zinc-700 disabled:opacity-50 px-4 py-1.5 rounded-lg text-xs font-medium transition-colors" onClick={() => setPageIndex((p) => Math.min(p + 1, pageCount - 1))} disabled={pageIndex >= pageCount - 1}>
          Next
        </button>
      </div>
    </div>
  );
}