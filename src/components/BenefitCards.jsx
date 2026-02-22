import { motion } from 'framer-motion';
import { ArrowRight, Box, ShieldCheck, Zap } from 'lucide-react';

const BenefitCards = () => {
    const cards = [
        {
            title: "Quality Products",
            desc: "European windows and doors designed for New Zealand's unique climate conditions.",
            icon: <Box size={24} />,
            link: "/products",
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: "Reliable Services",
            desc: "Our team of experienced builders ensure high quality advice and service.",
            icon: <ShieldCheck size={24} />,
            link: "#why-us",
            color: "text-orange-600",
            bg: "bg-orange-50"
        },
        {
            title: "Great Value",
            desc: "We provide competitive quotes to help support your renovation projects.",
            icon: <Zap size={24} />,
            link: "#contact",
            color: "text-green-600",
            bg: "bg-green-50"
        }
    ];

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <span className="text-secondary font-bold tracking-widest uppercase text-xs mb-3 block">Why Choose Us</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
                        Excellence in Every Detail
                    </h2>
                    <p className="max-w-2xl mx-auto text-slate-600 text-lg">
                        We combine premium materials with expert craftsmanship to deliver superior results for your home.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group"
                        >
                            <div className="h-full bg-white rounded-2xl p-8 border border-slate-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-slate-300 relative overflow-hidden">

                                {/* Hover Gradient Accent - Subtle */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                                <div className={`${card.bg} ${card.color} w-14 h-14 rounded-xl flex items-center justify-center mb-8 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                                    {card.icon}
                                </div>

                                <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors duration-300">
                                    {card.title}
                                </h3>

                                <p className="text-slate-600 leading-relaxed mb-8">
                                    {card.desc}
                                </p>

                                <a href={card.link} className="inline-flex items-center text-sm font-bold text-primary group-hover:text-secondary transition-colors duration-300">
                                    <span className="mr-2">Learn More</span>
                                    <ArrowRight size={16} className="transform transition-transform duration-300 group-hover:translate-x-1" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BenefitCards;
