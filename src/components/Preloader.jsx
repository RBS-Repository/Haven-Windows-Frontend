import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';

const Preloader = () => {
    const { isLoading } = useAdmin();

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }
                    }}
                    className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center p-8 overflow-hidden"
                >
                    {/* Architectural Mesh Background (Subtle) */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-primary" />
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary" />
                    </div>

                    <div className="relative flex flex-col items-center max-w-xs w-full">
                        {/* Logo Entrance */}
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="mb-12"
                        >
                            <img src="/logo.png" alt="Haven" className="h-16 md:h-20 object-contain" />
                        </motion.div>

                        {/* Progress Container */}
                        <div className="w-full space-y-4">
                            {/* Thin Precision Line */}
                            <div className="h-[2px] w-full bg-slate-100 relative overflow-hidden rounded-full">
                                <motion.div
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{
                                        duration: 2.5,
                                        ease: "easeInOut",
                                        repeat: Infinity
                                    }}
                                    className="absolute top-0 left-0 h-full bg-secondary"
                                />
                            </div>

                            {/* Status Text */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="flex justify-between items-center"
                            >
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
                                    Synchronizing
                                </span>
                                <span className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">
                                    Haven Portfolio
                                </span>
                            </motion.div>
                        </div>
                    </div>

                    {/* Bottom Detail */}
                    <div className="absolute bottom-12 flex flex-col items-center space-y-2">
                        <div className="w-px h-12 bg-gradient-to-b from-slate-200 to-transparent" />
                        <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                            Est. 2026 • NZ
                        </span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
