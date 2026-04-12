import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, FileText, ShieldCheck, X, Mail, Phone } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import QuoteForm from '../components/QuoteForm';

const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-slate-200 rounded-xl ${className}`} />
);

const ProductDetail = () => {
    const { id } = useParams();
    const { products, isLoading } = useAdmin();
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isZooming, setIsZooming] = useState(false);
    const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
    const [isFullscreenGalleryOpen, setIsFullscreenGalleryOpen] = useState(false);

    // Prevent body scroll when gallery is open
    useEffect(() => {
        if (isFullscreenGalleryOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isFullscreenGalleryOpen]);

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.pageX - left - window.scrollX) / width) * 100;
        const y = ((e.pageY - top - window.scrollY) / height) * 100;
        setZoomPos({ x, y });
    };

    // Find product within nested structure
    let product = null;
    let parentCategory = null;

    for (const cat of (products || [])) {
        const found = (cat?.products || []).find(p => p.id === id);
        if (found) {
            product = found;
            parentCategory = cat;
            break;
        }
    }

    if (!product && !isLoading) {
        return (
            <div className="pt-32 pb-24 text-center">
                <h2 className="text-2xl font-bold">Product not found</h2>
                <Link to="/products" className="text-secondary hover:underline mt-4 inline-block">Back to Products</Link>
            </div>
        );
    }

    const specs = product?.specs || {};
    const specEntries = Object.entries(specs);

    return (
        <main className="pt-24 bg-white min-h-screen">
            {/* Breadcrumb / Back */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {isLoading ? (
                    <Skeleton className="h-6 w-32" />
                ) : (
                    <Link to={`/category/${parentCategory?.id}`} className="inline-flex items-center text-slate-500 hover:text-primary transition-colors">
                        <ArrowLeft size={16} className="mr-2" /> Back to {parentCategory?.title}
                    </Link>
                )}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left Column: Image Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            {/* Main Image */}
                            {isLoading ? (
                                <Skeleton className="aspect-[4/5] w-full rounded-3xl" />
                            ) : (
                                <div
                                    className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative bg-slate-100 group lg:cursor-default cursor-zoom-in"
                                    onMouseEnter={() => setIsZooming(true)}
                                    onMouseLeave={() => setIsZooming(false)}
                                    onMouseMove={handleMouseMove}
                                    onClick={() => {
                                        if (window.innerWidth < 1024) {
                                            setIsFullscreenGalleryOpen(true);
                                        }
                                    }}
                                >
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={activeImageIndex}
                                            src={product.images && product.images.length > 0 ? product.images[activeImageIndex] : product.image}
                                            alt={product.title}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="w-full h-full object-cover transition-transform duration-300"
                                            style={{
                                                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                                                transform: isZooming ? 'scale(1.5)' : 'scale(1)'
                                            }}
                                        />
                                    </AnimatePresence>

                                    {/* Desktop Magnifier Lens Effect (Optional visual cue) */}
                                    {isZooming && (
                                        <div className="absolute inset-0 pointer-events-none hidden lg:block">
                                            <div
                                                className="absolute w-40 h-40 border-2 border-white/50 rounded-full shadow-2xl bg-white/10 backdrop-blur-[1px] -translate-x-1/2 -translate-y-1/2"
                                                style={{
                                                    left: `${zoomPos.x}%`,
                                                    top: `${zoomPos.y}%`,
                                                }}
                                            />
                                        </div>
                                    )}

                                    {/* Zoom Instruction - Hidden on Mobile */}
                                    <div className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block">
                                        Hover to Zoom
                                    </div>

                                    {/* Click Instruction - Mobile Only */}
                                    <div className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-bold lg:hidden">
                                        Tap to Enlarge
                                    </div>

                                    {/* Compliance Badge */}
                                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-primary/10 flex items-center gap-2 z-10">
                                        <ShieldCheck size={18} className="text-green-600" />
                                        <span className="text-primary font-bold text-sm">NZS4211 Compliant</span>
                                    </div>
                                </div>
                            )}

                            {/* Thumbnails */}
                            {isLoading ? (
                                <div className="flex gap-3">
                                    {[1, 2, 3, 4].map(i => <Skeleton key={i} className="w-24 h-24" />)}
                                </div>
                            ) : product.images && product.images.length > 1 && (
                                <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                                    {product.images.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveImageIndex(index)}
                                            className={`relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${activeImageIndex === index
                                                ? 'border-secondary ring-2 ring-secondary/20 shadow-md scale-105'
                                                : 'border-slate-100 hover:border-slate-300 opacity-70 hover:opacity-100 hover:scale-[1.02]'
                                                }`}
                                        >
                                            <img src={img} alt={`${product.title} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Right Column: Specs & Info */}
                    {/* Right Column: Specs & Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex-1"
                    >
                        {isLoading ? (
                            <div className="space-y-6">
                                <Skeleton className="h-12 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-5/6" />
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-8">
                                    <Skeleton className="h-14 rounded-xl" />
                                    <Skeleton className="h-14 rounded-xl" />
                                </div>
                            </div>
                        ) : (
                            <>
                                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">{product.title}</h1>
                                <p className="text-secondary font-bold tracking-wider uppercase text-sm mb-6 flex items-center gap-2">
                                    Haven Windows & Doors Manufacturer <span className="text-slate-300">|</span> New Zealand Standard
                                </p>

                                <div className="prose prose-slate mb-8 text-slate-600 leading-relaxed">
                                    <p>{product.longDescription}</p>
                                </div>

                                {/* Specifications Grid */}
                                {specEntries.length > 0 && (
                                    <div className="mb-12">
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-primary/10 p-2.5 rounded-xl text-primary font-bold">
                                                    <FileText size={22} strokeWidth={2.5} />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-primary leading-tight">Technical Data</h3>
                                                    <p className="text-xs text-slate-400 font-medium uppercase tracking-[0.1em] mt-0.5">Specifications & Standards</p>
                                                </div>
                                            </div>
                                            <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-200 to-transparent ml-8 hidden sm:block" />
                                        </div>

                                        <div className="bg-slate-50/50 rounded-3xl border border-slate-100 p-2 sm:p-4">
                                            <div className="divide-y divide-slate-200/60">
                                                {specEntries.map(([key, value]) => (
                                                    <div
                                                        key={key}
                                                        className="flex flex-col sm:flex-row sm:items-center justify-between py-3 px-4 hover:bg-white hover:rounded-xl hover:shadow-sm transition-all duration-200 group"
                                                    >
                                                        <div className="flex items-center gap-3 mb-1 sm:mb-0">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-secondary transition-colors" />
                                                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                                                {key}
                                                            </span>
                                                        </div>
                                                        <span className="text-sm font-bold text-primary sm:text-right group-hover:text-secondary transition-colors break-words sm:max-w-[60%]">
                                                            {value}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                    <button
                                        onClick={() => setIsContactOpen(true)}
                                        className="flex-1 bg-secondary text-white text-center py-4 rounded-xl font-bold hover:bg-secondary-light transition-all shadow-lg hover:shadow-secondary/20 flex items-center justify-center gap-2"
                                    >
                                        <Mail size={18} />
                                        Contact Now
                                    </button>
                                    <a
                                        href="tel:+6421123456"
                                        className="flex-1 bg-primary text-white text-center py-4 rounded-xl font-bold hover:bg-primary-light transition-all flex items-center justify-center gap-2"
                                    >
                                        <Phone size={18} />
                                        Call Us
                                    </a>
                                </div>

                                {/* Features List */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {['German Engineering', '10 Year Warranty', 'Custom Sizes', 'Expert Installation'].map((feature) => (
                                        <div key={feature} className="flex items-center gap-3 bg-white border border-slate-100 p-3 rounded-lg shadow-sm">
                                            <div className="bg-green-100 p-1 rounded-full">
                                                <Check size={14} className="text-green-600" />
                                            </div>
                                            <span className="text-sm font-medium text-slate-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Image Gallery Fullscreen Modal */}
            <AnimatePresence>
                {isFullscreenGalleryOpen && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative w-full h-full flex flex-col p-4 md:p-8"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsFullscreenGalleryOpen(false)}
                                className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-[1010]"
                            >
                                <X size={24} />
                            </button>

                            {/* Main Gallery Image - Properly fitting viewport */}
                            <div className="flex-1 flex items-center justify-center p-4 min-h-0">
                                <motion.img
                                    key={activeImageIndex}
                                    src={product?.images && product?.images.length > 0 ? product?.images[activeImageIndex] : product?.image}
                                    alt={product?.title}
                                    className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl shadow-2xl"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>

                            {/* Gallery Navigation / Thumbnails */}
                            {product?.images && product?.images.length > 1 && (
                                <div className="py-6 overflow-x-auto flex-shrink-0">
                                    <div className="flex justify-center gap-3">
                                        {product?.images.map((img, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setActiveImageIndex(index)}
                                                className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${activeImageIndex === index
                                                    ? 'border-secondary scale-110 shadow-lg'
                                                    : 'border-white/10 opacity-50 hover:opacity-100'
                                                    }`}
                                            >
                                                <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Product Info in Gallery */}
                            <div className="text-center pb-4 md:pb-8 flex-shrink-0">
                                <h2 className="text-white text-xl font-bold">{product?.title}</h2>
                                <p className="text-white/50 text-sm mt-1">Image {activeImageIndex + 1} of {(product?.images || [product?.image]).length}</p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Custom Contact Modal */}
            <AnimatePresence>
                {isContactOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsContactOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl z-10"
                        >
                            <button
                                onClick={() => setIsContactOpen(false)}
                                className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors z-20"
                            >
                                <X size={20} className="text-slate-600" />
                            </button>

                            <QuoteForm isModal={true} />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </main>
    );
};

export default ProductDetail;
