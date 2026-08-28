import { useState, useEffect } from 'react';
import GadgetForm from './components/GadgetForm';
import RegistryTable from './components/RegistryTable';
import ItemProfileCard from './components/ItemProfileCard';

export default function App() {
  const [items, setItems] = useState([
    { id: 1, gadget: 'iPhone 15', category: 'Smartphone', manufacturer: 'Apple', healthRating: 95, brand: 'Apple Inc.', role: 'Tester' },
    { id: 2, gadget: 'Galaxy Book 4', category: 'Laptop', manufacturer: 'Samsung', healthRating: 88, brand: 'Samsung Electronics', role: 'Engineer' },
    { id: 3, gadget: 'Apple Watch S9', category: 'Wearable', manufacturer: 'Apple', healthRating: 90, brand: 'Apple Inc.', role: 'Tester' },
    { id: 4, gadget: 'Sony WH-1000XM5', category: 'Audio', manufacturer: 'Sony', healthRating: 92, brand: 'Sony Corp', role: 'Engineer' },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [filterRole, setFilterRole] = useState('All');

  const handleAddItem = (newItem) => {
    setItems((prev) => [newItem, ...prev]);
  };

  // Phase 3 Requirement: Sync selection if items update
  useEffect(() => {
    if (!selectedItem) return;
    const match = items.find((i) => i.id === selectedItem.id);
    if (match && match !== selectedItem) {
      setSelectedItem(match);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center text-cyan-400">
        Tech Gadget & Inventory Hub (Set C)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <GadgetForm onAddItem={handleAddItem} />

        <div className="lg:col-span-2 space-y-6">
          <RegistryTable
            items={items}
            selectedItem={selectedItem}
            onSelectRow={setSelectedItem}
            filterRole={filterRole}
            onFilterChange={setFilterRole}
          />

          <ItemProfileCard selectedItem={selectedItem} />
        </div>
      </div>
    </div>
  );
}