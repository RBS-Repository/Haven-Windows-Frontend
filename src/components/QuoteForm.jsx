import { User, Mail, Phone, MapPin, MessageSquare, Send } from 'lucide-react';

const QuoteForm = ({ isModal = false }) => {
    return (
        <section id="contact" className={`${isModal ? 'py-0 bg-transparent' : 'py-24 bg-primary text-white overflow-hidden'}`}>
            <div className={`mx-auto ${isModal ? '' : 'max-w-7xl px-4 sm:px-6 lg:px-8'}`}>
                <div className={`grid grid-cols-1 ${isModal ? '' : 'lg:grid-cols-2 gap-16 items-center'}`}>

                    {!isModal && (
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to transform your home?</h2>
                            <p className="text-xl text-slate-300 mb-12">Get a free, no-obligation quote today. Our experts are ready to help you choose the perfect uPVC systems for your New Zealand home.</p>
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                        <Phone size={20} className="text-secondary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Call Us Anytime</p>
                                        <p className="text-lg font-bold">0800 FUTURE WIN</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                        <Mail size={20} className="text-secondary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Email Us</p>
                                        <p className="text-lg font-bold">hello@havenwindows.co.nz</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="relative">
                        {!isModal && <div className="absolute -inset-4 bg-secondary/20 blur-3xl -z-10 rounded-full" />}
                        <div className={`bg-white rounded-3xl p-8 md:p-10 shadow-2xl text-primary ${isModal ? 'py-8 px-6 shadow-none' : ''}`}>
                            <h3 className="text-2xl font-bold mb-4">Get Your Free Quote</h3>
                            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-6">
                                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                                    Already have a quote? We aim to beat any comparable written quotes by up to <span className="text-secondary font-bold">15%</span>.
                                </p>
                                <p className="text-xs text-slate-400 mt-2 italic">Written quote required. Minimum of 5 items/units apply.</p>
                            </div>
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="relative">
                                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input type="text" placeholder="Full Name" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-secondary transition-colors" />
                                    </div>
                                    <div className="relative">
                                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input type="email" placeholder="Email Address" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-secondary transition-colors" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="relative">
                                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input type="tel" placeholder="Phone Number" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-secondary transition-colors" />
                                    </div>
                                    <div className="relative">
                                        <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input type="text" placeholder="Town / Location" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-secondary transition-colors" />
                                    </div>
                                </div>
                                <div className="relative">
                                    <MessageSquare size={18} className="absolute left-4 top-4 text-slate-400" />
                                    <textarea placeholder="Tell us about your project..." rows="4" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-secondary transition-colors resize-none"></textarea>
                                </div>
                                <button className="w-full bg-secondary text-white py-5 rounded-xl font-bold text-lg flex items-center justify-center space-x-3 transition-all hover:bg-secondary-light shadow-lg hover:shadow-secondary/30">
                                    <span>Enquire now</span>
                                    <Send size={20} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuoteForm;
