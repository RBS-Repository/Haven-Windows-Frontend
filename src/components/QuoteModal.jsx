import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';

const QuoteModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show modal immediately
        setIsOpen(true);
    }, []);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 md:p-10 relative z-10 pointer-events-auto overflow-hidden"
                    >
                        {/* Decorative Circle */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-secondary/10 rounded-full" />
                        <div className="absolute top-10 -left-10 w-20 h-20 bg-primary/5 rounded-full" />

                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex justify-center mb-6">
                            <img src="/logo.png" alt="Haven Windows & Doors" className="h-12 object-contain" />
                        </div>

                        <div className="flex justify-center mb-6">
                            <div className="bg-green-100 p-4 rounded-full">
                                <Check size={40} className="text-green-600" />
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-center text-primary mb-4">Already have a quote?</h3>

                        <p className="text-center text-slate-600 mb-8 text-lg">
                            We aim to beat any comparable written quote by up to * <span className="font-bold text-secondary text-xl">15%</span>.
                        </p>

                        <div className="space-y-4">
                            <a
                                href="#contact"
                                onClick={() => setIsOpen(false)}
                                className="block w-full bg-primary text-white text-center py-4 rounded-xl font-bold text-lg hover:bg-secondary transition-colors"
                            >
                                Enquire now
                            </a>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="block w-full text-slate-400 text-sm font-medium hover:text-slate-600"
                            >
                                No thanks
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default QuoteModal;
