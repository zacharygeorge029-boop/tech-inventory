export default function ItemProfileCard({ selectedItem }) {
  return (
    <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
      <h2 className="text-xl font-semibold mb-6 text-white tracking-tight">Active Profile</h2>
      {selectedItem ? (
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-3xl font-semibold tracking-tight text-white">{selectedItem.gadget}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                selectedItem.role === 'Engineer' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
              }`}>
              {selectedItem.role}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-black/50 p-4 rounded-2xl border border-zinc-800/50">
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Details</p>
              <p className="text-sm text-zinc-300">{selectedItem.category}</p>
              <p className="text-sm text-zinc-300">{selectedItem.manufacturer}</p>
            </div>
            <div className="bg-black/50 p-4 rounded-2xl border border-zinc-800/50 flex flex-col justify-center items-center">
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Health</p>
              <p className="text-3xl font-semibold text-blue-400 tracking-tight">{selectedItem.healthRating}<span className="text-lg text-blue-500/50">%</span></p>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-32 flex items-center justify-center border-2 border-dashed border-zinc-800 rounded-2xl">
          <p className="text-zinc-500 text-sm font-medium">Select an item from the registry</p>
        </div>
      )}
    </div>
  );
}