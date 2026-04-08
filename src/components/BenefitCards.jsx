import { motion } from 'framer-motion';
import { ArrowRight, Box, ShieldCheck, DollarSign } from 'lucide-react';

const BenefitCards = () => {
    const cards = [
        {
            title: "Premium uPVC Quality",
            desc: "European double-glazed uPVC windows and doors, purpose-built for New Zealand's climate — from frosty Dunedin winters to breezy Wellington coasts.",
            icon: <Box size={24} />,
            link: "/products",
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: "Qualified Local Installers",
            desc: "Installed by qualified and experienced independent builders, with coordination to support a smooth and reliable window replacement process.“",
            icon: <ShieldCheck size={24} />,
            link: "#why-us",
            color: "text-orange-600",
            bg: "bg-orange-50"
        },
        {
            title: "Price Match Promise",
            desc: "We aim to beat any comparable written quote by up to 10%* Get a free, no-obligation quote today and start saving.",
            icon: <DollarSign size={24} />,
            link: "#contact",
            color: "text-green-600",
            bg: "bg-green-50",
            footnote: "Applies to orders of 10 windows and 2 doors or more"
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
                        The Haven Advantage
                    </h2>
                    <p className="max-w-2xl mx-auto text-slate-600 text-lg">
                        We combine premium double-glazed uPVC with expert installation to deliver warmer, quieter, and more energy-efficient homes across New Zealand.
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

                                {card.footnote && (
                                    <p className="mt-4 text-[10px] text-slate-400 italic leading-tight">
                                        {card.footnote}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BenefitCards;
