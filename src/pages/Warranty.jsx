import { motion } from 'framer-motion';
import { Award, ShieldCheck, AlertTriangle, Shield, CheckCircle } from 'lucide-react';

const Warranty = () => {
    const warrantyItems = [
        {
            title: "Window/Door Frames",
            description: "Colour fading, corner separation, deformation",
            icon: <Shield className="text-secondary" />
        },
        {
            title: "Hardware",
            description: "Rusting or damage to components",
            icon: <Award className="text-secondary" />
        },
        {
            title: "Glass",
            description: "Internal fogging",
            icon: <CheckCircle className="text-secondary" />
        }
    ];

    return (
        <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl shadow-sm mb-6">
                        <Award size={40} className="text-secondary" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Manufacturer's Warranty</h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        We stand behind the quality of our products with a comprehensive 10-year warranty.
                    </p>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-8 text-slate-700"
                >
                    {/* Main Warranty Section */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                            <ShieldCheck className="text-secondary" />
                            10-Year Manufacturer’s Warranty
                        </h2>
                        <p className="mb-8 leading-relaxed text-slate-600">
                            Our products are engineered to last. We provide a 10-year warranty covering the following aspects of our window and door systems:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {warrantyItems.map((item, idx) => (
                                <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-secondary/20 transition-all duration-300">
                                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm">
                                        {item.icon}
                                    </div>
                                    <h3 className="font-bold text-primary mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed italic">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Glass Disclaimer Notice */}
                    <div className="bg-amber-50 rounded-2xl p-8 border-l-4 border-amber-400 shadow-sm">
                        <h2 className="text-2xl font-bold text-amber-800 mb-4 flex items-center gap-3">
                            <AlertTriangle className="text-amber-500" />
                            Important Note: Glass
                        </h2>
                        <p className="text-amber-900 leading-relaxed font-medium text-lg">
                            Please note: Glass is fragile.
                        </p>
                        <p className="mt-4 text-amber-800/80 leading-relaxed">
                            Breakages caused by human factors, high-impact events (accidental or otherwise), or extreme weather conditions are not covered under manufacturer’s warranty.
                        </p>
                    </div>

                    {/* Quality Commitment */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-primary mb-4">Our Commitment</h2>
                        <p className="text-slate-600 leading-relaxed">
                            We take pride in delivering the highest standard of uPVC windows and doors in New Zealand. Every component is rigorously tested to ensure it meets our strict quality guidelines before it arrives at your home.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Warranty;
