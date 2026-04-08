import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
    ChevronRight, 
    ShieldCheck, 
    Thermometer, 
    Wind, 
    Volume2, 
    Maximize2, 
    ArrowRight, 
    LayoutGrid, 
    Zap,
    CheckCircle2
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

    // Find the category/product type
    const category = categories.find(c => c.id === id);
    
    // Use the first product as the representative data, or fallback to category info
    const representativeProduct = category?.products?.[0] || null;

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
            {/* 1. Hero / Header Section */}
            <section className="relative pt-32 pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-slate-50 -z-10" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumbs */}
                    <div className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-12">
                        <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
                        <ChevronRight size={14} className="mx-2" />
                        <span className="text-secondary">{category?.title}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div {...fadeIn}>
                            <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary text-xs font-black uppercase tracking-[0.2em] rounded-full mb-6">
                                Product Showcase
                            </span>
                            <h1 className="text-5xl md:text-7xl font-black text-primary leading-[1.1] tracking-tighter mb-8">
                                {category?.title}
                            </h1>
                            <p className="text-xl text-slate-500 leading-relaxed font-medium mb-10">
                                {category?.description}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button 
                                    onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                                    className="px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-secondary transition-all shadow-xl shadow-primary/10 flex items-center gap-2"
                                >
                                    Get Pricing Info <ArrowRight size={20} />
                                </button>
                                <button 
                                    onClick={() => setIsVekaDrawerOpen(true)}
                                    className="px-8 py-4 bg-white text-primary border border-slate-200 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center gap-2"
                                >
                                    Technical Specs <LayoutGrid size={20} />
                                </button>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="absolute -inset-4 bg-secondary/10 blur-3xl rounded-full" />
                            <div className="relative aspect-[4/5] md:aspect-square bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-white p-4">
                                {isLoading ? (
                                    <Skeleton className="w-full h-full" />
                                ) : (
                                    <img 
                                        src={category?.image} 
                                        alt={category?.title}
                                        className="w-full h-full object-cover rounded-[2.5rem]"
                                    />
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. Key Attributes - Horizontal Icons */}
            <section className="py-20 border-y border-slate-100 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {[
                            { icon: Thermometer, label: 'Thermal Efficiency', desc: 'Superior U-Values' },
                            { icon: Wind, label: 'Airtight Design', desc: 'Draft-free living' },
                            { icon: Volume2, label: 'Noise Control', desc: 'Peaceful interiors' },
                            { icon: ShieldCheck, label: 'NZ Compliance', desc: 'NZS4211 Certified' }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center group">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-primary mb-4 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                                    <item.icon size={28} />
                                </div>
                                <h4 className="font-bold text-primary mb-1">{item.label}</h4>
                                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Detailed Explanation Section - How it Works */}
            <section className="py-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1 relative">
                             {/* Decorative Background */}
                            <div className="absolute -top-20 -left-20 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
                            
                            <div className="relative space-y-12">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20">1</div>
                                        <h3 className="text-2xl font-black text-primary">Intelligent Operation</h3>
                                    </div>
                                    <p className="text-lg text-slate-500 leading-relaxed pl-16">
                                        Designed for the modern New Zealand home, our {category?.title} systems utilize premium multi-point locking mechanisms for effortless operation and maximum security.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-secondary/20">2</div>
                                        <h3 className="text-2xl font-black text-primary">Unrivaled Insulation</h3>
                                    </div>
                                    <p className="text-lg text-slate-500 leading-relaxed pl-16">
                                        Multi-chambered uPVC profiles combined with expert dual-sealing ensures that heat stays in during winter and out during summer, drastically reducing energy costs.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-slate-900/20">3</div>
                                        <h3 className="text-2xl font-black text-primary">Low Maintenance</h3>
                                    </div>
                                    <p className="text-lg text-slate-500 leading-relaxed pl-16">
                                        Unlike timber or aluminum, high-grade uPVC will never rot, warp, or corrode. A simple wipe down is all it takes to keep your {category?.title.toLowerCase()} looking new for decades.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <motion.div 
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="space-y-10"
                            >
                                <span className="text-secondary text-sm font-black uppercase tracking-[0.3em]">Precision Engineering</span>
                                <h2 className="text-4xl md:text-5xl font-black text-primary leading-tight">
                                    Why Choose {category?.title}?
                                </h2>
                                <div className="space-y-4">
                                    {representativeProduct?.longDescription ? (
                                        <p className="text-xl text-slate-600 leading-relaxed font-light italic">
                                            "{representativeProduct.longDescription}"
                                        </p>
                                    ) : (
                                        <p className="text-xl text-slate-600 leading-relaxed font-light italic">
                                            Our {category?.title.toLowerCase()} collection represents the pinnacle of European window design, adapted specifically for the unique environment of New Zealand.
                                        </p>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                                    {['A+ Energy Rated', 'Noise Reduction Up to 45dB', 'UV Resistant Finish', 'Child Safe Hardwire'].map((text, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                            <CheckCircle2 size={20} className="text-green-500 shrink-0" />
                                            <span className="text-sm font-bold text-slate-700">{text}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Technical Excellence Section - Redesigned to be Architectural & Clean */}
            <section className="py-32 bg-slate-50 relative overflow-hidden">
                {/* Subtle Technical Grid Background */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                    style={{ backgroundImage: 'radial-gradient(#1a2b4b 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
                />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20">
                        <div className="max-w-2xl space-y-4">
                            <div className="flex items-center gap-3 text-secondary">
                                <span className="h-px w-8 bg-secondary" />
                                <span className="text-xs font-black uppercase tracking-[0.3em]">The Foundation</span>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-black text-primary tracking-tighter">
                                Technical <span className="text-secondary/80 font-light italic">Excellence.</span>
                            </h2>
                            <p className="text-lg text-slate-500 font-medium leading-relaxed">
                                Every {category?.title.toLowerCase()} system is powered by the internationally recognized **VEKA SOFTLINE** engineering, designed specifically to withstand New Zealand's harsh UV and wind conditions.
                            </p>
                        </div>
                        
                        {/* VEKA Branding Card */}
                        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center max-w-xs shrink-0 transform hover:-translate-y-1 transition-transform">
                            <img 
                                src="https://thewindowcompany.co.nz/wp-content/uploads/2023/11/veka-logo-F1E4F9CE48-seeklogo.com_resized_resized.png" 
                                alt="VEKA Partner" 
                                className="h-10 w-auto mb-6 grayscale hover:grayscale-0 transition-all duration-500"
                            />
                            <h4 className="text-primary font-bold text-lg mb-2">Authenticated System</h4>
                            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-6">Germany's Leading Profile</p>
                            <button 
                                onClick={() => setIsVekaDrawerOpen(true)}
                                className="px-6 py-3 bg-slate-900 text-white text-xs font-bold rounded-full hover:bg-secondary transition-all flex items-center gap-2"
                            >
                                SYSTEM SPECS <Maximize2 size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Integrated Specs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { k: 'Seal Type', v: 'Dual-seal system with premium EPDM durable gaskets', icon: Wind },
                            { k: 'Glazing Cap', v: 'Up to 40mm IGUs for maximum thermal performance', icon: Thermometer },
                            { k: 'Mechanicals', v: 'German ROTO or SIEGENIA multipoint hardware', icon: Zap },
                            { k: 'Standard', v: 'NZS 4211:2008 Wind Zones Extra High', icon: ShieldCheck },
                            { k: 'Life Expectancy', v: '40+ Year service life in New Zealand conditions', icon: Zap },
                            { k: 'Sustainability', v: '100% Recyclable lead-free uPVC compounds', icon: LayoutGrid }
                        ].map((spec, i) => (
                            <div 
                                key={i} 
                                className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-secondary/20 transition-all group shadow-sm hover:shadow-xl hover:shadow-secondary/5"
                            >
                                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
                                    <spec.icon size={22} />
                                </div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block">{spec.k}</span>
                                <p className="text-primary font-bold text-lg leading-snug group-hover:text-secondary transition-colors line-clamp-2">
                                    {spec.v}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Certification Bottom Bar */}
                    <div className="mt-16 bg-primary rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-full bg-white/5 skew-x-12 transform translate-x-32" />
                        <div className="flex items-center gap-6 relative z-10">
                            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
                                <ShieldCheck size={40} className="text-secondary" />
                            </div>
                            <div className="space-y-1 text-left">
                                <h4 className="text-white text-2xl font-black tracking-tight">CodeMark Certified</h4>
                                <p className="text-slate-300 text-sm font-medium">Full compliance with New Zealand Building Code (NZBC)</p>
                            </div>
                        </div>
                        <Link 
                            to="/product-specifications" 
                            className="bg-white text-primary px-8 py-4 rounded-2xl font-bold text-sm hover:bg-secondary hover:text-white transition-all shadow-lg relative z-10"
                        >
                            View Full Certificates
                        </Link>
                    </div>
                </div>
            </section>

            {/* 5. Contact Section */}
            <div className="bg-white">
                <QuoteForm />
            </div>

            <VekaDrawer isOpen={isVekaDrawerOpen} onClose={() => setIsVekaDrawerOpen(false)} />
        </main>
    );
};

export default CategoryDetail;
