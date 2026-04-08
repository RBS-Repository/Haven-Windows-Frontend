import { motion } from 'framer-motion';
import { ShieldCheck, Mail, Info, List } from 'lucide-react';

const PrivacyPolicy = () => {
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
                        <ShieldCheck size={40} className="text-secondary" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Privacy Policy</h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Your privacy is important to us. Here's how we protect and manage your personal data.
                    </p>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-8 text-slate-700"
                >
                    {/* Privacy Statement */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
                            <Info className="text-secondary" />
                            Privacy Statement
                        </h2>
                        <p className="leading-relaxed text-lg">
                            Haven Windows and Doors is committed to protecting your privacy. Any personal information you provide through this website will only be used in line with this privacy statement.
                        </p>
                    </div>

                    {/* What we collect */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
                            <List className="text-secondary" />
                            What we collect
                        </h2>
                        <p className="mb-4">We may collect information such as:</p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                "Your name",
                                "Contact details (including email address)",
                                "Basic information like postcode, preferences, or interests",
                                "Other details relevant to customer enquiries, surveys, or offers"
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl">
                                    <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                                    <span className="text-sm font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* How we use your information */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
                            <ShieldCheck className="text-secondary" />
                            How we use your information
                        </h2>
                        <p className="mb-4 leading-relaxed">
                            We collect this information to better understand your needs and provide a better service. This may include:
                        </p>
                        <div className="space-y-3">
                            {[
                                "Keeping internal records",
                                "Improving our products and services",
                                "Sending occasional emails about our products, services, or updates you may find useful",
                                "Contacting you for feedback or market research (via email, phone, or other contact methods you’ve provided)"
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl hover:border-secondary/20 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0 font-bold text-xs">
                                        0{idx + 1}
                                    </div>
                                    <p className="text-sm md:text-base font-medium">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Your information and your rights */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border-l-4 border-secondary">
                        <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
                            <Mail className="text-secondary" />
                            Your information and your rights
                        </h2>
                        <p className="leading-relaxed mb-6">
                            We do not sell or share your personal information with third parties unless we have your permission or are required to do so by law.
                        </p>
                        <div className="bg-slate-50 p-6 rounded-2xl">
                            <p className="text-sm italic text-slate-500">
                                If you believe any information we hold about you is incorrect or incomplete, please contact us and we will promptly update it.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
