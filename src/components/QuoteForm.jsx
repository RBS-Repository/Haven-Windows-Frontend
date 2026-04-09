import { useState } from 'react';
import { User, Mail, Phone, MapPin, MessageSquare, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mnnqoeel'; // Replace YOUR_FORM_ID with your Formspree form ID

const QuoteForm = ({ isModal = false }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle | submitting | success | error

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    location: formData.location,
                    message: formData.message,
                    _subject: `New Quote Request from ${formData.name}`
                })
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', location: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <section id="contact" className={`${isModal ? 'py-0 bg-transparent' : 'py-24 bg-primary text-white overflow-hidden'}`}>
            <div className={`mx-auto ${isModal ? '' : 'max-w-7xl px-4 sm:px-6 lg:px-8'}`}>
                <div className={`grid grid-cols-1 ${isModal ? '' : 'lg:grid-cols-2 gap-16 items-center'}`}>

                    {!isModal && (
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Get Your Free uPVC Quote Today</h2>
                            <p className="text-xl text-slate-300 mb-12">Get a free, no-obligation quote and make your home warmer and more comfortable.</p>
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                        <Phone size={20} className="text-secondary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Call Us </p>
                                        <p className="text-lg font-bold">+64 210 246 7843</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                        <Mail size={20} className="text-secondary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Email Us</p>
                                        <p className="text-lg font-bold">info@havenwindows.co.nz</p>
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
                                    Already have a quote?. We aim to beat any comparable written quote by up to *<span className="text-secondary font-bold">10%</span>.
                                </p>
                                <p className="text-xs text-slate-400 mt-2 italic">*Written quote required. Minimum order of 10 windows and 2 doors applies.</p>
                            </div>

                            {status === 'success' ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle size={32} className="text-green-600" />
                                    </div>
                                    <h4 className="text-2xl font-bold text-primary mb-2">Thank You!</h4>
                                    <p className="text-slate-500 mb-6">Your quote request has been sent successfully. We'll be in touch soon.</p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="text-secondary font-bold hover:underline"
                                    >
                                        Send Another Request
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="relative">
                                            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Full Name"
                                                required
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-secondary transition-colors"
                                            />
                                        </div>
                                        <div className="relative">
                                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Email Address"
                                                required
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-secondary transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="relative">
                                            <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="Phone Number"
                                                required
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-secondary transition-colors"
                                            />
                                        </div>
                                        <div className="relative">
                                            <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="text"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleChange}
                                                placeholder="Town / Location"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-secondary transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <MessageSquare size={18} className="absolute left-4 top-4 text-slate-400" />
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Tell us about your project..."
                                            rows="4"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-secondary transition-colors resize-none"
                                        ></textarea>
                                    </div>

                                    {status === 'error' && (
                                        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
                                            <AlertCircle size={18} className="shrink-0" />
                                            <p>Something went wrong. Please try again or email us directly.</p>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="w-full bg-secondary text-white py-5 rounded-xl font-bold text-lg flex items-center justify-center space-x-3 transition-all hover:bg-secondary-light shadow-lg hover:shadow-secondary/30 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {status === 'submitting' ? (
                                            <>
                                                <Loader2 size={20} className="animate-spin" />
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Get My Free Quote</span>
                                                <Send size={20} />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuoteForm;
