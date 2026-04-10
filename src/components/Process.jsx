import { motion } from 'framer-motion';
import { MessageSquare, FileText, Factory, Truck } from 'lucide-react';

const Process = () => {
    const steps = [
        {
            icon: <MessageSquare size={28} />,
            title: "Free Consultation & Measure",
            desc: "We listen to your needs, assess your property, and take accurate measurements. Can't have us visit? Send your measurements for a fast initial estimate.",
            number: "01"
        },
        {
            icon: <FileText size={28} />,
            title: "Unbeatable Quote",
            desc: "We prepare technical drawings and a transparent, all-inclusive quote. We aim to beat any comparable written quote by up to 10% — guaranteed.",
            number: "02"
        },
        {
            icon: <Factory size={28} />,
            title: "Custom Manufacturing",
            desc: "Your uPVC windows and doors are precision-engineered to your exact specifications using premium European profiles and double-glazed units.",
            number: "03"
        },
        {
            icon: <Truck size={28} />,
            title: "Professional Installation",
            desc: "Installation is carried out by experienced & qualified, independent local builders. We coordinate the process to help ensure a smooth and efficient experience.",
            number: "04"
        }
    ];

    return (
        <section className="py-20 md:py-28 bg-gradient-to-b from-primary via-primary to-[#0f1a2e] text-white overflow-hidden relative">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            {/* Subtle Gradient Orbs */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block text-secondary font-semibold tracking-widest uppercase text-xs mb-4 px-4 py-2 bg-secondary/10 rounded-full">Our Process</span>
                        <h2 className="text-5xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                            Seamless Window{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary-light">Replacement</span>
                        </h2>
                    </motion.div>
                </div>

                {/* Process Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.15, duration: 0.6 }}
                            className="group relative"
                        >
                            {/* Card */}
                            <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 h-full transition-all duration-500 hover:bg-white/[0.06] hover:border-secondary/30 hover:shadow-lg hover:shadow-secondary/5">
                                {/* Step Number */}
                                <span className="absolute top-4 right-4 text-5xl md:text-6xl font-black text-white/[0.04] group-hover:text-secondary/10 transition-colors duration-500 select-none">
                                    {step.number}
                                </span>

                                {/* Icon */}
                                <div className="relative z-10 w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-secondary-light flex items-center justify-center text-white mb-6 shadow-lg shadow-secondary/25 group-hover:scale-110 transition-transform duration-500">
                                    {step.icon}
                                </div>

                                {/* Content */}
                                <h4 className="text-lg md:text-xl font-bold mb-3 text-white group-hover:text-secondary-light transition-colors duration-300">
                                    {step.title}
                                </h4>
                                <p className="text-slate-300/80 leading-relaxed text-sm md:text-base">
                                    {step.desc}
                                </p>

                                {/* Decorative Line */}
                                <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Connecting Lines for Desktop */}
                <div className="hidden lg:block absolute top-[55%] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
            </div>
        </section>
    );
};

export default Process;
