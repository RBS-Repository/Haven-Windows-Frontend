import { motion } from 'framer-motion';
import { FileText, AlertCircle } from 'lucide-react';

const Terms = () => {
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
                        <FileText size={40} className="text-secondary" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Terms & Conditions</h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Please review our terms of service and order requirements below.
                    </p>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-8"
                >
                    {/* Important Notice */}
                    <div className="bg-white rounded-2xl p-8 border-l-4 border-secondary shadow-sm">
                        <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
                            <AlertCircle className="text-secondary" />
                            Minimum Order Requirements
                        </h2>
                        <p className="text-lg text-slate-700 leading-relaxed font-medium">
                            Please note that a minimum order of <span className="text-secondary font-bold">10 windows and 2 doors</span> applies to all quotes and purchases.
                        </p>
                        <p className="mt-4 text-slate-500">
                            This policy ensures we can maintain our high standards of manufacturing, shipping, and installation quality for every project.
                        </p>
                    </div>

                    {/* General Terms */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-primary mb-4">1. General Overview</h2>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            By accessing this website and placing an order with Haven Windows & Doors, you agree to be bound by these terms and conditions. These terms apply to all visitors, users, and others who access or use our Service.
                        </p>

                        <h2 className="text-2xl font-bold text-primary mb-4">2. Quotes & Estimates</h2>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            All quotes provided are valid for 30 days from the date of issue. Final pricing is subject to site measurement and confirmation of specifications.
                        </p>

                        <h2 className="text-2xl font-bold text-primary mb-4">3. Installation & Waranty</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Our installation services are carried out by Licensed Building Practitioners. We provide a 10-year warranty on all uPVC profiles and glass units against manufacturing defects, provided they are maintained according to our care instructions.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Terms;
