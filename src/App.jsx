import { useState } from 'react';
import GadgetForm from './components/GadgetForm';
import GadgetTable from './components/GadgetTable';
import GadgetCard from './components/GadgetCard';

export default function App() {
  const [gadgets, setGadgets] = useState([
    {
      id: 1,
      name: 'MacBook Pro M3',
      category: 'Laptop',
      manufacturer: 'Apple Inc.',
      healthRating: '98',
      brandName: 'Apple',
      role: 'Engineer'
    },
    {
      id: 2,
      name: 'Galaxy Watch 6',
      category: 'Wearable',
      manufacturer: 'Samsung Electronics',
      healthRating: '85',
      brandName: 'Samsung',
      role: 'Tester'
    }
  ]);

  const [selectedGadget, setSelectedGadget] = useState(null);
  const [roleFilter, setRoleFilter] = useState('All');

  const handleAddGadget = (newGadget) => {
    setGadgets((prev) => [newGadget, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans">
      <header className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Tech Gadget & Inventory Hub</h1>
        <p className="text-sm text-slate-400 mt-1">Set C Midterm Assessment Project</p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <GadgetForm onAddGadget={handleAddGadget} />
        </div>

        <div className="lg:col-span-2 space-y-8">
          <GadgetTable
            data={gadgets}
            selectedId={selectedGadget?.id}
            onSelect={setSelectedGadget}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
          />
          <GadgetCard selectedGadget={selectedGadget} />
        </div>
      </main>
    </div>
  );
}