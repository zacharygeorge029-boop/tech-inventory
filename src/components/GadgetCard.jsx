import { useState, useEffect } from 'react';

export default function GadgetCard({ selectedGadget }) {
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    if (selectedGadget) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveItem(selectedGadget);
    }
  }, [selectedGadget]);

  if (!activeItem) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-500 text-center">
        Select a gadget from the table to view details.
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Active Item Profile</span>
          <h3 className="text-2xl font-bold text-slate-100">{activeItem.name}</h3>
        </div>
        <span className={`px-3 py-1 text-xs font-bold rounded-full border ${
          activeItem.role === 'Engineer'
            ? 'bg-blue-950 text-blue-400 border-blue-800'
            : 'bg-purple-950 text-purple-400 border-purple-800'
        }`}>
          {activeItem.role}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm bg-slate-950 p-4 rounded-lg border border-slate-800/80">
        <div>
          <p className="text-xs text-slate-500">Category</p>
          <p className="font-semibold text-slate-200">{activeItem.category}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Tech Brand</p>
          <p className="font-semibold text-slate-200">{activeItem.brandName}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Manufacturer</p>
          <p className="font-semibold text-slate-200">{activeItem.manufacturer}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Health Rating</p>
          <p className={`font-semibold ${
            Number(activeItem.healthRating) >= 70 ? 'text-green-400' : 'text-amber-400'
          }`}>
            {activeItem.healthRating} / 100
          </p>
        </div>
      </div>
    </div>
  );
}