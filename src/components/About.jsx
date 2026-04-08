import { motion } from 'framer-motion';

const About = () => {
    return (
        <section className="py-24 bg-gradient-to-b from-white to-slate-50" id="about">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

                    {/* Left: Text Content - Your exact wording preserved */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9 }}
                        className="space-y-10"
                    >
                        <div>
                            <span className="text-secondary text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
                                About Us
                            </span>
                            <h2 className="text-5xl md:text-6xl font-bold text-primary leading-[1.05] tracking-tighter">
                                Creating Warmer Havens <br />
                                <span className="text-secondary">Across New Zealand.</span>
                            </h2>
                        </div>

                        <div className="space-y-8 text-lg text-slate-600 font-light leading-relaxed">
                            <p>
                                Haven Windows & Doors was created with one simple goal — to help turn more New Zealand homes into true havens: warm, dry, comfortable, and welcoming places to live.
                            </p>
                            <p>
                                After experiencing cold and damp living conditions in single-glazed homes first-hand, we saw the profound impact outdated joinery has on comfort, health, and energy bills. That experience shaped our mission: to bring premium European uPVC double-glazed windows and doors to New Zealand at fair, competitive prices.
                            </p>
                            <p>
                                By working directly with trusted manufacturers and coordinating installation through qualified local professionals, we operate with a lean, efficient model — passing the savings directly on to you, without compromising on quality or service.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right: Enhanced Image Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.94 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative group"
                    >
                        {/* Warm layered background */}
                        <div className="absolute -inset-10 bg-gradient-to-br from-secondary/10 via-amber-100/30 to-transparent rounded-[3.5rem] -rotate-3 group-hover:rotate-2 transition-all duration-700" />

                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/50">
                            <img
                                src="https://icdn.tradew.com/file/202204/1575393/jpg/8350400.jpg"
                                alt="Warm and comfortable home interior"
                                className="w-full h-[620px] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                            />

                            {/* Soft warm overlay for cozy feel */}
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;