import { useState } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Plus, Trash2, MapPin, Tag, RefreshCw, Loader2 } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const AdminGallery = () => {
    const { gallery, addGalleryItem, deleteGalleryItem, syncGallery, isOnline } = useAdmin();
    const [newItem, setNewItem] = useState({
        url: '',
        title: '',
        location: '',
        category: 'Windows'
    });
    const [isAdding, setIsAdding] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newItem.url || !newItem.title) return;

        setIsSaving(true);
        try {
            await addGalleryItem(newItem);
            setNewItem({
                url: '',
                title: '',
                location: '',
                category: 'Windows'
            });
            setIsAdding(false);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Gallery Management</h1>
                    <p className="text-slate-500 mt-1">Manage the installations showcase on your homepage</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-xl shadow-lg hover:bg-secondary-dark transition-all"
                    >
                        {isAdding ? <Plus size={18} className="rotate-45" /> : <Plus size={18} />}
                        {isAdding ? 'Cancel' : 'Add New Installation'}
                    </button>
                </div>
            </div>

            {/* Add New Form */}
            {isAdding && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100"
                >
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-primary mb-2 uppercase tracking-wider">Image URL</label>
                                <input
                                    type="text"
                                    value={newItem.url}
                                    onChange={e => setNewItem({ ...newItem, url: e.target.value })}
                                    placeholder="https://images.unsplash.com/..."
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-primary mb-2 uppercase tracking-wider">Project Title</label>
                                <input
                                    type="text"
                                    value={newItem.title}
                                    onChange={e => setNewItem({ ...newItem, title: e.target.value })}
                                    placeholder="e.g. Modern Coastal Villa"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-secondary transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-primary mb-2 uppercase tracking-wider">Location</label>
                                <input
                                    type="text"
                                    value={newItem.location}
                                    onChange={e => setNewItem({ ...newItem, location: e.target.value })}
                                    placeholder="e.g. Auckland"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-secondary transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-primary mb-2 uppercase tracking-wider">Category</label>
                                <select
                                    value={newItem.category}
                                    onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-secondary transition-all appearance-none"
                                >
                                    <option>Windows</option>
                                    <option>Doors</option>
                                    <option>Modern</option>
                                    <option>Heritage</option>
                                </select>
                            </div>
                        </div>

                        <div className="md:col-span-2 pt-4">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-light transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        Saving to Database...
                                    </>
                                ) : (
                                    'Save Project to Gallery'
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {gallery.length > 0 ? (
                    gallery.map((item) => (
                        <div key={item._id || item.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100">
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img
                                    src={item.url}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button
                                        onClick={() => deleteGalleryItem(item._id || item.id)}
                                        className="p-2 bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600 transition-colors"
                                        title="Delete Item"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-widest rounded-full">
                                        {item.category}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-1">{item.title}</h3>
                                <div className="flex items-center text-slate-400 text-sm gap-1.5 font-medium">
                                    <MapPin size={14} className="text-secondary" />
                                    {item.location}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center bg-white rounded-[2rem] border-2 border-dashed border-slate-200">
                        <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ImageIcon className="text-slate-300" size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-primary">Your Gallery is Empty</h3>
                        <p className="text-slate-500 mt-2 mb-8">Start adding project photos to showcase your work.</p>
                        {!isAdding && (
                            <button
                                onClick={() => setIsAdding(true)}
                                className="bg-secondary text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
                            >
                                Add First Project
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminGallery;
