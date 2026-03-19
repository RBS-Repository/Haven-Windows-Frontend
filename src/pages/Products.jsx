import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, LayoutGrid, List, ChevronRight, Sparkles, Box, ArrowUpRight } from 'lucide-react';
import QuoteForm from '../components/QuoteForm';
import { useAdmin } from '../context/AdminContext';

const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-slate-200 rounded-2xl ${className}`} />
);

const CategoryCard = ({ category, viewMode }) => {
    const productCount = category.products?.length || 0;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <Link
                to={`/category/${category.id}`}
                className={`group cursor-pointer block transition-all duration-500 ${viewMode === 'list'
                    ? 'flex flex-col sm:flex-row gap-8 p-6 bg-white rounded-3xl border border-slate-100 hover:border-secondary/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]'
                    : 'bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:border-secondary/30 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)]'
                    }`}
            >
                {/* Image Section */}
                <div className={`relative overflow-hidden ${viewMode === 'list'
                    ? 'w-full sm:w-64 h-64 sm:h-48 rounded-2xl'
                    : 'aspect-[4/5] sm:aspect-square'
                    }`}>
                    <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Floating Badge */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/20 flex items-center gap-2">
                        <Box size={14} className="text-secondary" />
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{productCount} Products</span>
                    </div>

                    {viewMode === 'grid' && (
                        <div className="absolute bottom-6 right-6 bg-secondary text-white p-4 rounded-2xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                            <ArrowUpRight size={24} />
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className={`flex flex-col ${viewMode === 'list' ? 'flex-1 justify-center' : 'p-8'}`}>
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h3 className="text-2xl font-black text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
                                {category.title}
                            </h3>
                            <div className="h-1 w-12 bg-secondary/20 rounded-full group-hover:w-24 transition-all duration-500" />
                        </div>
                    </div>
                    <p className="text-slate-500 leading-relaxed text-sm line-clamp-2 mb-6">
                        {category.description}
                    </p>

                    <div className="flex items-center text-xs font-bold text-secondary uppercase tracking-widest group-hover:gap-2 transition-all">
                        Explore Collection <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

const SectionHeader = ({ title, subtitle, viewMode, setViewMode }) => (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-2">
        <div className="space-y-2">
            <div className="flex items-center gap-3 text-secondary">
                <Sparkles size={18} className="animate-pulse" />
                <span className="text-xs font-black uppercase tracking-[0.3em]">{subtitle}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-primary tracking-tight">{title}</h2>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
            <span className="text-xs font-bold text-slate-400 ml-2 hidden sm:block">View Mode</span>
            <div className="flex items-center bg-slate-50 p-1 rounded-xl">
                <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2.5 rounded-lg transition-all duration-300 ${viewMode === 'grid' ? 'bg-white shadow-md text-secondary scale-110' : 'text-slate-400 hover:text-primary'}`}
                >
                    <LayoutGrid size={20} />
                </button>
                <button
                    onClick={() => setViewMode('list')}
                    className={`p-2.5 rounded-lg transition-all duration-300 ${viewMode === 'list' ? 'bg-white shadow-md text-secondary scale-110' : 'text-slate-400 hover:text-primary'}`}
                >
                    <List size={20} />
                </button>
            </div>
        </div>
    </div>
);

const Products = () => {
    const { products, isLoading, isOnline } = useAdmin();
    const [viewMode, setViewMode] = useState('grid');
    const [activeSection, setActiveSection] = useState('windows');

    const windows = useMemo(() => (products || []).filter(p => p.type === 'windows'), [products]);
    const doors = useMemo(() => (products || []).filter(p => p.type === 'doors'), [products]);

    const scrollToSection = (id) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <main className="bg-[#fafbfc] min-h-screen">
            {/* Redesigned Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-primary">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest mb-8">
                            Premium Manufacturing <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                        </span>
                        <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                            Our <span className="text-secondary">Master</span> Collection
                        </h1>
                        <p className="text-xl text-slate-300/80 leading-relaxed font-medium mb-10 max-w-xl">
                            High-performance European uPVC engineering tailored for New Zealand conditions. Precision, efficiency, and timeless design.
                        </p>

                        {/* Quick Nav Toggles */}
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => scrollToSection('windows')}
                                className={`px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-3 ${activeSection === 'windows' ? 'bg-secondary text-white shadow-2xl shadow-secondary/20 scale-105' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}`}
                            >
                                <Box size={20} />
                                Window Systems
                            </button>
                            <button
                                onClick={() => scrollToSection('doors')}
                                className={`px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-3 ${activeSection === 'doors' ? 'bg-secondary text-white shadow-2xl shadow-secondary/20 scale-105' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}`}
                            >
                                <Box size={20} />
                                Door Solutions
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
                {!isOnline && (
                    <div className="mb-12 bg-yellow-500/10 backdrop-blur-md border border-yellow-500/20 px-6 py-4 rounded-2xl text-yellow-700 text-sm font-bold flex items-center gap-3 animate-pulse">
                        <span>⚠️ Database not connected. Displaying local data.</span>
                    </div>
                )}

                {/* Windows Section */}
                <section className="py-20" id="windows">
                    <SectionHeader
                        title="Window Systems"
                        subtitle="Precision Engineering"
                        viewMode={viewMode}
                        setViewMode={setViewMode}
                    />

                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map(i => <Skeleton key={i} className="aspect-[4/5]" />)}
                        </div>
                    ) : (
                        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12' : 'flex flex-col gap-8'}>
                            {windows.length > 0 ? (
                                windows.map(category => (
                                    <CategoryCard key={category.id} category={category} viewMode={viewMode} />
                                ))
                            ) : (
                                <div className="col-span-full bg-white rounded-[2rem] p-20 text-center border border-dashed border-slate-200">
                                    <p className="text-slate-400 font-bold">No window categories found.</p>
                                </div>
                            )}
                        </div>
                    )}
                </section>

                {/* Doors Section */}
                <section className="py-20" id="doors">
                    <SectionHeader
                        title="Door Solutions"
                        subtitle="Elegant Entrances"
                        viewMode={viewMode}
                        setViewMode={setViewMode}
                    />

                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map(i => <Skeleton key={i} className="aspect-[4/5]" />)}
                        </div>
                    ) : (
                        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12' : 'flex flex-col gap-8'}>
                            {doors.length > 0 ? (
                                doors.map(category => (
                                    <CategoryCard key={category.id} category={category} viewMode={viewMode} />
                                ))
                            ) : (
                                <div className="col-span-full bg-white rounded-[2rem] p-20 text-center border border-dashed border-slate-200">
                                    <p className="text-slate-400 font-bold">No door categories found.</p>
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </div>

            <div className="bg-white border-t border-slate-100">
                <QuoteForm />
            </div>
        </main>
    );
};

export default Products;
