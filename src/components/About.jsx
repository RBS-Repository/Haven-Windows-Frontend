import { motion } from 'framer-motion';

const About = () => {
    return (
        <section className="py-24 bg-white" id="about">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-secondary text-sm font-bold tracking-[0.2em] uppercase mb-4 block">About Us</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8 leading-tight">
                            Creating Warmer Havens <br /><span className="text-secondary">Across New Zealand.</span>
                        </h2>

                        <div className="space-y-6 text-lg text-slate-600 font-light leading-relaxed">
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

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-secondary/10 rounded-2xl transform rotate-3" />
                        <img
                            src="https://icdn.tradew.com/file/202204/1575393/jpg/8350400.jpg"
                            alt="Warm and comfortable home interior"
                            className="relative rounded-2xl shadow-xl w-full h-[600px] object-cover"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
