import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, LayoutGrid, List, SlidersHorizontal, ChevronRight, Eye } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-slate-200 rounded-xl ${className}`} />
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

const CategoryDetail = () => {
    const { id } = useParams();
    const { products: categories, isLoading } = useAdmin();
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('newest');

    // In this context, 'products' from useAdmin are actually categories
    const category = categories.find(c => c.id === id);

    const sortedProducts = useMemo(() => {
        if (!category?.products) return [];
        let sorted = [...category.products];
        // Simulate sorting for e-commerce feel
        if (sortBy === 'name-asc') {
            sorted.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === 'name-desc') {
            sorted.sort((a, b) => b.title.localeCompare(a.title));
        }
        return sorted;
    }, [category, sortBy]);

    if (!category && !isLoading) {
        return (
            <div className="pt-32 pb-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Category not found</h2>
                <p className="text-slate-500 mb-8">The category you're looking for doesn't exist or has been removed.</p>
                <Link to="/products" className="px-6 py-3 bg-secondary text-white rounded-xl hover:bg-secondary-light transition-colors font-medium">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <main className="pt-24 bg-slate-50 min-h-screen pb-20">
            {/* Breadcrumb banner */}
            <div className="bg-white border-b border-slate-200 py-4 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center text-sm font-medium text-slate-500">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight size={14} className="mx-2 text-slate-300" />
                        <Link to="/products" className="hover:text-primary transition-colors">Categories</Link>
                        <ChevronRight size={14} className="mx-2 text-slate-300" />
                        {isLoading ? (
                            <Skeleton className="h-4 w-24" />
                        ) : (
                            <span className="text-secondary">{category?.title}</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar filters */}
                    <div className="w-full lg:w-1/4 shrink-0 space-y-6 hidden lg:block">
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm sticky top-28">
                            <h3 className="font-bold text-lg text-primary mb-6 flex items-center gap-2">
                                <SlidersHorizontal size={20} className="text-secondary" />
                                Browse Categories
                            </h3>
                            <ul className="space-y-2">
                                {categories.map((c) => (
                                    <li key={c.id}>
                                        <Link
                                            to={`/category/${c.id}`}
                                            className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${c.id === id
                                                ? 'bg-secondary/10 text-secondary font-bold shadow-sm'
                                                : 'text-slate-600 hover:bg-slate-50 hover:text-primary font-medium'
                                                }`}
                                        >
                                            <span>{c.title}</span>
                                            <span className={`text-xs px-2.5 py-1 rounded-full ${c.id === id ? 'bg-secondary text-white' : 'bg-slate-100 text-slate-500'
                                                }`}>
                                                {c.products?.length || 0}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 w-full">
                        {/* Header Area */}
                        <div className="bg-white rounded-2xl p-8 lg:p-10 border border-slate-200 shadow-sm mb-8 relative overflow-hidden group min-h-[220px]">
                            {isLoading ? (
                                <div className="space-y-4">
                                    <Skeleton className="h-10 w-3/4 md:w-1/2" />
                                    <Skeleton className="h-6 w-full md:w-2/3" />
                                    <Skeleton className="h-6 w-full md:w-2/3" />
                                </div>
                            ) : (
                                <>
                                    <div className="relative z-10 w-full md:w-2/3">
                                        <h1 className="text-3xl md:text-5xl font-extrabold text-primary mb-4 tracking-tight">{category.title}</h1>
                                        <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">{category.description}</p>
                                    </div>
                                    <div
                                        className="absolute inset-0 right-0 w-3/4 md:w-1/2 h-full opacity-5 pointer-events-none transition-transform duration-1000 group-hover:scale-105 ml-auto"
                                        style={{
                                            backgroundImage: `url(${category.image})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center right',
                                            maskImage: 'linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))',
                                            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))'
                                        }}
                                    />
                                </>
                            )}
                        </div>

                        {/* Toolbar */}
                        <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8 gap-4">
                            {isLoading ? (
                                <Skeleton className="h-10 w-full" />
                            ) : (
                                <>
                                    <div className="text-slate-500 font-medium">
                                        Showing <span className="text-primary font-bold">{sortedProducts.length}</span> products
                                    </div>
                                    <div className="flex items-center gap-4 w-full sm:w-auto">
                                        <div className="flex items-center gap-3 flex-1 sm:flex-none">
                                            <label className="text-sm font-medium text-slate-500 whitespace-nowrap">Sort by:</label>
                                            <select
                                                value={sortBy}
                                                onChange={(e) => setSortBy(e.target.value)}
                                                className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary block w-full p-2.5 outline-none transition-all cursor-pointer"
                                            >
                                                <option value="newest">Featured</option>
                                                <option value="name-asc">Alphabetically, A-Z</option>
                                                <option value="name-desc">Alphabetically, Z-A</option>
                                            </select>
                                        </div>
                                        <div className="hidden sm:block h-8 w-px bg-slate-200"></div>
                                        <ViewToggle mode={viewMode} setMode={setViewMode} />
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Product Layout */}
                        {isLoading ? (
                            <div className={viewMode === 'grid'
                                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                                : 'flex flex-col gap-5'}>
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className={`bg-white rounded-2xl overflow-hidden border border-slate-200 flex ${viewMode === 'grid' ? 'flex-col' : 'flex-col sm:flex-row'}`}>
                                        <Skeleton className={`${viewMode === 'grid' ? 'w-full aspect-[4/3]' : 'w-full sm:w-72 aspect-[4/3] sm:aspect-auto'}`} />
                                        <div className="p-6 flex-1 space-y-4">
                                            <Skeleton className="h-6 w-3/4" />
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-4 w-5/6" />
                                            <div className="pt-5 border-t border-slate-100">
                                                <Skeleton className="h-10 w-full" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : sortedProducts.length > 0 ? (
                            <div className={viewMode === 'grid'
                                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                                : 'flex flex-col gap-5'}>
                                {sortedProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className={`group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-secondary/50 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex ${viewMode === 'grid' ? 'flex-col' : 'flex-col sm:flex-row'
                                            }`}
                                    >
                                        {/* Image Container */}
                                        <div className={`relative overflow-hidden shrink-0 bg-slate-50 ${viewMode === 'grid' ? 'w-full aspect-[4/3]' : 'w-full sm:w-72 aspect-[4/3] sm:aspect-auto'
                                            }`}>
                                            {product.image ? (
                                                <img
                                                    src={product.image}
                                                    alt={product.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-multiply"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                    <LayoutGrid size={48} />
                                                </div>
                                            )}

                                            {/* Grid Quick Action View */}
                                            {viewMode === 'grid' && (
                                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                                    <Link
                                                        to={`/product/${product.id}`}
                                                        className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-primary hover:bg-secondary hover:text-white hover:scale-110 transition-all shadow-xl"
                                                        title="Quick View"
                                                    >
                                                        <Eye size={24} />
                                                    </Link>
                                                </div>
                                            )}

                                            {/* Badges Overlay */}
                                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                                <span className="bg-white/95 backdrop-blur-sm text-xs font-bold px-3 py-1.5 rounded-lg text-primary shadow-sm border border-slate-100 uppercase tracking-wider">
                                                    {category.title}
                                                </span>
                                            </div>

                                            {product.specs && Object.keys(product.specs).length > 0 && (
                                                <div className="absolute bottom-4 right-4 bg-secondary/95 backdrop-blur-sm text-xs font-bold px-2 py-1 rounded-md text-white shadow-md">
                                                    {Object.keys(product.specs).length} Specs
                                                </div>
                                            )}
                                        </div>

                                        {/* Content Information */}
                                        <div className={`p-6 flex flex-col flex-1 ${viewMode === 'list' && 'justify-center border-l lg:border-l-0 border-slate-100'}`}>
                                            <Link to={`/product/${product.id}`} className="block">
                                                <h3 className="text-xl font-extrabold text-primary mb-3 group-hover:text-secondary transition-colors line-clamp-1">
                                                    {product.title}
                                                </h3>
                                            </Link>

                                            <p className={`text-slate-500 mb-6 text-sm leading-relaxed ${viewMode === 'grid' ? 'line-clamp-2' : 'line-clamp-3'}`}>
                                                {product.description || (product.longDescription && product.longDescription.substring(0, 150) + '...')}
                                            </p>

                                            {/* Footer Area */}
                                            <div className="mt-auto pt-5 border-t border-slate-100">
                                                {viewMode === 'grid' ? (
                                                    <Link
                                                        to={`/product/${product.id}`}
                                                        className="flex items-center justify-center w-full px-4 py-3 bg-slate-900 text-white rounded-xl hover:bg-secondary transition-all text-sm font-bold group/btn shadow-md hover:shadow-lg"
                                                    >
                                                        View Product Details
                                                        <ChevronRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                                    </Link>
                                                ) : (
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex bg-slate-50 px-3 py-2 rounded-lg text-xs font-bold text-slate-500 gap-4">
                                                            {product.specs && Object.entries(product.specs).slice(0, 2).map(([k, v], i) => (
                                                                <span key={i}><span className="text-slate-400">{k}:</span> <span className="text-slate-700">{v}</span></span>
                                                            ))}
                                                        </div>
                                                        <Link
                                                            to={`/product/${product.id}`}
                                                            className="flex items-center justify-center px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-secondary transition-all text-sm font-bold group/btn shadow-md hover:shadow-lg"
                                                        >
                                                            Details
                                                            <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center shadow-sm">
                                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <LayoutGrid size={40} className="text-slate-300" />
                                </div>
                                <h3 className="text-2xl font-bold text-primary mb-3">No products available</h3>
                                <p className="text-slate-500 max-w-md mx-auto text-lg">We couldn't find any products in this category at the moment. Check back later!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CategoryDetail;
