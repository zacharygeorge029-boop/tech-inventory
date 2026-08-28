export default function ItemProfileCard({ selectedItem }) {
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md">
      <h2 className="text-xl font-semibold mb-2 text-cyan-300">Active Item Profile</h2>
      {selectedItem ? (
        <div className="space-y-3">
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
          <div className="pt-2 border-t border-slate-700">
            <span className="text-sm text-slate-400">Health Rating: </span>
            <span className="text-lg font-bold text-cyan-400">{selectedItem.healthRating}/100</span>
          </div>
        </div>
      ) : (
        <p className="text-slate-400 italic">Click any row in the table above to view details.</p>
      )}
    </div>
  );
}