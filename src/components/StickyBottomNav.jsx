import { Phone, Mail, Send } from 'lucide-react';

const StickyBottomNav = () => {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-slate-200 z-50 py-3 md:py-4 px-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
                <div className="flex items-center gap-4 md:gap-6 justify-center w-full md:w-auto">
                    <a href="tel:0800FUTUREWIN" className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors group">
                        <div className="bg-secondary/10 p-2 rounded-full group-hover:bg-secondary/20 transition-colors">
                            <Phone size={16} className="text-secondary" />
                        </div>
                        <span className="font-medium text-xs md:text-sm lg:text-base">0800 FUTURE WIN</span>
                    </a>
                    <a href="mailto:hello@havenwindows.co.nz" className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors group">
                        <div className="bg-secondary/10 p-2 rounded-full group-hover:bg-secondary/20 transition-colors">
                            <Mail size={16} className="text-secondary" />
                        </div>
                        <span className="font-medium text-xs md:text-sm lg:text-base">hello@havenwindows.co.nz</span>
                    </a>
                </div>
                <a
                    href="#contact"
                    className="w-full md:w-auto bg-primary text-white px-8 py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:bg-secondary transition-all shadow-lg shadow-primary/20 transform hover:-translate-y-0.5"
                >
                    Enquire Now <Send size={16} />
                </a>
            </div>
        </div>
    );
};

export default StickyBottomNav;
