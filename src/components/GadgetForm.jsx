import { useState } from 'react';

const INITIAL_FORM = {
  name: '',
  category: 'Smartphone',
  manufacturer: '',
  healthRating: '',
  brandName: '',
  role: 'Engineer'
};

export default function GadgetForm({ onAddGadget }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (formData.name.trim().length < 3) {
      newErrors.name = 'Gadget name must be at least 3 characters.';
    }
    if (!formData.manufacturer.trim()) {
      newErrors.manufacturer = 'Manufacturer is required.';
    }
    if (!formData.brandName.trim()) {
      newErrors.brandName = 'Tech Brand Name is required.';
    }
    const rating = Number(formData.healthRating);
    if (!formData.healthRating || rating < 1 || rating > 100) {
      newErrors.healthRating = 'Health Rating must be a number between 1 and 100.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onAddGadget({ ...formData, id: Date.now() });
    setFormData(INITIAL_FORM);
    setErrors({});
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-slate-900 border border-slate-800 text-white rounded-xl shadow-lg space-y-4">
      <h2 className="text-xl font-bold text-slate-100">Register Tech Gadget</h2>
      
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Gadget Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2.5 rounded bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
          placeholder="e.g. Galaxy S24 Ultra"
        />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2.5 rounded bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="Smartphone">Smartphone</option>
            <option value="Laptop">Laptop</option>
            <option value="Wearable">Wearable</option>
            <option value="Audio">Audio</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Health Rating (1-100)</label>
          <input
            type="number"
            name="healthRating"
            value={formData.healthRating}
            onChange={handleChange}
            className="w-full p-2.5 rounded bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
            placeholder="e.g. 95"
          />
          {errors.healthRating && <p className="text-red-400 text-xs mt-1">{errors.healthRating}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Manufacturer</label>
          <input
            type="text"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            className="w-full p-2.5 rounded bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
            placeholder="e.g. Samsung Electronics"
          />
          {errors.manufacturer && <p className="text-red-400 text-xs mt-1">{errors.manufacturer}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Tech Brand Name</label>
          <input
            type="text"
            name="brandName"
            value={formData.brandName}
            onChange={handleChange}
            className="w-full p-2.5 rounded bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
            placeholder="e.g. Samsung"
          />
          {errors.brandName && <p className="text-red-400 text-xs mt-1">{errors.brandName}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">User Role</label>
        <div className="flex gap-6">
          {['Engineer', 'Tester'].map((r) => (
            <label key={r} className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="radio"
                name="role"
                value={r}
                checked={formData.role === r}
                onChange={handleChange}
                className="accent-blue-500 w-4 h-4"
              />
              <span>{r}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded transition-colors text-sm"
      >
        Add Gadget to Registry
      </button>
    </form>
  );
}