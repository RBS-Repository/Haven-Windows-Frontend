import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight, MapPin, Loader2 } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const Gallery = () => {
    const { gallery, isLoading } = useAdmin();
    const [selectedImg, setSelectedImg] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = (index) => {
        setSelectedImg(gallery[index]);
        setCurrentIndex(index);
    };

    const nextImage = (e) => {
        e.stopPropagation();
        const newIndex = (currentIndex + 1) % gallery.length;
        setCurrentIndex(newIndex);
        setSelectedImg(gallery[newIndex]);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        const newIndex = (currentIndex - 1 + gallery.length) % gallery.length;
        setCurrentIndex(newIndex);
        setSelectedImg(gallery[newIndex]);
    };

    if (isLoading) {
        return (
            <div className="py-32 flex items-center justify-center">
                <Loader2 className="animate-spin text-secondary" size={40} />
            </div>
        );
    }

    return (
        <section id="gallery" className="py-32 bg-[#F8FAFC] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
                    <div className="relative">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '100px' }}
                            className="h-1.5 bg-secondary mb-6 rounded-full"
                        />
                        <h2 className="text-5xl md:text-7xl font-black text-primary tracking-tighter leading-none mb-6">
                            OUR <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">RANGE</span>
                        </h2>
                        <p className="text-lg text-slate-500 max-w-md font-medium">
                            Examples of uPVC window and door styles available through our supply. Images are for reference purposes.
                        </p>
                    </div>
                </div>

                {/* Masonry-style Grid */}
                {gallery.length > 0 ? (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                        {gallery.map((img, index) => (
                            <motion.div
                                key={img._id || index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                onClick={() => openLightbox(index)}
                                className="group relative break-inside-avoid rounded-[2rem] overflow-hidden bg-white shadow-2xl shadow-slate-200/50 cursor-pointer"
                            >
                                <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-auto overflow-hidden">
                                    <img
                                        src={img.url}
                                        alt={img.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 group-hover:rotate-1"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 transform translate-y-4 group-hover:translate-y-0">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="px-3 py-1 bg-secondary text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                                                {img.category}
                                            </span>
                                        </div>


                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                        <p className="text-slate-400">No photos added yet. Update the gallery in the Admin Panel.</p>
                    </div>
                )}
            </div>

            {/* Lightbox Portal */}
            <AnimatePresence>
                {selectedImg && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImg(null)}
                        className="fixed inset-0 z-[200] bg-primary/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
                    >
                        <button
                            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-30"
                            onClick={() => setSelectedImg(null)}
                        >
                            <X size={40} strokeWidth={1.5} />
                        </button>

                        <div className="relative w-full max-w-6xl h-full flex flex-col items-center justify-center">
                            <button onClick={prevImage} className="absolute left-0 md:-left-20 top-1/2 -translate-y-1/2 p-4 text-white/30 hover:text-white transition-all bg-white/5 rounded-full hover:bg-white/10">
                                <ChevronLeft size={48} strokeWidth={1.5} />
                            </button>
                            <button onClick={nextImage} className="absolute right-0 md:-right-20 top-1/2 -translate-y-1/2 p-4 text-white/30 hover:text-white transition-all bg-white/5 rounded-full hover:bg-white/10">
                                <ChevronRight size={48} strokeWidth={1.5} />
                            </button>

                            <motion.div key={currentIndex} initial={{ x: 50, opacity: 0, scale: 0.9 }} animate={{ x: 0, opacity: 1, scale: 1 }} className="w-full h-full flex flex-col md:flex-row gap-12 items-center">
                                <div className="flex-1 w-full h-[60vh] md:h-full rounded-[3rem] overflow-hidden shadow-2xl ring-1 ring-white/10">
                                    <img src={selectedImg.url} alt={selectedImg.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="w-full md:w-80 text-left space-y-6 shrink-0">
                                    <div>
                                        <div className="h-1 w-12 bg-secondary mb-4 rounded-full" />


                                    </div>
                                    <p className="text-slate-400 leading-relaxed font-medium">Installation Category: {selectedImg.category}</p>
                                    <div className="pt-8 grid grid-cols-1 gap-4">
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                            <div className="text-[10px] font-black text-secondary uppercase mb-1">System</div>
                                            <div className="text-white font-bold">Haven Premium uPVC</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
