


import { motion } from 'framer-motion';
import { Tag, ArrowRight } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const PromoSection = () => {
    const { promo } = useAdmin();

    return (
        <section className="bg-secondary text-white py-12 relative overflow-hidden">
            {/* Decorative Patterns */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-50%] left-[-10%] w-[500px] h-[500px] rounded-full border-[40px] border-white/20" />
                <div className="absolute bottom-[-50%] right-[-10%] w-[600px] h-[600px] rounded-full border-[60px] border-white/10" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                    <div className="flex items-start gap-6">
                        <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                            <Tag size={32} className="text-white" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="bg-white text-secondary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    {promo.tagText}
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-2">{promo.title}</h2>
                            <p className="text-white/90 max-w-xl text-lg">
                                {promo.description} <span className="font-bold underline">{promo.highlightText}</span>.
                            </p>
                            <p className="text-white/60 text-[10px] mt-2 italic">*Minimum order of 10 windows and 2 doors applies</p>
                        </div>
                    </div>

                    <motion.a
                        href={promo.buttonLink}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-secondary px-8 py-4 rounded-full font-bold flex items-center gap-2 shadow-lg shadow-black/10 whitespace-nowrap"
                    >
                        {promo.buttonText} <ArrowRight size={20} />
                    </motion.a>

                </div>
            </div>
        </section>
    );
};

export default PromoSection;
