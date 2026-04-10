import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Animated Counter Component
const AnimatedCounter = ({ end, suffix = '', duration = 2 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "0px" });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        let startTime;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [isInView, end, duration]);

    return (
        <span ref={ref}>
            {count}{suffix}
        </span>
    );
};

const Hero = () => {
    const { scrollY } = useScroll();
    // Reduced parallax effect to prevent overlap
    const y2 = useTransform(scrollY, [0, 500], [0, -50]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-36 md:pt-32 pb-16 md:pb-0">
            {/* Unique Architectural Background Element */}
            <div className="absolute top-0 right-0 w-[45%] h-full bg-slate-50 -z-10 hidden lg:block" />
            <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl -z-10" />

            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Content Side - No parallax transform */}
                    <div className="lg:col-span-5 relative z-10">
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <div className="flex items-center space-x-4 mb-8">
                                    <div className="h-[1px] w-12 bg-secondary" />
                                    <span className="text-secondary text-sm font-bold tracking-[0.2em] uppercase">
                                        New Zealand's Premium uPVC Supplier
                                    </span>
                                </div>

                                <h1 className="text-4xl md:text-7xl font-black leading-[0.95] mb-8 tracking-tighter">
                                    <span className="text-secondary block mb-2">Warmer Kiwi Homes</span>
                                    <span className="text-primary">Start Here.</span>
                                </h1>

                                <p className="text-xl text-slate-600 mb-12 max-w-md leading-relaxed font-light">
                                    European double-glazed uPVC windows and doors, designed for New Zealand conditions - delivering improved energy efficiency, enhanced comfort, and effective noise reduction.
                                </p>

                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                                    <a href="#contact" className="w-full sm:w-auto text-center group relative overflow-hidden bg-primary text-white px-8 py-4 md:px-10 md:py-5 rounded-full font-bold transition-all hover:bg-primary-light">
                                        <div className="absolute inset-0 w-0 bg-secondary transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
                                        <span className="relative flex items-center justify-center gap-2">
                                            Get a Free Quote <ArrowRight size={20} />
                                        </span>
                                    </a>
                                    <a href="products" className="w-full sm:w-auto text-center group flex items-center justify-center gap-2 text-primary font-bold px-6 py-4 hover:text-secondary transition-colors">
                                        View Collections
                                    </a>
                                </div>
                            </motion.div>

                            {/* Stats Section - Static, no parallax */}

                        </div>
                    </div>

                    {/* Image Side - Staggered Composition with subtle parallax */}
                    {/* Image Side - Redesigned for Mobile (Sticker Style Badge) */}
                    <div className="lg:col-span-7 relative h-[420px] sm:h-[550px] md:h-[800px] block">
                        <motion.div style={{ y: typeof window !== 'undefined' && window.innerWidth > 1024 ? y2 : 0 }} className="relative h-full w-full flex items-center justify-center lg:block">
                            {/* Main Large Image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                className="relative lg:absolute lg:right-0 lg:top-12 w-full lg:w-[85%] h-[90%] lg:h-[85%] rounded-[2rem] lg:rounded-tl-[100px] lg:rounded-br-none overflow-hidden shadow-2xl z-10 border-4 border-white lg:border-none"
                            >
                                <img
                                    src="https://icdn.tradew.com/file/202204/1575393/jpg/8238723.jpg"
                                    alt="Warm New Zealand home with premium double-glazed uPVC windows installed"
                                    className="w-full h-full object-cover transform transition-transform duration-[2s] hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent mix-blend-multiply" />
                            </motion.div>

                            {/* Redesigned Promotional Badge - Sticker Style for Mobile */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: [0, -8, 0]
                                }}
                                transition={{
                                    opacity: { duration: 0.8, delay: 1 },
                                    scale: { duration: 0.8, delay: 1 },
                                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                                }}
                                className="absolute bottom-12 left-2 lg:bottom-auto lg:top-[-10px] lg:right-[-2%] z-[30] flex items-center gap-3 bg-white/95 backdrop-blur-xl p-3 sm:p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/50 max-w-[220px] sm:max-w-[280px]"
                            >
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-secondary flex items-center justify-center shrink-0 shadow-lg shadow-secondary/20">
                                    <Sparkles size={22} className="text-white" />
                                </div>
                                <div>
                                    <h4 className="text-secondary font-black text-[10px] sm:text-xs uppercase tracking-[0.15em] mb-0.5">Free Upgrade</h4>
                                    <p className="text-primary font-bold text-[11px] sm:text-sm leading-tight">
                                        Low-E argon-filled toughened glass
                                    </p>
                                </div>
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full animate-ping" />
                            </motion.div>

                            {/* Secondary Floating Image - Only on Desktop */}
                            <motion.div
                                initial={{ opacity: 0, x: 50, y: 50 }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                                className="absolute left-8 bottom-16 w-[40%] h-[40%] rounded-br-[80px] overflow-hidden shadow-2xl z-20 border-8 border-white hidden lg:block"
                            >
                                <img
                                    src="https://icdn.tradew.com/file/202204/1575393/jpg/8321561.jpg"
                                    alt="Close up of uPVC window frame with double glazing"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>

                            {/* Decorative Elements */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                                className="absolute left-[15%] top-[10%] w-32 h-32 border border-secondary/20 rounded-full z-0"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden md:flex"
            >
                <span className="text-[10px] uppercase tracking-widest text-slate-400">Discover</span>
                <div className="w-[1px] h-12 bg-slate-200 overflow-hidden relative">
                    <motion.div
                        animate={{ y: [0, 50] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 left-0 w-full h-1/2 bg-secondary"
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default Hero;
