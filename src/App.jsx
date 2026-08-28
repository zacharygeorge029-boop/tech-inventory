import { useState, useEffect } from 'react';
import GadgetForm from './components/GadgetForm';
import RegistryTable from './components/RegistryTable';
import ItemProfileCard from './components/ItemProfileCard';

export default function App() {
  const [items, setItems] = useState([
    { id: 1, gadget: 'iPhone 15 Pro', category: 'Smartphone', manufacturer: 'Apple', healthRating: 100, brand: 'Apple', role: 'Tester' },
    { id: 2, gadget: 'MacBook Pro M3', category: 'Laptop', manufacturer: 'Apple', healthRating: 98, brand: 'Apple', role: 'Engineer' },
    { id: 3, gadget: 'Apple Watch Ultra', category: 'Wearable', manufacturer: 'Apple', healthRating: 95, brand: 'Apple', role: 'Tester' },
    { id: 4, gadget: 'AirPods Max', category: 'Audio', manufacturer: 'Apple', healthRating: 92, brand: 'Apple', role: 'Engineer' },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [filterRole, setFilterRole] = useState('All');

  const handleAddItem = (newItem) => setItems((prev) => [newItem, ...prev]);

  useEffect(() => {
    if (selectedItem) {
      const match = items.find((i) => i.id === selectedItem.id);
      if (match && JSON.stringify(match) !== JSON.stringify(selectedItem)) setSelectedItem(match);
    }
  }, [items, selectedItem]);

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-6 md:p-12 font-sans selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-semibold tracking-tight mb-10 text-white">
          Tech Gadget & Inventory Hub
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8">
          <GadgetForm onAddItem={handleAddItem} />
          
          <div className="flex flex-col gap-8">
            <RegistryTable items={items} selectedItem={selectedItem} onSelectRow={setSelectedItem} filterRole={filterRole} onFilterChange={setFilterRole} />
            <ItemProfileCard selectedItem={selectedItem} />
          </div>
        </div>
      </div>
    </div>
  );
}