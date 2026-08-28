import { useState } from 'react';

export default function GadgetForm({ onAddItem }) {
  const [formData, setFormData] = useState({
    gadget: '',
    category: 'Smartphone',
    manufacturer: '',
    healthRating: '',
    brand: '',
    role: 'Engineer',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let errs = {};
    if (!formData.gadget || formData.gadget.trim().length < 3) {
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

    onAddItem({
      id: Date.now(),
      ...formData,
      healthRating: Number(formData.healthRating),
    });

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

  return (
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
  );
}