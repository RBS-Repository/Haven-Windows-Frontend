import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2, LayoutGrid, List } from 'lucide-react';
import QuoteForm from '../components/QuoteForm';
import { useAdmin } from '../context/AdminContext';

const CategoryCard = ({ category, viewMode }) => (
    <Link
        to={`/category/${category.id}`}
        className={`group cursor-pointer block transition-all duration-300 ${viewMode === 'list'
                ? 'flex flex-col sm:flex-row gap-6 p-4 bg-white rounded-2xl border border-slate-100 hover:border-secondary hover:shadow-lg'
                : ''
            }`}
    >
        <div className={`relative overflow-hidden rounded-2xl bg-slate-100 transition-all duration-300 ${viewMode === 'list' ? 'w-full sm:w-48 h-48 sm:h-32 shrink-0' : 'h-80 mb-4'
            }`}>
            <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors" />

            {viewMode === 'grid' && (
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowRight size={20} className="text-secondary" />
                </div>
            )}
        </div>
        <div className={viewMode === 'list' ? 'flex-1 py-1' : ''}>
            <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">{category.title}</h3>
            <p className="text-slate-500 leading-relaxed text-sm line-clamp-2">{category.description}</p>
            {viewMode === 'list' && (
                <div className="mt-4 flex items-center text-xs font-bold text-secondary uppercase tracking-widest">
                    Explore collection <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
            )}
        </div>
    </Link>
);

const EmptyState = ({ title }) => (
    <div className="col-span-full text-center py-16">
        <div className="text-slate-400 text-lg mb-4">No {title} available yet</div>
        <Link to="/admin/products" className="text-secondary hover:underline">
            Add products in Admin Panel →
        </Link>
    </div>
);

const ViewToggle = ({ mode, setMode }) => (
    <div className="flex items-center bg-slate-100 p-1 rounded-xl">
        <button
            onClick={() => setMode('grid')}
            className={`p-2 rounded-lg transition-all ${mode === 'grid' ? 'bg-white shadow-sm text-secondary' : 'text-slate-400 hover:text-primary'}`}
            title="Grid View"
        >
            <LayoutGrid size={18} />
        </button>
        <button
            onClick={() => setMode('list')}
            className={`p-2 rounded-lg transition-all ${mode === 'list' ? 'bg-white shadow-sm text-secondary' : 'text-slate-400 hover:text-primary'}`}
            title="List View"
        >
            <List size={18} />
        </button>
    </div>
);

const Products = () => {
    const { products, isLoading, isOnline } = useAdmin();
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    const windows = (products || []).filter(p => p.type === 'windows');
    const doors = (products || []).filter(p => p.type === 'doors');

    if (isLoading) {
        return (
            <main className="pt-24 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-secondary mx-auto mb-4" />
                    <p className="text-slate-500">Loading products...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="pt-24">
            {/* Connection Warning */}
            {!isOnline && (
                <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3 text-center text-yellow-800 text-sm">
                    ⚠️ Database not connected. Start the backend server to manage products.
                </div>
            )}

            {/* Page Header */}
            <section className="bg-primary text-white py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-800/50 transform skew-x-12 translate-x-1/4" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-white text-5xl md:text-7xl font-bold mb-6 font-display">Our Collection</h1>
                    <p className="text-xl text-slate-300 max-w-2xl font-light">
                        Explore our comprehensive range of high-performance uPVC windows and doors, designed to transform your living space.
                    </p>
                </div>
            </section>

            {/* Windows Section */}
            <section className="py-24" id="windows">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12 border-b border-gray-200 pb-8">
                        <div>
                            <h2 className="text-4xl font-bold text-primary">uPVC Windows</h2>
                            <p className="text-slate-400 text-sm mt-1 uppercase tracking-widest font-medium">Haven Engineering Standard</p>
                        </div>
                        <ViewToggle mode={viewMode} setMode={setViewMode} />
                    </div>

                    <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12' : 'flex flex-col gap-6'}>
                        {windows.length > 0 ? (
                            windows.map(category => (
                                <CategoryCard key={category.id} category={category} viewMode={viewMode} />
                            ))
                        ) : (
                            <EmptyState title="windows" />
                        )}
                    </div>
                </div>
            </section>

            {/* Doors Section */}
            <section className="py-24 bg-slate-50" id="doors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12 border-b border-gray-200 pb-8">
                        <div>
                            <h2 className="text-4xl font-bold text-primary">uPVC Doors</h2>
                            <p className="text-slate-400 text-sm mt-1 uppercase tracking-widest font-medium">Entrance, Patio & Sliding</p>
                        </div>
                        <ViewToggle mode={viewMode} setMode={setViewMode} />
                    </div>

                    <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12' : 'flex flex-col gap-6'}>
                        {doors.length > 0 ? (
                            doors.map(category => (
                                <CategoryCard key={category.id} category={category} viewMode={viewMode} />
                            ))
                        ) : (
                            <EmptyState title="doors" />
                        )}
                    </div>
                </div>
            </section>

            <QuoteForm />
        </main>
    );
};

export default Products;
