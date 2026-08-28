import React, { useState, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';

export default function App() {
  // Initial Mock Data
  const [items, setItems] = useState([
    { id: 1, gadget: 'iPhone 15', category: 'Smartphone', manufacturer: 'Apple', healthRating: 95, brand: 'Apple Inc.', role: 'Tester' },
    { id: 2, gadget: 'Galaxy Book 4', category: 'Laptop', manufacturer: 'Samsung', healthRating: 88, brand: 'Samsung Electronics', role: 'Engineer' },
    { id: 3, gadget: 'Apple Watch S9', category: 'Wearable', manufacturer: 'Apple', healthRating: 90, brand: 'Apple Inc.', role: 'Tester' },
    { id: 4, gadget: 'Sony WH-1000XM5', category: 'Audio', manufacturer: 'Sony', healthRating: 92, brand: 'Sony Corp', role: 'Engineer' },
  ]);

  // Form State
  const [formData, setFormData] = useState({
    gadget: '',
    category: 'Smartphone',
    manufacturer: '',
    healthRating: '',
    brand: '',
    role: 'Engineer',
  });

  const [errors, setErrors] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterRole, setFilterRole] = useState('All');

  // Form Validation (Phase 1)
  const validate = () => {
    let errs = {};
    if (!formData.gadget || formData.gadget.length < 3) {
      errs.gadget = 'Gadget Name must be at least 3 characters.';
    }
    if (!formData.manufacturer.trim()) {
      errs.manufacturer = 'Manufacturer is required.';
    }
    if (!formData.brand.trim()) {
      errs.brand = 'Tech Brand Name is required.';
    }
    const rating = Number(formData.healthRating);
    if (!formData.healthRating || isNaN(rating) || rating < 1 || rating > 100) {
      errs.healthRating = 'Health Rating must be a number between 1 and 100.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newItem = {
      id: Date.now(),
      ...formData,
      healthRating: Number(formData.healthRating),
    };

    setItems((prev) => [newItem, ...prev]);

    // Reset Form
    setFormData({
      gadget: '',
      category: 'Smartphone',
      manufacturer: '',
      healthRating: '',
      brand: '',
      role: 'Engineer',
    });
    setErrors({});
  };

  // Filtered Table Data
  const filteredData = React.useMemo(() => {
    if (filterRole === 'All') return items;
    return items.filter((item) => item.role === filterRole);
  }, [items, filterRole]);

  // TanStack Table Setup (Phase 2)
  const columns = React.useMemo(
    () => [
      { accessorKey: 'gadget', header: 'Gadget Name' },
      { accessorKey: 'category', header: 'Category' },
      { accessorKey: 'manufacturer', header: 'Manufacturer' },
      { accessorKey: 'healthRating', header: 'Health Rating' },
      { accessorKey: 'role', header: 'User Role' },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 3 } }, // Set page size 3-5
  });

  // Active Item Sync via useEffect (Phase 3)
  const handleRowClick = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    // Keep active selection in sync if items change
    if (selectedItem) {
      const updated = items.find((i) => i.id === selectedItem.id);
      if (updated) setSelectedItem(updated);
    }
  }, [items]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center text-cyan-400">
        Tech Gadget & Inventory Hub (Set C)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* PHASE 1: FORM */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-cyan-300">Add New Gadget</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Gadget Name</label>
              <input
                type="text"
                className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white"
                value={formData.gadget}
                onChange={(e) => setFormData({ ...formData, gadget: e.target.value })}
              />
              {errors.gadget && <p className="text-red-400 text-xs mt-1">{errors.gadget}</p>}
            </div>

            <div>
              <label className="block text-sm mb-1">Category</label>
              <select
                className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Smartphone">Smartphone</option>
                <option value="Laptop">Laptop</option>
                <option value="Wearable">Wearable</option>
                <option value="Audio">Audio</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1">Manufacturer</label>
              <input
                type="text"
                className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white"
                value={formData.manufacturer}
                onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
              />
              {errors.manufacturer && <p className="text-red-400 text-xs mt-1">{errors.manufacturer}</p>}
            </div>

            <div>
              <label className="block text-sm mb-1">Health Rating (1-100)</label>
              <input
                type="number"
                className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white"
                value={formData.healthRating}
                onChange={(e) => setFormData({ ...formData, healthRating: e.target.value })}
              />
              {errors.healthRating && <p className="text-red-400 text-xs mt-1">{errors.healthRating}</p>}
            </div>

            <div>
              <label className="block text-sm mb-1">Tech Brand Name</label>
              <input
                type="text"
                className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              />
              {errors.brand && <p className="text-red-400 text-xs mt-1">{errors.brand}</p>}
            </div>

            <div>
              <label className="block text-sm mb-1">User Role</label>
              <div className="flex gap-4 mt-1">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="Engineer"
                    checked={formData.role === 'Engineer'}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                  Engineer
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="Tester"
                    checked={formData.role === 'Tester'}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                  Tester
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-500 font-semibold py-2 rounded transition"
            >
              Add Item to Registry
            </button>
          </form>
        </div>

        {/* PHASE 2 & 3: TABLE & DISPLAY */}
        <div className="lg:col-span-2 space-y-6">
          {/* Table & Controls */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-cyan-300">Registry Table View</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm">Filter Role:</span>
                <select
                  className="bg-slate-700 border border-slate-600 rounded p-1 text-sm text-white"
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                >
                  <option value="All">All Roles</option>
                  <option value="Engineer">Engineer</option>
                  <option value="Tester">Tester</option>
                </select>
              </div>
            </div>

            <table className="w-full text-left border-collapse">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="border-b border-slate-700">
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="p-2 text-slate-400 font-medium">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => handleRowClick(row.original)}
                    className={`border-b border-slate-700/50 cursor-pointer hover:bg-slate-700/50 transition ${
                      selectedItem?.id === row.original.id ? 'bg-slate-700' : ''
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-2">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4 pt-2 border-t border-slate-700">
              <button
                className="bg-slate-700 hover:bg-slate-600 disabled:opacity-50 px-3 py-1 rounded text-sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </button>
              <span className="text-xs text-slate-400">
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </span>
              <button
                className="bg-slate-700 hover:bg-slate-600 disabled:opacity-50 px-3 py-1 rounded text-sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </button>
            </div>
          </div>

          {/* PHASE 3: ACTIVE DETAIL CARD */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-cyan-300">Active Item Profile</h2>
            {selectedItem ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">{selectedItem.gadget}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedItem.role === 'Engineer'
                        ? 'bg-purple-900 text-purple-300 border border-purple-500'
                        : 'bg-emerald-900 text-emerald-300 border border-emerald-500'
                    }`}
                  >
                    Role: {selectedItem.role}
                  </span>
                </div>
                <p className="text-slate-400 text-sm">
                  Category: <span className="text-white">{selectedItem.category}</span>
                </p>
                <p className="text-slate-400 text-sm">
                  Manufacturer: <span className="text-white">{selectedItem.manufacturer}</span>
                </p>
                <p className="text-slate-400 text-sm">
                  Tech Brand: <span className="text-white">{selectedItem.brand}</span>
                </p>
                <div className="mt-2">
                  <span className="text-sm text-slate-400">Health Rating: </span>
                  <span className="text-lg font-bold text-cyan-400">{selectedItem.healthRating}/100</span>
                </div>
              </div>
            ) : (
              <p className="text-slate-400 italic">Click any row in the table above to view details.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}