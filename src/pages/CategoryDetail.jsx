import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ChevronRight,
    ChevronLeft,
    Maximize2,
    ArrowRight,
    LayoutGrid,
    Zap,
    CheckCircle2,
    X
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import VekaDrawer from '../components/VekaDrawer';
import QuoteForm from '../components/QuoteForm';

const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-slate-200 rounded-xl ${className}`} />
);

const CategoryDetail = () => {
    const { id } = useParams();
    const { products: categories, isLoading } = useAdmin();
    const [isVekaDrawerOpen, setIsVekaDrawerOpen] = useState(false);
    const [activeImage, setActiveImage] = useState(0);
    const [lightboxImage, setLightboxImage] = useState(null);

    // Find the category/product type
    const category = categories.find(c => c.id === id);

    // Filter and Shuffle related products
    const relatedProducts = categories
        .filter(p => p.id !== id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);

    // Build the image list: use images[] array if populated, otherwise fall back to single image
    const heroImages = (category?.images && category.images.length > 0)
        ? category.images
        : (category?.image ? [category.image] : []);

    // Default content fallbacks
    const defaultAttributes = [
        { label: 'Thermal Efficiency', desc: 'Superior U-Values' },
        { label: 'Airtight Design', desc: 'Draft-free living' },
        { label: 'Noise Control', desc: 'Peaceful interiors' }
    ];

    const defaultFeatures = [
        { title: 'Intelligent Operation', description: `Designed for the modern New Zealand home, our ${category?.title || 'window'} systems utilize premium multi-point locking mechanisms for effortless operation and maximum security.` },
        { title: 'Unrivaled Insulation', description: 'Multi-chambered uPVC profiles combined with expert dual-sealing ensures that heat stays in during winter and out during summer, drastically reducing energy costs.' },
        { title: 'Low Maintenance', description: `Unlike timber or aluminum, high-grade uPVC will never rot, warp, or corrode. A simple wipe down is all it takes to keep your ${category?.title?.toLowerCase() || 'windows'} looking new for decades.` }
    ];

    const defaultBadges = ['Guaranteed Noise Reduction', 'UV Resistant Finish', 'Child Safe Hardware'];

    const attributes = (category?.attributes && category.attributes.length > 0) ? category.attributes : defaultAttributes;
    const features = (category?.features && category.features.length > 0) ? category.features : defaultFeatures;
    const badges = (category?.badges && category.badges.length > 0) ? category.badges : defaultBadges;

    if (!category && !isLoading) {
        return (
            <div className="pt-32 pb-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Product Type Not Found</h2>
                <p className="text-slate-500 mb-8">The section you're looking for doesn't exist or has been moved.</p>
                <Link to="/products" className="px-6 py-3 bg-secondary text-white rounded-xl hover:bg-secondary-light transition-colors font-medium">
                    Back to Collection
                </Link>
            </div>
        );
    }

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <main className="bg-white min-h-screen">
            {/* Lightbox Modal */}
            {lightboxImage && (
                <div
                    className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 md:p-10"
                    onClick={() => setLightboxImage(null)}
                >
                    <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
                        <X size={32} />
                    </button>
                    <motion.img
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        src={lightboxImage}
                        alt="Preview"
                        className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                    />
                </div>
            )}

            {/* 1. New High-End Editorial Hero Section */}
            <section className="relative pt-32 pb-24 overflow-hidden bg-white">
                {/* Large Background Ghost Title for Depth */}
                <div className="absolute top-20 left-4 w-full select-none pointer-events-none -z-10 overflow-hidden hidden lg:block">
                    <h1 className="text-[18rem] font-black text-slate-50 leading-none whitespace-nowrap">
                        {category?.title}
                    </h1>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">

                        {/* LEFT: Information Column */}
                        <div className="lg:col-span-5 relative z-10">
                            <div className="flex flex-col border-l-2 border-primary/5 pl-10 py-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="space-y-10"
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-secondary">
                                            <span className="h-px w-8 bg-secondary" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.5em]">The Series</span>
                                        </div>
                                        <h1 className="text-6xl md:text-8xl font-black text-primary leading-[0.9] tracking-tighter">
                                            {isLoading ? <Skeleton className="h-16 w-full" /> : category?.title}
                                        </h1>
                                    </div>

                                    <div className="space-y-8">
                                        {isLoading ? (
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-full" />
                                                <Skeleton className="h-4 w-5/6" />
                                            </div>
                                        ) : (
                                            <p className="text-xl text-slate-500 font-medium leading-relaxed">
                                                {category?.description}
                                            </p>
                                        )}

                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <button
                                                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                                                className="px-10 py-5 bg-primary text-white font-bold rounded-2xl hover:bg-secondary transition-all shadow-xl shadow-primary/10 flex items-center justify-center gap-3 group"
                                            >
                                                Get Pricing Info
                                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                            <button
                                                onClick={() => setIsVekaDrawerOpen(true)}
                                                className="px-10 py-5 bg-secondary text-white font-bold rounded-2xl hover:bg-secondary-light transition-all shadow-xl shadow-secondary/20 flex items-center justify-center gap-3"
                                            >
                                                Technical Specs
                                                <LayoutGrid size={20} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Series Metadata */}
                                    <div className="pt-10 flex gap-12 border-t border-slate-100">

                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Warranty</p>
                                            <p className="text-primary font-black text-sm">10 Year Guarantee</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* RIGHT: High-End Exhibit Frame */}
                        <div className="lg:col-span-7">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1 }}
                                className="relative group"
                            >
                                {/* Decorative "Glass" Frame Background */}
                                <div className="absolute -inset-10 bg-slate-50 rounded-[4rem] -z-10 group-hover:bg-secondary/5 transition-colors duration-700" />

                                <div
                                    className="relative aspect-square md:aspect-[5/6] bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 overflow-hidden cursor-zoom-in"
                                    onClick={() => setLightboxImage(heroImages[activeImage])}
                                >
                                    {isLoading ? (
                                        <Skeleton className="w-full h-full" />
                                    ) : heroImages.length > 0 ? (
                                        <>
                                            <img
                                                src={heroImages[activeImage]}
                                                alt={`${category?.title}`}
                                                className="w-full h-full object-contain p-12 transition-transform duration-1000 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-500">
                                                <div className="bg-white/95 p-6 rounded-full shadow-2xl">
                                                    <Maximize2 size={24} className="text-primary" />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-200">
                                            <LayoutGrid size={64} />
                                        </div>
                                    )}

                                    {/* Gallery Photos Count Counter */}
                                    {heroImages.length > 1 && (
                                        <div className="absolute top-8 right-8 bg-primary text-white text-[10px] font-black px-4 py-2 rounded-full tracking-widest uppercase">
                                            {activeImage + 1} / {heroImages.length}
                                        </div>
                                    )}
                                </div>

                                {/* Curated Portfolio Strip (Thumbnails) */}
                                {heroImages.length > 1 && (
                                    <div className="flex gap-4 mt-8 justify-center overflow-x-auto no-scrollbar py-2">
                                        {heroImages.map((img, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setActiveImage(i)}
                                                className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all p-1 bg-white flex-shrink-0 ${activeImage === i ? 'border-secondary shadow-lg scale-110' : 'border-transparent opacity-40 hover:opacity-100 hover:scale-105'
                                                    }`}
                                            >
                                                <img src={img} alt={`Slide ${i + 1}`} className="w-full h-full object-cover rounded-xl" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="py-20 border-y border-slate-100 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`grid grid-cols-2 md:grid-cols-${Math.min(attributes.length, 4)} gap-12`}>
                        {isLoading ? (
                            [1, 2, 3, 4].map(i => (
                                <div key={i} className="flex flex-col items-center text-center">
                                    <Skeleton className="w-16 h-16 rounded-2xl mb-4" />
                                    <Skeleton className="h-4 w-24 mb-2" />
                                    <Skeleton className="h-3 w-32" />
                                </div>
                            ))
                        ) : (
                            attributes.map((item, i) => (
                                <div key={i} className="flex flex-col items-center text-center group">
                                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-primary mb-4 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                                        <CheckCircle2 size={28} />
                                    </div>
                                    <h4 className="font-bold text-primary mb-1">{item.label}</h4>
                                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{item.desc}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* 3. Why Choose Section */}
            <section className="py-32 overflow-hidden bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-10"
                        >


                            <h2 className="text-4xl md:text-5xl font-black text-primary leading-tight">
                                {isLoading ? (
                                    <Skeleton className="h-12 w-3/4 mx-auto" />
                                ) : (
                                    category?.detailTitle || `Why Choose ${category?.title || 'Our Product'}?`
                                )}
                            </h2>

                            <div className="space-y-6">
                                {isLoading ? (
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-2/3 mx-auto" />
                                    </div>
                                ) : category?.longDescription ? (
                                    <div className="text-xl text-slate-600 leading-relaxed font-medium whitespace-pre-line">
                                        {category.longDescription}
                                    </div>
                                ) : (
                                    <p className="text-xl text-slate-600 leading-relaxed font-medium">
                                        Our {category?.title?.toLowerCase()} collection represents the pinnacle of European window design, adapted specifically for the unique environment of New Zealand.
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 max-w-2xl mx-auto">
                                {isLoading ? (
                                    [1, 2, 3, 4].map(i => (
                                        <div key={i} className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                            <Skeleton className="w-5 h-5 rounded-full shrink-0" />
                                            <Skeleton className="h-4 w-full" />
                                        </div>
                                    ))
                                ) : badges.map((text, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                        <CheckCircle2 size={20} className="text-green-500 shrink-0" />
                                        <span className="text-sm font-bold text-slate-700">{text}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 4. Technical Excellence - Simplified & Elegant Ledger Style */}
            {(!isLoading && category?.specs && Object.keys(category.specs).length > 0) && (
                <section className="py-24 bg-white border-t border-slate-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

                            {/* Brand & Narrative Side */}
                            <div className="lg:col-span-4 space-y-10">
                                <div className="space-y-4">
                                    <span className="text-secondary text-xs font-black uppercase tracking-[0.3em]">Technical Excellence</span>
                                    <h2 className="text-4xl font-black text-primary tracking-tighter leading-none">
                                        System <br /> <span className="text-secondary/80 font-light italic">Integrity.</span>
                                    </h2>
                                </div>
                                <div className="text-sm text-slate-500 font-medium leading-relaxed">
                                    <p className="mb-8">Powered by internationally recognized **VEKA SOFTLINE** engineering, our systems are precisely calibrated for New Zealand's rigorous environments.</p>

                                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                                        <img
                                            src="https://thewindowcompany.co.nz/wp-content/uploads/2023/11/veka-logo-F1E4F9CE48-seeklogo.com_resized_resized.png"
                                            alt="VEKA Partner"
                                            className="h-6 w-auto grayscale opacity-50"
                                        />
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Authenticated German Profile</p>
                                        <button
                                            onClick={() => setIsVekaDrawerOpen(true)}
                                            className="text-xs font-black text-primary hover:text-secondary flex items-center gap-2 transition-colors group"
                                        >
                                            FULL SYSTEM DOCUMENTATION <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Precise Technical Ledger Side */}
                            <div className="lg:col-span-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2">
                                    {Object.entries(category.specs).map(([key, value], i) => (
                                        <div
                                            key={i}
                                            className="py-6 border-b border-slate-100 flex flex-col justify-center group"
                                        >
                                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1 group-hover:text-secondary transition-colors">
                                                {key}
                                            </span>
                                            <p className="text-primary font-bold text-lg leading-tight tracking-tight">
                                                {value}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-12 flex items-center gap-6 p-4 bg-primary/[0.02] rounded-2xl border border-primary/5">
                                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-secondary">
                                        <Zap size={18} />
                                    </div>
                                    <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                                        All specifications are subject to custom architectural requirements. <br />
                                        <span className="text-primary font-bold">Consult our team for custom sizing and configuration.</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            )}



            <VekaDrawer isOpen={isVekaDrawerOpen} onClose={() => setIsVekaDrawerOpen(false)} />

            {/* 6. Related Products Section */}
            {!isLoading && relatedProducts.length > 0 && (
                <section className="py-24 bg-slate-50 border-t border-slate-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                            <div className="space-y-3">
                                <span className="text-secondary text-xs font-black uppercase tracking-[0.3em]">Explore Collection</span>
                                <h2 className="text-3xl md:text-5xl font-black text-primary tracking-tighter">More <span className="text-secondary/80 font-light italic">Designs.</span></h2>
                            </div>
                            <Link to="/products" className="text-sm font-bold text-primary hover:text-secondary flex items-center gap-2 group transition-colors">
                                View Full Collection <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map((prod) => (
                                <Link
                                    key={prod.id}
                                    to={`/category/${prod.id}`}
                                    className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col"
                                    onClick={() => window.scrollTo(0, 0)}
                                >
                                    <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                                        <img
                                            src={prod.image}
                                            alt={prod.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors" />
                                    </div>
                                    <div className="p-6">
                                        <h4 className="text-primary font-bold text-lg mb-1 group-hover:text-secondary transition-colors">{prod.title}</h4>
                                        <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">{prod.type}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 7. Contact Section */}
            <div className="bg-white">
                <QuoteForm />
            </div>

            <VekaDrawer isOpen={isVekaDrawerOpen} onClose={() => setIsVekaDrawerOpen(false)} />
        </main>
    );
};

export default CategoryDetail;
