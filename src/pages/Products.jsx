import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, LayoutGrid, List, ChevronRight, Sparkles, Box, ArrowUpRight } from 'lucide-react';
import QuoteForm from '../components/QuoteForm';
import { useAdmin } from '../context/AdminContext';

const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-slate-200 rounded-2xl ${className}`} />
);

const ProductCard = ({ product }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
    >
        <Link
            to={`/category/${product.id}`}
            className="group block bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-secondary transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)]"
        >
            <div className="aspect-square bg-slate-50 relative overflow-hidden flex items-center justify-center p-8">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors" />
                <div className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <ArrowUpRight size={20} />
                </div>
            </div>
            <div className="p-8">
                <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-px bg-secondary/30" />
                    <span className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">{product.type === 'windows' ? 'Window System' : 'Door Solution'}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-primary group-hover:text-secondary transition-colors duration-300">
                    {product.title}
                </h3>
            </div>
        </Link>
    </motion.div>
);

const Products = () => {
    const { products, isLoading, isOnline } = useAdmin();
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
            {/* 1. New 'Quiet Luxury' Zen Hero */}
            <section className="relative pt-48 pb-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col border-l-[1px] border-slate-200 pl-12 py-12 relative">
                        {/* Subtle decorative dot at the start of the line */}
                        <div className="absolute top-0 left-[-3px] w-[5px] h-[5px] bg-secondary rounded-full" />

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <span className="text-secondary text-xs font-black uppercase tracking-[0.5em] block mb-2">
                                Precision Systems
                            </span>
                            <h1 className="text-5xl md:text-8xl font-black text-primary tracking-tight leading-[0.9]">
                                The <br />
                                Collection.
                            </h1>
                            <div className="max-w-lg">
                                <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
                                    Defining the next standard of uPVC excellence in New Zealand. <br />
                                    <span className="text-slate-400">Curated for performance, designed for life.</span>
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. Sticky Category Quick-Nav */}
            <div className="sticky top-20 z-[40] bg-white/80 backdrop-blur-xl border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center gap-2 sm:gap-8 py-4">
                        <button
                            onClick={() => scrollToSection('windows')}
                            className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeSection === 'windows' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-primary'}`}
                        >
                            Window Systems
                        </button>
                        <div className="w-1 h-1 bg-slate-200 rounded-full" />
                        <button
                            onClick={() => scrollToSection('doors')}
                            className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeSection === 'doors' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-primary'}`}
                        >
                            Door Solutions
                        </button>
                    </div>
                </div>
            </div>

            {/* 3. Products Grid Area */}
            <div className="bg-white min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

                    {!isOnline && (
                        <div className="mb-12 bg-yellow-500/10 border border-yellow-500/20 px-6 py-4 rounded-2xl text-yellow-700 text-sm font-bold flex items-center gap-3">
                            <span>⚠️ Database not connected. Displaying local data.</span>
                        </div>
                    )}

                    {/* Windows Grid */}
                    <section id="windows" className="mb-32">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-secondary">
                                    <span className="w-8 h-px bg-secondary" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Engineering</span>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black text-primary tracking-tighter">Window Systems</h2>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[1, 2, 3].map(i => <Skeleton key={i} className="aspect-square" />)}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                                {windows.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Doors Grid */}
                    <section id="doors">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-secondary">
                                    <span className="w-8 h-px bg-secondary" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Grandeur</span>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black text-primary tracking-tighter">Door Solutions</h2>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[1, 2, 3].map(i => <Skeleton key={i} className="aspect-square" />)}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                                {doors.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </div>

            <div className="bg-white border-t border-slate-100">
                <QuoteForm />
            </div>
        </main>
    );
};

export default Products;
