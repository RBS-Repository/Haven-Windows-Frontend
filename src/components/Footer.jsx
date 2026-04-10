import { motion } from 'framer-motion';

import { Link, useLocation } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const Footer = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const { products } = useAdmin();
    const windows = products.filter(p => p.type === 'windows');
    const doors = products.filter(p => p.type === 'doors');
    return (
        <footer className="bg-white pt-16 md:pt-24 pb-12 border-t border-primary/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-16">
                    <div className="col-span-1 lg:col-span-1">
                        <div className="flex items-center mb-6">
                            <img src="/logo.png" alt="Haven Windows & Doors" className="h-16 w-auto object-contain" />
                        </div>
                        <p className="text-slate-500 mb-8 leading-relaxed">Premium uPVC window and door systems designed for the future of New Zealand homes. Quality, durability, and performance in every profile.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-primary mb-6 uppercase tracking-wider text-sm">Windows</h4>
                        <ul className="space-y-4">
                            {windows.map((cat) => (
                                <li key={cat.id}>
                                    <Link to={`/category/${cat.id}`} className="text-slate-600 hover:text-secondary transition-colors">
                                        {cat.title}
                                    </Link>
                                </li>
                            ))}
                            {windows.length === 0 && <li className="text-slate-400 text-sm italic">Coming Soon</li>}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-primary mb-6 uppercase tracking-wider text-sm">Doors</h4>
                        <ul className="space-y-4">
                            {doors.map((cat) => (
                                <li key={cat.id}>
                                    <Link to={`/category/${cat.id}`} className="text-slate-600 hover:text-secondary transition-colors">
                                        {cat.title}
                                    </Link>
                                </li>
                            ))}
                            {doors.length === 0 && <li className="text-slate-400 text-sm italic">Coming Soon</li>}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-primary mb-6 uppercase tracking-wider text-sm">Company</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    to="/#about"
                                    onClick={(e) => {
                                        if (isHomePage) {
                                            e.preventDefault();
                                            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                    className="text-slate-600 hover:text-secondary transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/#gallery"
                                    onClick={(e) => {
                                        if (isHomePage) {
                                            e.preventDefault();
                                            document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                    className="text-slate-600 hover:text-secondary transition-colors"
                                >
                                    Project Gallery
                                </Link>
                            </li>
                            <li><Link to="/faq" className="text-slate-600 hover:text-secondary transition-colors">FAQs</Link></li>
                            <li><Link to="/warranty" className="text-slate-600 hover:text-secondary transition-colors">Warranty</Link></li>
                            <li><Link to="/product-specifications" className="text-slate-600 hover:text-secondary transition-colors">Product Specifications</Link></li>
                            <li><Link to="/privacy-policy" className="text-slate-600 hover:text-secondary transition-colors">Privacy Policy</Link></li>
                            <li>
                                <Link
                                    to="/#contact"
                                    onClick={(e) => {
                                        if (isHomePage) {
                                            e.preventDefault();
                                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                    className="text-slate-600 hover:text-secondary transition-colors"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-primary/5 pt-12 pb-12 mb-4">
                    <h5 className="text-center text-slate-500 font-medium uppercase tracking-widest text-sm mb-12">Our Trusted Partners</h5>
                    <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Roto */}
                        <div className="flex items-center gap-2">
                            <img
                                src="https://thewindowcompany.co.nz/wp-content/uploads/2023/11/imagesroto.png"
                                alt="Roto"
                                className="h-10 md:h-12 w-auto object-contain"
                            />
                        </div>

                        {/* Siegenia */}
                        <div className="flex items-center gap-2">
                            <img
                                src="https://thewindowcompany.co.nz/wp-content/uploads/2023/11/siegenia.jpg"
                                alt="Siegenia"
                                className="h-10 md:h-12 w-auto object-contain mix-blend-multiply"
                            />
                        </div>

                        {/* VEKA */}
                        <div className="flex items-center gap-2">
                            <img
                                src="https://thewindowcompany.co.nz/wp-content/uploads/2023/11/veka-logo-F1E4F9CE48-seeklogo.com_resized_resized.png"
                                alt="VEKA"
                                className="h-10 md:h-12 w-auto object-contain"
                            />
                        </div>

                        {/* CodeMark */}
                        <div className="flex items-center gap-2">
                            <img
                                src="https://i.imgur.com/6TVK2f1.jpeg"
                                alt="CodeMark Certified"
                                className="h-12 md:h-14 w-auto object-contain mix-blend-multiply"
                            />
                        </div>


                    </div>
                </div>

                <div className="pt-12 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-center md:text-left">
                    <p className="text-slate-400 text-sm italic"></p>
                    <div className="flex flex-col items-center md:items-end gap-2">
                        <p className="text-slate-400 text-sm">© {new Date().getFullYear()} Haven Windows & Doors. All rights reserved.</p>
                        <p className="text-slate-400 text-xs flex items-center gap-1">
                            Website made with
                            <motion.span
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.5, ease: "easeInOut" }}
                                className="text-red-500 inline-block mx-1"
                            >
                                ♥
                            </motion.span>
                            by
                            <motion.a
                                href="https://budaquecreations.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold relative inline-block ml-1"
                                whileHover={{ scale: 1.05 }}
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                {/* Glow Effect */}
                                <span className="absolute inset-0 blur-md bg-secondary/30 rounded-full animate-pulse"></span>
                                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-secondary to-secondary-light">Budaque Creations</span>
                            </motion.a>
                        </p>
                    </div>
                </div>
            </div>
        </footer >
    );
};

export default Footer;
