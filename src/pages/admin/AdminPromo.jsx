import { useState } from 'react';
import { Save, Eye, Tag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAdmin } from '../../context/AdminContext';

const AdminPromo = () => {
    const { promo, updatePromo } = useAdmin();
    const [formData, setFormData] = useState(promo);
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
        updatePromo(formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-primary">Promo Section</h1>
                <p className="text-slate-500 mt-1">Customize the promotional banner on your homepage</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form */}
                <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
                    <h2 className="text-xl font-bold text-primary">Edit Content</h2>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Tag Text</label>
                        <input
                            type="text"
                            value={formData.tagText}
                            onChange={(e) => setFormData({ ...formData, tagText: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none"
                            placeholder="Special Offer"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none"
                            placeholder="Already have a quote?"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={2}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none resize-none"
                            placeholder="We aim to beat any comparable written quotes by up to"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Highlight Text (e.g., discount)</label>
                        <input
                            type="text"
                            value={formData.highlightText}
                            onChange={(e) => setFormData({ ...formData, highlightText: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none"
                            placeholder="15%"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Button Text</label>
                        <input
                            type="text"
                            value={formData.buttonText}
                            onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none"
                            placeholder="Learn More"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Button Link</label>
                        <input
                            type="text"
                            value={formData.buttonLink}
                            onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none"
                            placeholder="#contact"
                        />
                    </div>

                    <button
                        onClick={handleSave}
                        className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isSaved
                                ? 'bg-green-500 text-white'
                                : 'bg-secondary text-white hover:bg-secondary-light'
                            }`}
                    >
                        <Save size={18} />
                        {isSaved ? 'Saved!' : 'Save Changes'}
                    </button>
                </div>

                {/* Live Preview */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Eye size={20} className="text-slate-400" />
                        <h2 className="text-xl font-bold text-primary">Live Preview</h2>
                    </div>

                    <div className="rounded-2xl overflow-hidden shadow-lg">
                        <section className="bg-secondary text-white py-12 relative overflow-hidden">
                            {/* Decorative Patterns */}
                            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                                <div className="absolute top-[-50%] left-[-10%] w-[500px] h-[500px] rounded-full border-[40px] border-white/20" />
                                <div className="absolute bottom-[-50%] right-[-10%] w-[600px] h-[600px] rounded-full border-[60px] border-white/10" />
                            </div>

                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                                    <div className="flex items-start gap-6">
                                        <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                                            <Tag size={32} className="text-white" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="bg-white text-secondary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                                    {formData.tagText || 'Tag'}
                                                </span>
                                            </div>
                                            <h2 className="text-2xl md:text-3xl font-bold mb-2">
                                                {formData.title || 'Title'}
                                            </h2>
                                            <p className="text-white/90 max-w-xl text-lg">
                                                {formData.description || 'Description'} <span className="font-bold underline">{formData.highlightText || '0%'}</span>.
                                            </p>
                                        </div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-white text-secondary px-8 py-4 rounded-full font-bold flex items-center gap-2 shadow-lg shadow-black/10 whitespace-nowrap"
                                    >
                                        {formData.buttonText || 'Button'} <ArrowRight size={20} />
                                    </motion.button>

                                </div>
                            </div>
                        </section>
                    </div>

                    <p className="text-sm text-slate-500 text-center">
                        This is how your promo section will appear on the homepage.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminPromo;
