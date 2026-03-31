import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import QuoteForm from './QuoteForm';

const QuoteFormModal = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center pointer-events-none px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full relative z-10 pointer-events-auto overflow-y-auto max-h-[90vh]"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-20 text-slate-400 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 p-2 rounded-full transition-colors border border-slate-200"
                        >
                            <X size={20} />
                        </button>
                        <div className="pt-2">
                            <QuoteForm isModal={true} />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default QuoteFormModal;
