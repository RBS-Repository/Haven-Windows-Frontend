import { X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VekaDrawer = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[150]"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-[100dvh] w-full max-w-2xl bg-white shadow-2xl z-[160] overflow-y-auto"
                    >
                        <div className="sticky top-0 right-0 z-[170] flex justify-end p-4 pointer-events-none">
                            <button
                                onClick={onClose}
                                className="bg-white text-slate-400 hover:text-slate-900 p-2 rounded-full shadow-lg border border-slate-100 transition-all pointer-events-auto hover:scale-105"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="px-6 md:px-12 pb-20 -mt-8">
                            {/* Modern, Clean Header */}
                            <div className="mb-10 max-w-2xl mt-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-slate-200">
                                        Tropical Mix
                                    </span>
                                    <span className="text-sm font-semibold text-primary uppercase tracking-widest">
                                        Premium Profile
                                    </span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
                                    VEKA AD70 SOFTLINE
                                </h2>
                                <p className="text-lg text-slate-500 font-medium leading-relaxed">
                                    Energy efficient, multi-chamber uPVC profile engineered specifically for hot climates.
                                </p>
                            </div>

                            {/* Hero Block */}
                            <div className="mb-12 bg-slate-50 border border-slate-100 rounded-[2rem] shadow-inner overflow-hidden flex flex-col items-center justify-center relative p-10 min-h-[300px]">
                                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                                <img
                                    src="/ideal-4000-200x300.png"
                                    alt="VEKA Window Profile Cross Section"
                                    className="relative z-10 w-auto h-[220px] object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
                                />
                                <span className="relative z-10 mt-6 text-xs text-slate-400 uppercase tracking-widest font-bold">Cross-Section Engineering</span>
                            </div>

                            {/* Content */}
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-6">Designed for Performance</h3>
                                <div className="text-slate-600 leading-relaxed text-[15px] space-y-4 mb-12">
                                    <p>
                                        VEKA AD70 SOFTLINE is a high-quality solution for modern window and door systems. Founded in Germany and family-run since 1969, VEKA continues to uphold the values behind its long-standing success—delivering consistent quality, efficiency, dependability, and stability to its partners.
                                    </p>
                                    <p>
                                        The AD70 SOFTLINE range provides cost-effective, energy-saving window and door options suitable for various home styles. Whether for large architectural designs or smaller traditional homes, it comes in a broad selection of colors and opening configurations to match different needs.
                                    </p>
                                    <p>
                                        Built with UV resistance, dual sealing, and five insulation chambers, AD70 SOFTLINE effectively separates indoor and outdoor conditions, making it one of the most energy-efficient systems available in New Zealand. When paired with double or triple glazing, it enhances energy savings while improving comfort and security throughout the year.
                                    </p>
                                </div>

                                <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 md:p-10 mb-12">
                                    <h3 className="text-lg font-bold text-slate-900 mb-6">Technical Specifications</h3>
                                    <ul className="space-y-4">
                                        {[
                                            "UV resistant uPVC profile",
                                            "Designed for hot, sunny climates",
                                            "5 Chamber profile with RAL seal of approval",
                                            "Resists discolouration from sunlight",
                                            "Code Mark Approved through MBIE",
                                            "Free of lead and cadmium",
                                            "Recyclable profile",
                                            "Available for both windows and doors",
                                            "Specially developed PVC profile material can withstand solar radiation up to 160 kcal/cm2 and 180 kcal/cm2"
                                        ].map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-4">
                                                <div className="mt-0.5 bg-white border border-slate-200 shadow-sm p-1.5 rounded-lg shrink-0">
                                                    <Check size={14} className="text-primary" strokeWidth={3} />
                                                </div>
                                                <span className="text-slate-700 leading-relaxed font-medium text-[15px]">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-6">Gallery</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        "https://thewindowcompany.co.nz/wp-content/uploads/2022/10/aluplast-ideal-4000-upvc-window-profile.jpg",
                                        "https://thewindowcompany.co.nz/wp-content/uploads/2022/10/aluplast-ideal-4000-upvc-window-cross-section.jpg",
                                        "https://thewindowcompany.co.nz/wp-content/uploads/2022/10/aluplast-ideal-4000-upvc-window-south-island.jpg",
                                        "https://thewindowcompany.co.nz/wp-content/uploads/2022/10/aluplast-ideal-4000-upvc-window-wellington.jpg"
                                    ].map((src, idx) => (
                                        <div key={idx} className="aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
                                            <img
                                                src={src}
                                                alt={`Detail ${idx + 1}`}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default VekaDrawer;
