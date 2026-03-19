import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, ChevronDown, Lock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const { products } = useAdmin();

    const windows = products.filter(p => p.type === 'windows');
    const doors = products.filter(p => p.type === 'doors');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setMobileProductsOpen(false);
    }, [location]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.top = `-${window.scrollY}px`;
        } else {
            const scrollY = document.body.style.top;
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            <nav className={`fixed w-full z-[100] transition-all duration-500 ease-in-out ${(isScrolled || !isHomePage) ? 'glass py-3 shadow-sm' : 'bg-transparent py-8'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <Link
                                to="/"
                                onClick={(e) => {
                                    if (isHomePage) {
                                        e.preventDefault();
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }
                                }}
                                className="flex items-center group"
                            >
                                <img
                                    src="/logo.png"
                                    alt="Haven Windows & Doors"
                                    className={`w-auto object-contain transition-all duration-500 ease-in-out ${(isScrolled || !isHomePage) ? 'h-12' : 'h-24 md:h-28'}`}
                                />
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link
                                to="/"
                                onClick={(e) => {
                                    if (isHomePage) {
                                        e.preventDefault();
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }
                                }}
                                className="text-sm font-medium text-primary hover:text-secondary transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all hover:after:w-full"
                            >
                                Home
                            </Link>
                            <Link to="/why-upvc" className="text-sm font-medium text-primary hover:text-secondary transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all hover:after:w-full">Why uPVC</Link>

                            {/* Products Mega Menu Container */}
                            <div className="group relative">
                                <Link to="/products" className="text-sm font-medium text-primary hover:text-secondary transition-colors inline-flex items-center gap-1 py-4">
                                    Products <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                                </Link>

                                {/* Desktop Dropdown */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white rounded-2xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 overflow-hidden">
                                    <div className="grid grid-cols-2 p-8 gap-8">
                                        <div>
                                            <h3 className="text-secondary font-bold uppercase tracking-wider text-xs mb-4 border-b border-slate-100 pb-2">
                                                Windows
                                            </h3>
                                            <ul className="space-y-3">
                                                {windows.map((cat) => (
                                                    <li key={cat.id}>
                                                        <Link to={`/category/${cat.id}`} className="block text-slate-600 hover:text-primary hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors text-sm font-medium">
                                                            {cat.title}
                                                        </Link>
                                                    </li>
                                                ))}
                                                {windows.length === 0 && <li className="text-slate-400 text-xs px-3">No windows added yet</li>}
                                            </ul>
                                        </div>
                                        <div className="bg-slate-50 -my-8 -mr-8 p-8">
                                            <h3 className="text-secondary font-bold uppercase tracking-wider text-xs mb-4 border-b border-slate-200 pb-2">
                                                Doors
                                            </h3>
                                            <ul className="space-y-3">
                                                {doors.map((cat) => (
                                                    <li key={cat.id}>
                                                        <Link to={`/category/${cat.id}`} className="block text-slate-600 hover:text-primary hover:bg-white px-3 py-2 rounded-lg transition-colors text-sm font-medium">
                                                            {cat.title}
                                                        </Link>
                                                    </li>
                                                ))}
                                                {doors.length === 0 && <li className="text-slate-400 text-xs px-3">No doors added yet</li>}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <a href="/#about" className="text-sm font-medium text-primary hover:text-secondary transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all hover:after:w-full">About us</a>
                            <a href="/#gallery" className="text-sm font-medium text-primary hover:text-secondary transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all hover:after:w-full">Gallery</a>

                            <Link to="/admin" className="text-slate-400 hover:text-primary transition-colors" title="Admin Login">
                                <Lock size={18} />
                            </Link>

                            <a href="#contact" className="bg-primary text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-secondary transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-secondary/20">
                                Free Quote
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-primary p-2 relative z-[110]">
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-[90] md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Menu */}
            <div className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-[100] transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between p-4 border-b border-slate-100">
                        <img src="/logo.png" href="/" alt="Haven" className="h-10 object-contain" />
                        <button onClick={() => setIsMobileMenuOpen(false)} className="text-primary p-2">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Mobile Menu Content */}
                    <div className="flex-1 overflow-y-auto py-6 px-4">
                        <div className="space-y-2">
                            <Link
                                to="/"
                                onClick={(e) => {
                                    if (isHomePage) {
                                        e.preventDefault();
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                        setIsMobileMenuOpen(false);
                                    }
                                }}
                                className="block px-4 py-3 rounded-xl text-base font-medium text-primary hover:bg-slate-50 transition-colors"
                            >
                                Home
                            </Link>
                            <Link to="/why-upvc" className="block px-4 py-3 rounded-xl text-base font-medium text-primary hover:bg-slate-50 transition-colors">Why uPVC</Link>

                            {/* Mobile Products Accordion */}
                            <div>
                                <button
                                    onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-medium text-primary hover:bg-slate-50 transition-colors"
                                >
                                    Products <ChevronDown size={16} className={`transition-transform duration-300 ${mobileProductsOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <div className={`overflow-hidden transition-all duration-300 ${mobileProductsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="pl-4 space-y-4 bg-slate-50 rounded-xl my-2 py-4">
                                        {/* Windows Section */}
                                        <div>
                                            <h4 className="text-secondary text-xs font-bold uppercase tracking-wider mb-2 px-4">Windows</h4>
                                            {windows.map((cat) => (
                                                <Link key={cat.id} to={`/category/${cat.id}`} className="block px-4 py-2 text-sm text-slate-600 hover:text-primary transition-colors">
                                                    {cat.title}
                                                </Link>
                                            ))}
                                            {windows.length === 0 && <p className="text-slate-400 text-[10px] px-4 italic">None added</p>}
                                        </div>

                                        {/* Doors Section */}
                                        <div>
                                            <h4 className="text-secondary text-xs font-bold uppercase tracking-wider mb-2 px-4">Doors</h4>
                                            {doors.map((cat) => (
                                                <Link key={cat.id} to={`/category/${cat.id}`} className="block px-4 py-2 text-sm text-slate-600 hover:text-primary transition-colors">
                                                    {cat.title}
                                                </Link>
                                            ))}
                                            {doors.length === 0 && <p className="text-slate-400 text-[10px] px-4 italic">None added</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <a href="/#about" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-base font-medium text-primary hover:bg-slate-50 transition-colors">About us</a>
                            <a href="/#gallery" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-base font-medium text-primary hover:bg-slate-50 transition-colors">Gallery</a>

                            <Link to="/admin" className="block px-4 py-3 rounded-xl text-base font-medium text-slate-500 hover:bg-slate-50 transition-colors flex items-center gap-2">
                                <Lock size={18} /> Admin Panel
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Footer */}
                    <div className="p-4 border-t border-slate-100">
                        <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center bg-primary text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:bg-secondary transition-colors">
                            Free Quote
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
