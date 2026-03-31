import { motion } from 'framer-motion';
import { Thermometer, Volume2, Shield, CheckCircle2 } from 'lucide-react';

const Features = () => {
    const features = [
        {
            title: "Thermal Insulation",
            desc: "Keep your home warm in winter and cool in summer with our double-glazed uPVC systems. Exceed NZ building codes and eliminate condensation for a healthier, more energy-efficient home.",
            points: ["Up to 40% Energy Savings", "Zero Condensation", "Exceeds NZ Building Code"],
            icon: <Thermometer size={24} />,
            color: "secondary"
        },
        {
            title: "Acoustic Noise Reduction",
            desc: "Block out traffic, wind, and neighbourhood noise with our high-performance acoustic glass and multi-chamber uPVC profiles. Ideal for homes near busy roads or coastal areas.",
            points: ["Up to 45dB Reduction", "Blocks Traffic & Wind Noise", "Peaceful Living"],
            icon: <Volume2 size={24} />,
            color: "primary"
        },
        {
            title: "Ultimate Security",
            desc: "Rest easy with advanced European multi-point locking systems and reinforced impact-resistant frames, designed to keep your family safe across all New Zealand weather conditions.",
            points: ["Multi-Point Locks", "Reinforced uPVC Frames", "Secured by Design"],
            icon: <Shield size={24} />,
            color: "secondary"
        }
    ];

    return (
        <section id="why-us" className="py-20 md:py-28 bg-gradient-to-b from-slate-50/30 to-white relative overflow-hidden">
            {/* Subtle Background Elements */}
            <div className="absolute inset-0 opacity-[0.015]">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(90deg, #1a2b4b 1px, transparent 1px), linear-gradient(#1a2b4b 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }} />
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-secondary/3 rounded-full blur-[150px] -translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[120px] translate-x-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
                >
                    <span className="inline-block text-secondary font-semibold tracking-widest uppercase text-xs mb-4 px-4 py-2 bg-secondary/5 rounded-full">Performance</span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary">
                        Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary-light">New Zealand</span>
                    </h2>
                    <p className="text-lg md:text-xl text-slate-500 leading-relaxed">
                        Our double-glazed uPVC windows and doors are specifically engineered to handle the demands of the New Zealand climate — from alpine cold to coastal salt air and high winds.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.15, duration: 0.6 }}
                            className="group"
                        >
                            {/* Feature Card */}
                            <div className="relative h-full bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-100 transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                                {/* Background Gradient on Hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                {/* Top Accent Line */}
                                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-${feature.color} to-${feature.color}-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />

                                {/* Icon */}
                                <div className={`relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-${feature.color}/10 text-${feature.color} mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                    {feature.icon}
                                </div>

                                {/* Content */}
                                <h3 className="text-xl md:text-2xl font-bold mb-4 text-primary">{feature.title}</h3>
                                <p className="text-slate-500 mb-8 leading-relaxed text-sm md:text-base">{feature.desc}</p>

                                {/* Feature Points */}
                                <ul className="space-y-3">
                                    {feature.points.map((point, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                                            className="flex items-center space-x-3"
                                        >
                                            <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-${feature.color}/10 flex items-center justify-center`}>
                                                <CheckCircle2 className={`text-${feature.color}`} size={14} />
                                            </div>
                                            <span className="text-sm font-medium text-slate-600">{point}</span>
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* Decorative Corner */}
                                <div className="absolute bottom-0 right-0 w-24 h-24 overflow-hidden rounded-br-2xl">
                                    <div className={`absolute bottom-[-20px] right-[-20px] w-24 h-24 bg-${feature.color}/5 rounded-full`} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
