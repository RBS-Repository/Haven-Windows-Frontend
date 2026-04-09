import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ShieldCheck, Palette, FileSearch, Layers, Award, X, ZoomIn } from 'lucide-react';

const ProductSpecifications = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    // Prevent background scrolling when lightbox is open
    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [selectedImage]);

    const profiles = [
        {
            id: 'ad70',
            name: 'Veka AD70 Profile',
            tagline: 'High-Rise & High Wind-Load Performance',
            description: 'SOFTLINE 70 AD with 70 mm basic depth is the classic in the VEKA profile range. Its timeless design with the slightly rounded contour and particularly narrow face widths is also found in the subsequent profile generations. Even highly insulating triple glazing can be used in SOFTLINE 70 AD if the sash dimensions are not too large.',
            link: 'https://www.veka.de/window-fabricators/products-services/windows/softline-70-ad/',
            image: 'https://vekaprod-media.e-spirit.cloud/807387f8-5f46-4a13-bd21-354b3c778f74/editorial_media/produkte/01_fenster/softline-70/fenster-sl70-ad_res_1_1_w700.jpg'
        },
        {
            id: 'ss90',
            name: 'Veka SS90 Profile',
            tagline: 'High-Rise & High Wind-Load Performance',
            description: 'VEKA SOFTLINE SS90 was specifically designed for sliding doors with very high sashes as well as sliding doors in high-rise buildings with high wind-load. If the architectural designs of sliding doors requires no fixed window on top of sliding door with VEKA SOFTLINE SS90 sash height up to 2.5m can be built. Special sill profiles allow for easy entrance while still preserving water tightness.',
            link: 'https://veka.com.sg/project-item/softline-ss90/',
            image: 'https://veka.com.sg/wp-content/uploads/2017/11/VEKA-SOFTLINE-SS90-3d-800px-v2.jpg'
        },
        {
            id: 'ss70',
            name: 'Veka SS70 Profile',
            tagline: 'Medium-Sized Sliding Door Solutions',
            description: 'VEKA SOFTLINE SS70 sliding door provides solutions for medium sized sliding doors with a sash height of 2.2m. Based on the 70mm system depth, all kind of combination windows can be done seamlessly by using the VEKA AD70 system for white but also for Acryl-Color CoEx window. Additional Clip-on profiles provide a variety of fly-net applications.',
            link: 'https://veka.com.sg/project-item/softline-ss70/',
            image: 'https://veka.com.sg/wp-content/uploads/2017/11/20171225-all-products-800px-v2.jpg'
        },
        {
            id: 'ad58',
            name: 'Veka AD58 Profile',
            tagline: 'Versatile Casement System',
            description: 'VEKA SOFTLINE AD58 casement system is a 3-chamber system with 58mm installation depth. VEKA has extruded this system for over 25 years. This very versatile and complete system is the all-round solution for all window and door needs – inward as well as outward opening window and door systems.',
            link: 'https://veka.com.sg/project-item/softline-ad58/',
            image: 'https://veka.com.sg/wp-content/uploads/2017/10/VEKA-SOFTLINE-AD58-3d-800px-705x705.jpg'
        }
    ];

    const colors = [
        { name: 'Color Option 1', img: '/Color 1.jpg' },
        { name: 'Color Option 2', img: '/Color 2.jpg' },
        { name: 'Color Option 3', img: '/Color 3.jpg' },
        { name: 'Color Option 4', img: '/Color 4.jpg' }
    ];

    return (
        <div className="pt-32 pb-24 bg-white min-h-screen">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl"
                >
                    <div className="inline-flex items-center space-x-2 bg-secondary/10 px-4 py-2 rounded-full mb-8">
                        <Layers size={16} className="text-secondary" />
                        <span className="text-secondary font-bold uppercase tracking-widest text-[10px]">Technical Excellence</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-primary mb-8 tracking-tighter leading-tight">
                        Product <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary-light">Specifications</span>
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed font-light">
                        All Haven Windows and Doors products are made using premium German-engineered <span className="font-bold text-primary italic">VEKA uPVC profiles</span>. Explore the technical details of our core range below.
                    </p>
                </motion.div>
            </div>

            {/* Profile Selection */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 mb-32">
                {profiles.map((profile, index) => (
                    <motion.div
                        key={profile.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
                    >
                        <div className="lg:col-span-5">
                            <div className="text-secondary font-bold text-sm tracking-[0.2em] uppercase mb-4">{profile.tagline}</div>
                            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">{profile.name}</h2>
                            <p className="text-lg text-slate-500 leading-relaxed mb-8">
                                {profile.description}
                            </p>
                            <a
                                href={profile.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 group text-primary font-bold hover:text-secondary transition-colors"
                            >
                                Technical Datasheet <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </a>
                        </div>
                        <div
                            onClick={() => setSelectedImage(profile.image)}
                            className="lg:col-span-7 bg-slate-50 rounded-[40px] overflow-hidden aspect-[16/9] flex items-center justify-center relative border border-slate-100 shadow-inner group/img p-8 md:p-12 cursor-pointer"
                        >
                            <img
                                src={profile.image}
                                alt={profile.name}
                                className="max-w-full max-h-full object-contain transition-transform duration-[2s] group-hover/img:scale-105 drop-shadow-md"
                            />

                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/img:opacity-100 transition-opacity" />

                            {/* Technical Badge Overlay */}
                            <div className="absolute top-6 right-6 flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm border border-slate-100 opacity-0 group-hover/img:opacity-100 transition-all duration-500 scale-90 group-hover/img:scale-100">
                                <ZoomIn size={14} className="text-secondary" />
                                <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Click to Zoom</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Colours Available Section */}
            <div className="bg-slate-50 py-32 mb-32 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center space-x-2 bg-secondary/10 px-4 py-2 rounded-full mb-6">
                                <Palette size={16} className="text-secondary" />
                                <span className="text-secondary font-bold uppercase tracking-widest text-[10px]">Aesthetics & Finishes</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Colours Available</h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                Our windows and doors come standard with a white profile. Optional Renolit colour film finishes are available and applied to the exterior sides of the frame.
                            </p>
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <div className="flex items-center gap-4 text-primary font-bold mb-2">
                                    <ShieldCheck className="text-secondary" /> Standard Finish
                                </div>
                                <p className="text-slate-500 text-sm">Classic White uPVC Profile (UV Stable)</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {colors.map((color, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -5 }}
                                    onClick={() => setSelectedImage(color.img)}
                                    className="relative group aspect-square rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-white flex items-center justify-center p-4 cursor-pointer"
                                >
                                    <img src={color.img} alt={color.name} className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-sm" />
                                    <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="bg-white/90 p-2 rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform duration-300">
                                            <ZoomIn size={20} className="text-secondary" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <p className="text-xs text-white font-medium italic">Renolit Finish Sample</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Sample Pictures Gallery */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center space-x-2 bg-secondary/10 px-4 py-2 rounded-full mb-4">
                        <FileSearch size={16} className="text-secondary" />
                        <span className="text-secondary font-bold uppercase tracking-widest text-[10px]">Close-up Details</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Product Sample Pictures</h2>
                    <p className="text-slate-500 max-w-xl mx-auto italic font-medium">Please see corner detail images of VEKA AD70 profile below:</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        '/Product sample pictures.jpg',
                        '/Product sample pictures 2.jpg'
                    ].map((img, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            onClick={() => setSelectedImage(img)}
                            className="bg-white rounded-3xl overflow-hidden aspect-[16/10] border border-slate-200 group cursor-pointer relative shadow-lg p-6 flex items-center justify-center"
                        >
                            <img src={img} alt="Product Close-up Detail" className="max-w-full max-h-full object-contain transform transition-transform duration-[2s] group-hover:scale-105 drop-shadow-sm" />
                            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30 scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500">
                                    <ZoomIn size={32} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[200] bg-primary/95 backdrop-blur-lg flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-8 right-8 z-[210] text-white/70 hover:text-white transition-colors"
                        >
                            <X size={40} strokeWidth={1} />
                        </motion.button>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="relative w-full h-full flex items-center justify-center p-4 md:p-12"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage}
                                alt="Full scale specification view"
                                className="max-w-[95vw] max-h-[90vh] w-auto h-auto object-contain rounded-2xl shadow-2xl drop-shadow-[0_20px_50px_rgba(255,255,255,0.2)] bg-white/10"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CodeMark Certified Section */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-primary rounded-[40px] p-8 md:p-16 relative overflow-hidden text-white"
                >
                    {/* Decorative element */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blend-screen -translate-y-1/2 translate-x-1/2" />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                        <div className="lg:col-span-7">
                            <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full mb-8">
                                <Award size={20} className="text-secondary" />
                                <span className="text-white font-bold uppercase tracking-widest text-[10px]">New Zealand Certified</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight text-white">Proudly CodeMark <br />Certified</h2>
                            <p className="text-xl text-slate-300 leading-relaxed mb-10 font-light">
                                Haven Windows and Doors products are CodeMark certified, ensuring compliance with the New Zealand Building Code and maintaining a high standard of quality.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 mt-1">
                                        <div className="w-2 h-2 rounded-full bg-secondary" />
                                    </div>
                                    <p className="text-white font-medium">Compliance with NZ Building Code requirements</p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 mt-1">
                                        <div className="w-2 h-2 rounded-full bg-secondary" />
                                    </div>
                                    <p className="text-white font-medium">High standard of manufacturing quality</p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-5 bg-white p-6 rounded-3xl shadow-2xl flex items-center justify-center">
                            <img src="/Proudly Codemark Certified.jpg" alt="Proudly Codemark Certified" className="max-w-full max-h-[400px] object-contain rounded-xl" />
                        </div>
                    </div>
                </motion.div>

                <div className="mt-12 text-center text-slate-400 text-sm italic">
                    Supporting documentation is available upon request.
                </div>
            </div>
        </div>
    );
};

export default ProductSpecifications;
