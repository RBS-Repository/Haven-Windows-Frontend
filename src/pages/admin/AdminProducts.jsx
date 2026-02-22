import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Save, ChevronDown, ChevronRight, Image, Package } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

// Default spec fields based on the reference image
const DEFAULT_SPEC_FIELDS = [
    'Categories',
    'Trademark/Brand',
    'Model',
    'PVC Frame',
    'Color',
    'Hardware',
    'Glass',
    'Screen',
    'Rubber Strip',
    'Reinforcement Steel',
    'Standard',
    'Package',
    'FOB Port',
    'Terms of Payment',
    'Warranty',
    'Update Time'
];

const AdminProducts = () => {
    const { products, updateCategory, addCategory, deleteCategory, updateProduct, addProduct, deleteProduct } = useAdmin();

    const [editingCategory, setEditingCategory] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [addingProductTo, setAddingProductTo] = useState(null);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [activeTab, setActiveTab] = useState('all');

    // Filter by type
    const filteredProducts = activeTab === 'all'
        ? products
        : products.filter(p => p.type === activeTab);

    const toggleExpand = (categoryId) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }));
    };

    // Category Form Component
    const CategoryForm = ({ category, onSave, onCancel, isNew }) => {
        const [formData, setFormData] = useState(category || {
            title: '',
            type: 'windows',
            description: '',
            image: ''
        });

        const handleSubmit = (e) => {
            e.preventDefault();
            onSave(formData);
        };

        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                    <div className="p-6 border-b border-slate-200">
                        <h2 className="text-xl font-bold text-primary">
                            {isNew ? 'Add New Category' : 'Edit Category'}
                        </h2>
                    </div>
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Type</label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none"
                            >
                                <option value="windows">Windows</option>
                                <option value="doors">Doors</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none resize-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Image URL</label>
                            <input
                                type="url"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none"
                                placeholder="https://example.com/image.jpg"
                            />
                            {formData.image && (
                                <img src={formData.image} alt="Preview" className="mt-2 w-full h-32 object-cover rounded-xl" />
                            )}
                        </div>
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="flex-1 px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-4 py-3 bg-secondary text-white rounded-xl hover:bg-secondary-light transition-colors flex items-center justify-center gap-2"
                            >
                                <Save size={18} />
                                {isNew ? 'Add Category' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    // Product Form Component with Specs Editor
    const ProductForm = ({ product, categoryId, onSave, onCancel, isNew }) => {
        const [formData, setFormData] = useState(product || {
            title: '',
            description: '',
            longDescription: '',
            image: '',
            images: [],
            specs: {}
        });

        // Initialize images array from existing data
        const [imagesList, setImagesList] = useState(formData.images || (formData.image ? [formData.image] : []));
        const [newImageUrl, setNewImageUrl] = useState('');

        // Convert specs object to array for easier editing
        const [specsList, setSpecsList] = useState(() => {
            const existingSpecs = formData.specs || {};
            return Object.entries(existingSpecs).map(([key, value]) => ({ key, value }));
        });

        const [newSpecKey, setNewSpecKey] = useState('');
        const [newSpecValue, setNewSpecValue] = useState('');

        const handleAddSpec = () => {
            if (newSpecKey.trim() && newSpecValue.trim()) {
                setSpecsList([...specsList, { key: newSpecKey.trim(), value: newSpecValue.trim() }]);
                setNewSpecKey('');
                setNewSpecValue('');
            }
        };

        const handleRemoveSpec = (index) => {
            setSpecsList(specsList.filter((_, i) => i !== index));
        };

        const handleUpdateSpec = (index, field, value) => {
            const updated = [...specsList];
            updated[index][field] = value;
            setSpecsList(updated);
        };

        const handleAddDefaultSpec = (specName) => {
            if (!specsList.some(s => s.key === specName)) {
                setSpecsList([...specsList, { key: specName, value: '' }]);
            }
        };

        const [bulkPasteText, setBulkPasteText] = useState('');
        const [showBulkPaste, setShowBulkPaste] = useState(false);

        const handleBulkSpecPaste = () => {
            if (!bulkPasteText.trim()) return;

            const lines = bulkPasteText.split('\n').filter(line => line.trim());
            const newSpecs = [];

            lines.forEach(line => {
                let foundMatch = false;

                // Try to match against DEFAULT_SPEC_FIELDS first (case insensitive, handle run-together text)
                for (const field of DEFAULT_SPEC_FIELDS) {
                    const escapedField = field.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    const regex = new RegExp(`^${escapedField}\\s*[:\\s-]*(.*)$`, 'i');
                    const match = line.match(regex);

                    if (match) {
                        newSpecs.push({ key: field, value: match[1].trim() });
                        foundMatch = true;
                        break;
                    }
                }

                // If no default field match, try to split by colon or tab
                if (!foundMatch) {
                    let key = '';
                    let value = '';

                    if (line.includes(':')) {
                        [key, ...value] = line.split(':');
                        value = value.join(':');
                    } else if (line.includes('\t')) {
                        [key, ...value] = line.split('\t');
                        value = value.join('\t');
                    }

                    if (key.trim()) {
                        newSpecs.push({ key: key.trim(), value: value.trim() });
                        foundMatch = true;
                    }
                }

                // If still no match, treat the whole line as a key with empty value
                if (!foundMatch && line.trim()) {
                    newSpecs.push({ key: line.trim(), value: '' });
                }
            });

            // Merge with existing specs, avoiding duplicates (last one wins)
            const mergedSpecs = [...specsList];
            newSpecs.forEach(newSpec => {
                const existingIndex = mergedSpecs.findIndex(s => s.key.toLowerCase() === newSpec.key.toLowerCase());
                if (existingIndex >= 0) {
                    mergedSpecs[existingIndex].value = newSpec.value;
                } else {
                    mergedSpecs.push(newSpec);
                }
            });

            setSpecsList(mergedSpecs);
            setBulkPasteText('');
            setShowBulkPaste(false);
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            // Convert specs array back to object
            const specsObject = {};
            specsList.forEach(spec => {
                if (spec.key.trim()) {
                    specsObject[spec.key.trim()] = spec.value.trim();
                }
            });

            // Use the first image in the list as the main 'image' field for compatibility
            const primaryImage = imagesList.length > 0 ? imagesList[0] : '';

            onSave(categoryId, {
                ...formData,
                image: primaryImage,
                images: imagesList,
                specs: specsObject
            });
        };

        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
                        <h2 className="text-xl font-bold text-primary">
                            {isNew ? 'Add New Product' : 'Edit Product'}
                        </h2>
                        <button onClick={onCancel} className="p-2 hover:bg-slate-100 rounded-lg">
                            <X size={20} />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Basic Info */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-primary border-b pb-2">Basic Information</h3>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Short Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={2}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Long Description</label>
                                <textarea
                                    value={formData.longDescription}
                                    onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none resize-none"
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Product Images</label>

                                {/* Multiple Images List */}
                                <div className="space-y-3">
                                    {imagesList.map((url, index) => (
                                        <div key={index} className="flex gap-3 group">
                                            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                                                <img src={url} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                                                <div className="absolute top-0 left-0 bg-primary/80 text-white text-[10px] px-1.5 py-0.5 rounded-br-lg font-bold">
                                                    #{index + 1}
                                                </div>
                                            </div>
                                            <div className="flex-1 flex flex-col justify-center">
                                                <input
                                                    type="url"
                                                    value={url}
                                                    onChange={(e) => {
                                                        const updated = [...imagesList];
                                                        updated[index] = e.target.value;
                                                        setImagesList(updated);
                                                    }}
                                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-secondary outline-none mb-2"
                                                    placeholder="https://example.com/image.jpg"
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        type="button"
                                                        disabled={index === 0}
                                                        onClick={() => {
                                                            const updated = [...imagesList];
                                                            const temp = updated[index];
                                                            updated[index] = updated[index - 1];
                                                            updated[index - 1] = temp;
                                                            setImagesList(updated);
                                                        }}
                                                        className="text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-primary disabled:opacity-30"
                                                    >
                                                        Move Up
                                                    </button>
                                                    <button
                                                        type="button"
                                                        disabled={index === imagesList.length - 1}
                                                        onClick={() => {
                                                            const updated = [...imagesList];
                                                            const temp = updated[index];
                                                            updated[index] = updated[index + 1];
                                                            updated[index + 1] = temp;
                                                            setImagesList(updated);
                                                        }}
                                                        className="text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-primary disabled:opacity-30"
                                                    >
                                                        Move Down
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setImagesList(imagesList.filter((_, i) => i !== index))}
                                                        className="text-[10px] font-bold uppercase tracking-wider text-red-400 hover:text-red-600 ml-auto"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Add New Image */}
                                <div className="flex gap-2 pt-2 border-t border-dashed">
                                    <input
                                        type="url"
                                        value={newImageUrl}
                                        onChange={(e) => setNewImageUrl(e.target.value)}
                                        placeholder="Paste new image URL here..."
                                        className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:border-secondary outline-none text-sm"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                if (newImageUrl.trim()) {
                                                    setImagesList([...imagesList, newImageUrl.trim()]);
                                                    setNewImageUrl('');
                                                }
                                            }
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (newImageUrl.trim()) {
                                                setImagesList([...imagesList, newImageUrl.trim()]);
                                                setNewImageUrl('');
                                            }
                                        }}
                                        className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl transition-all text-sm font-bold"
                                    >
                                        Add
                                    </button>
                                </div>

                                {imagesList.length === 0 && (
                                    <div className="py-8 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-center">
                                        <div className="bg-white p-3 rounded-full w-fit mx-auto shadow-sm mb-3">
                                            <Image className="text-slate-300" size={24} />
                                        </div>
                                        <p className="text-sm text-slate-400">No images added yet. Add at least one image.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Specifications Editor */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-primary border-b pb-2">Specifications</h3>

                            {/* Quick Add Buttons */}
                            <div className="flex flex-wrap gap-2">
                                <span className="text-xs text-slate-500 w-full mb-1">Quick add:</span>
                                {DEFAULT_SPEC_FIELDS.map((field) => (
                                    <button
                                        key={field}
                                        type="button"
                                        onClick={() => handleAddDefaultSpec(field)}
                                        disabled={specsList.some(s => s.key === field)}
                                        className={`text-[10px] px-2 py-1 rounded-full border transition-colors ${specsList.some(s => s.key === field)
                                            ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                                            : 'bg-white text-primary border-primary/30 hover:bg-primary hover:text-white'
                                            }`}
                                    >
                                        + {field}
                                    </button>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => setShowBulkPaste(!showBulkPaste)}
                                    className={`text-[10px] px-2 py-1 rounded-full border transition-colors ${showBulkPaste
                                        ? 'bg-secondary text-white border-secondary'
                                        : 'bg-secondary/10 text-secondary border-secondary/30 hover:bg-secondary hover:text-white'
                                        }`}
                                >
                                    {showBulkPaste ? 'Close Bulk Paste' : '+ Bulk Paste Specs'}
                                </button>
                            </div>

                            {showBulkPaste && (
                                <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200 animate-in fade-in slide-in-from-top-2">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm font-bold text-primary">Paste Specifications</label>
                                        <span className="text-[10px] text-slate-400">One per line. Format: "Field: Value"</span>
                                    </div>
                                    <textarea
                                        value={bulkPasteText}
                                        onChange={(e) => setBulkPasteText(e.target.value)}
                                        placeholder={`Example:\nCategories: uPVC Awning Windows\nBrand: ROPO\nModel: RPAW02`}
                                        rows={6}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-secondary outline-none text-sm font-mono"
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={handleBulkSpecPaste}
                                            className="flex-1 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-light transition-colors text-sm font-bold"
                                        >
                                            Apply Specifications
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setBulkPasteText('');
                                                setShowBulkPaste(false);
                                            }}
                                            className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-white transition-colors text-sm"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Existing Specs */}
                            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {specsList.map((spec, index) => (
                                    <div key={index} className="flex gap-2 items-center group">
                                        <input
                                            type="text"
                                            value={spec.key}
                                            onChange={(e) => handleUpdateSpec(index, 'key', e.target.value)}
                                            placeholder="Field name"
                                            className="flex-1 px-3 py-2 rounded-lg border border-slate-200 focus:border-secondary outline-none text-sm bg-slate-50 group-hover:bg-white transition-colors"
                                        />
                                        <input
                                            type="text"
                                            value={spec.value}
                                            onChange={(e) => handleUpdateSpec(index, 'value', e.target.value)}
                                            placeholder="Value"
                                            className="flex-1 px-3 py-2 rounded-lg border border-slate-200 focus:border-secondary outline-none text-sm group-hover:bg-white transition-colors"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveSpec(index)}
                                            className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Add New Spec */}
                            <div className="flex gap-2 items-center pt-2 border-t border-dashed">
                                <input
                                    type="text"
                                    value={newSpecKey}
                                    onChange={(e) => setNewSpecKey(e.target.value)}
                                    placeholder="New field name"
                                    className="flex-1 px-3 py-2 rounded-lg border border-slate-200 focus:border-secondary outline-none text-sm"
                                />
                                <input
                                    type="text"
                                    value={newSpecValue}
                                    onChange={(e) => setNewSpecValue(e.target.value)}
                                    placeholder="Value"
                                    className="flex-1 px-3 py-2 rounded-lg border border-slate-200 focus:border-secondary outline-none text-sm"
                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSpec())}
                                />
                                <button
                                    type="button"
                                    onClick={handleAddSpec}
                                    className="p-2 bg-secondary/10 text-secondary hover:bg-secondary hover:text-white rounded-lg transition-all"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>

                            {specsList.length === 0 && (
                                <p className="text-sm text-slate-400 text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                    No specifications added yet. Use the quick add buttons above or create a custom field.
                                </p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-4 border-t sticky bottom-0 bg-white py-4 -mb-6">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="flex-1 px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-4 py-3 bg-secondary text-white rounded-xl hover:bg-secondary-light transition-colors flex items-center justify-center gap-2"
                            >
                                <Save size={18} />
                                {isNew ? 'Add Product' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Products & Categories</h1>
                    <p className="text-slate-500 mt-1">Manage your product catalog</p>
                </div>
                <button
                    onClick={() => setIsAddingCategory(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-light transition-colors"
                >
                    <Plus size={18} />
                    Add Category
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 bg-white p-1 rounded-xl w-fit">
                {['all', 'windows', 'doors'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${activeTab === tab
                            ? 'bg-primary text-white'
                            : 'text-slate-600 hover:bg-slate-100'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Categories List */}
            <div className="space-y-4">
                {filteredProducts.map((category) => (
                    <div key={category.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                        {/* Category Header */}
                        <div className="p-4 flex items-center gap-4 border-b border-slate-100">
                            <button
                                onClick={() => toggleExpand(category.id)}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                {expandedCategories[category.id] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                            </button>
                            <img
                                src={category.image}
                                alt={category.title}
                                className="w-16 h-16 rounded-xl object-cover"
                            />
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-primary">{category.title}</h3>
                                <p className="text-sm text-slate-500 truncate">{category.description}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${category.type === 'windows' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                                        }`}>
                                        {category.type}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                        {category.products.length} products
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setEditingCategory(category)}
                                    className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    <Pencil size={18} />
                                </button>
                                <button
                                    onClick={() => {
                                        if (confirm(`Delete "${category.title}" and all its products?`)) {
                                            deleteCategory(category.id);
                                        }
                                    }}
                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Products List (Expandable) */}
                        {expandedCategories[category.id] && (
                            <div className="p-4 bg-slate-50 space-y-3">
                                {category.products.map((product) => (
                                    <div key={product.id} className="flex items-center gap-4 p-3 bg-white rounded-xl">
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="w-12 h-12 rounded-lg object-cover"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                                                <Image size={20} className="text-slate-400" />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-primary">{product.title}</p>
                                            <p className="text-sm text-slate-500 truncate">{product.description}</p>
                                            {product.specs && Object.keys(product.specs).length > 0 && (
                                                <p className="text-xs text-secondary mt-1">
                                                    {Object.keys(product.specs).length} specifications
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setEditingProduct({ product, categoryId: category.id })}
                                                className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors"
                                            >
                                                <Pencil size={16} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (confirm(`Delete "${product.title}"?`)) {
                                                        deleteProduct(category.id, product.id);
                                                    }
                                                }}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    onClick={() => setAddingProductTo(category.id)}
                                    className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:text-secondary hover:border-secondary transition-colors flex items-center justify-center gap-2"
                                >
                                    <Plus size={18} />
                                    Add Product to {category.title}
                                </button>
                            </div>
                        )}
                    </div>
                ))}

                {filteredProducts.length === 0 && (
                    <div className="bg-white rounded-2xl p-12 text-center">
                        <Package size={48} className="mx-auto text-slate-300 mb-4" />
                        <h3 className="text-lg font-medium text-slate-600">No categories found</h3>
                        <p className="text-slate-400 mt-1">Add your first category to get started</p>
                    </div>
                )}
            </div>

            {/* Modals */}
            {isAddingCategory && (
                <CategoryForm
                    isNew
                    onSave={(data) => {
                        addCategory(data);
                        setIsAddingCategory(false);
                    }}
                    onCancel={() => setIsAddingCategory(false)}
                />
            )}

            {editingCategory && (
                <CategoryForm
                    category={editingCategory}
                    onSave={(data) => {
                        updateCategory(editingCategory.id, data);
                        setEditingCategory(null);
                    }}
                    onCancel={() => setEditingCategory(null)}
                />
            )}

            {addingProductTo && (
                <ProductForm
                    isNew
                    categoryId={addingProductTo}
                    onSave={(categoryId, data) => {
                        addProduct(categoryId, data);
                        setAddingProductTo(null);
                    }}
                    onCancel={() => setAddingProductTo(null)}
                />
            )}

            {editingProduct && (
                <ProductForm
                    product={editingProduct.product}
                    categoryId={editingProduct.categoryId}
                    onSave={(categoryId, data) => {
                        updateProduct(categoryId, editingProduct.product.id, data);
                        setEditingProduct(null);
                    }}
                    onCancel={() => setEditingProduct(null)}
                />
            )}
        </div>
    );
};

export default AdminProducts;
