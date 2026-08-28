import { useState } from 'react';

export default function GadgetForm({ onAddItem }) {
  const [formData, setFormData] = useState({ gadget: '', category: 'Smartphone', manufacturer: '', healthRating: '', brand: '', role: 'Engineer' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let errs = {};
    if (!formData.gadget || formData.gadget.trim().length < 3) errs.gadget = 'Min 3 characters.';
    if (!formData.manufacturer.trim()) errs.manufacturer = 'Required.';
    if (!formData.brand.trim()) errs.brand = 'Required.';
    const rating = Number(formData.healthRating);
    if (!formData.healthRating || isNaN(rating) || rating < 1 || rating > 100) errs.healthRating = '1-100 only.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onAddItem({ id: Date.now(), ...formData, healthRating: Number(formData.healthRating) });
    setFormData({ gadget: '', category: 'Smartphone', manufacturer: '', healthRating: '', brand: '', role: 'Engineer' });
    setErrors({});
  };

  const inputClass = "w-full bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm";
  const labelClass = "block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5";

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 lg:p-8 h-fit shadow-2xl">
      <h2 className="text-xl font-semibold mb-6 text-white tracking-tight">Add New Gadget</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className={labelClass}>Gadget Name</label>
          <input type="text" className={inputClass} value={formData.gadget} onChange={(e) => setFormData({ ...formData, gadget: e.target.value })} />
          {errors.gadget && <p className="text-red-400 text-xs mt-1">{errors.gadget}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Category</label>
            <select className={inputClass} value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Wearable">Wearable</option>
              <option value="Audio">Audio</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Health (1-100)</label>
            <input type="number" className={inputClass} value={formData.healthRating} onChange={(e) => setFormData({ ...formData, healthRating: e.target.value })} />
            {errors.healthRating && <p className="text-red-400 text-xs mt-1">{errors.healthRating}</p>}
          </div>
        </div>

        <div>
          <label className={labelClass}>Manufacturer</label>
          <input type="text" className={inputClass} value={formData.manufacturer} onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })} />
          {errors.manufacturer && <p className="text-red-400 text-xs mt-1">{errors.manufacturer}</p>}
        </div>

        <div>
          <label className={labelClass}>Brand Name</label>
          <input type="text" className={inputClass} value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} />
          {errors.brand && <p className="text-red-400 text-xs mt-1">{errors.brand}</p>}
        </div>

        <div>
          <label className={labelClass}>User Role</label>
          <div className="flex gap-6 mt-2">
            {['Engineer', 'Tester'].map(role => (
              <label key={role} className="flex items-center gap-2 cursor-pointer text-sm text-zinc-300">
                <input type="radio" name="role" value={role} checked={formData.role === role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="accent-blue-500 w-4 h-4" />
                {role}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="w-full bg-zinc-100 text-black font-semibold py-3 rounded-xl hover:bg-white transition-colors mt-2 text-sm">
          Add to Registry
        </button>
      </form>
    </div>
  );
}