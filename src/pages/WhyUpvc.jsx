import { motion } from 'framer-motion';
import { ThermometerSun, Droplets, Volume2, ShieldCheck, ArrowRight } from 'lucide-react';
import QuoteForm from '../components/QuoteForm';

const BenefitSection = ({ icon: Icon, title, content, reversed = false }) => (
    <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 py-16`}>
        <div className="flex-1 space-y-6">
            <div className="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center text-secondary mb-6">
                <Icon size={32} />
            </div>
            <h3 className="text-3xl font-bold text-primary">{title}</h3>
            <div className="text-slate-600 leading-relaxed text-lg space-y-4">
                {content}
            </div>
        </div>
        <div className="flex-1 w-full">
            <div className={`relative h-[400px] rounded-3xl overflow-hidden shadow-2xl ${reversed ? 'bg-primary/5' : 'bg-secondary/5'}`}>
                {/* Abstract pattern background placeholder - would be replaced by specific imagery */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <Icon size={120} className="text-slate-400" />
                </div>
            </div>
        </div>
    </div>
);

const WhyUpvc = () => {
    return (
        <main className="pt-24">
            {/* Hero Section */}
            <section className="bg-primary text-white py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-800/50 transform skew-x-12 translate-x-1/4" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-secondary text-white font-bold tracking-widest uppercase text-sm mb-4 block">The Smart Choice</span>
                        <h1 className="text-5xl md:text-7xl  text-white font-bold mb-6">Why Choose uPVC?</h1>
                        <p className="text-xl text-slate-300 max-w-2xl font-light">
                            Discover how German-engineered uPVC joinery can transform your home into a warmer, drier, and quieter sanctuary.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Introduction */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-primary mb-6">Performance Meets Sustainability</h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        While uPVC joinery might represent a slightly higher initial investment compared to standard aluminium, the long-term benefits for your home's comfort and energy efficiency are substantial. Our systems deliver superior insulation, ensuring your investment pays off in lower energy bills and a healthier living environment.
                    </p>
                </div>
            </section>

            {/* Detailed Benefits */}
            <section className="py-12 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Warmer */}
                    <BenefitSection
                        icon={ThermometerSun}
                        title="Warmer in Winter"
                        content={
                            <>
                                <p>
                                    Single-glazed windows are the primary source of heat loss in many New Zealand homes, leading to cold, uncomfortable living spaces and high power bills.
                                </p>
                                <p>
                                    Our uPVC systems are naturally excellent insulators. Unlike aluminium, which acts as a "thermal bridge" conducting cold from the outside in, uPVC frames contain internal air chambers that stop thermal transfer.
                                </p>
                                <p>
                                    Combined with high-performance double glazing and argon gas fill, our windows exceed current NZ Building Code standards (R-value &gt; 0.46), achieving R-values of 0.50 and higher. This means heat stays where it belongs—inside your home.
                                </p>
                            </>
                        }
                    />

                    {/* Drier */}
                    <BenefitSection
                        reversed
                        icon={Droplets}
                        title="Drier & Healthier"
                        content={
                            <>
                                <p>
                                    Damp homes are a major health concern in New Zealand. When warm internal air meets cold window surfaces, condensation forms, creating the perfect breeding ground for mould and mildew.
                                </p>
                                <p>
                                    Our uPVC joinery significantly reduces this risk. By maintaining a warmer internal frame temperature, condensation is virtually eliminated.
                                </p>
                                <p>
                                    Additionally, our German-engineered profiles feature advanced drainage systems that prevent moisture buildup, protecting your home's structure and your family's health.
                                </p>
                            </>
                        }
                    />

                    {/* Quieter */}
                    <BenefitSection
                        icon={Volume2}
                        title="Significantly Quieter"
                        content={
                            <>
                                <p>
                                    Transform your home into a peaceful retreat. Whether you live near a busy road, a flight path, or simply have noisy neighbours, our uPVC systems act as a powerful sound barrier.
                                </p>
                                <p>
                                    The combination of dense uPVC frames, airtight seals, and quality double glazing can reduce outside noise by up to 80% (approx. 35dB reduction) compared to single glazing.
                                </p>
                                <p>
                                    Sleep better and enjoy the quiet comfort of your own home, undisturbed by the outside world.
                                </p>
                            </>
                        }
                    />

                    {/* Secure */}
                    <BenefitSection
                        reversed
                        icon={ShieldCheck}
                        title="Enhanced Security"
                        content={
                            <>
                                <p>
                                    Your family's safety is non-negotiable. That's why we don't just rely on standard latches.
                                </p>
                                <p>
                                    Every Haven window and door comes equipped with advanced multi-point locking systems. When you lock up, the sash is secured at multiple points along the frame, not just one.
                                </p>
                                <p>
                                    This creates a formidable barrier against intrusion, giving you complete peace of mind that your home and loved ones are secure.
                                </p>
                            </>
                        }
                    />

                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-primary text-white text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-6">Ready to experience the difference?</h2>
                    <p className="text-xl text-slate-300 mb-10">
                        Upgrade to a warmer, drier, and more secure home with Haven Windows & Doors.
                    </p>
                    <a href="#contact" className="inline-flex items-center gap-3 bg-secondary text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-secondary-light transition-all shadow-lg hover:shadow-secondary/20">
                        Get a Free Quote <ArrowRight />
                    </a>
                </div>
            </section>

            <QuoteForm />
        </main>
    );
};

export default WhyUpvc;
