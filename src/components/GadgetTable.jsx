import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';

export default function GadgetTable({ data, selectedId, onSelect, roleFilter, setRoleFilter }) {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 4 });

  const filteredData = useMemo(() => {
    if (roleFilter === 'All') return data;
    return data.filter((item) => item.role === roleFilter);
  }, [data, roleFilter]);

  const columns = useMemo(
    () => [
      { accessorKey: 'name', header: 'Gadget Name' },
      { accessorKey: 'category', header: 'Category' },
      { accessorKey: 'brandName', header: 'Brand' },
      { accessorKey: 'manufacturer', header: 'Manufacturer' },
      { accessorKey: 'healthRating', header: 'Health Rating' },
      {
        accessorKey: 'role',
        header: 'Role',
        cell: (info) => (
          <span className={`px-2 py-0.5 text-xs rounded border ${
            info.getValue() === 'Engineer' 
              ? 'bg-blue-950 text-blue-400 border-blue-800' 
              : 'bg-purple-950 text-purple-400 border-purple-800'
          }`}>
            {info.getValue()}
          </span>
        )
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-100">Gadget Registry Table</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold uppercase">Filter Role:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-xs text-white p-1.5 rounded focus:outline-none"
          >
            <option value="All">All Roles</option>
            <option value="Engineer">Engineer</option>
            <option value="Tester">Tester</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto border border-slate-800 rounded-lg">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-slate-800 text-slate-300 border-b border-slate-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-3 font-semibold">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-800">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-slate-500">
                  No gadget records found.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => {
                const isSelected = row.original.id === selectedId;
                return (
                  <tr
                    key={row.id}
                    onClick={() => onSelect(row.original)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-slate-800/80 ring-1 ring-blue-500/50' : 'hover:bg-slate-800/40'
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-3 text-slate-300">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-slate-400">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}