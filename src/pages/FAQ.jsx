
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white hover:border-secondary/30 transition-all duration-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-50 transition-colors"
            >
                <span className="font-semibold text-primary">{question}</span>
                {isOpen ? (
                    <ChevronUp className="text-secondary flex-shrink-0" size={20} />
                ) : (
                    <ChevronDown className="text-slate-400 flex-shrink-0" size={20} />
                )}
            </button>
            <div
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
            >
                <div className="overflow-hidden">
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                        {answer}
                    </div>
                </div>
            </div>
        </div>
    );
};

const FAQ = () => {
    const faqs = [
        {
            category: "Ordering & Delivery",
            items: [
                {
                    question: "What is the estimated delivery time?",
                    answer: "Upon confirmation of your order, the delivery timeline for our windows and doors is typically 12 weeks. We ensure every product is manufactured to your exact specifications before shipping."
                },
                {
                    question: "Do you offer warranties on your products?",
                    answer: "Yes, we stand behind the quality of our products. We offer a comprehensive 10-year warranty on all windows, which covers the frame against fading or peeling. Additionally, we provide a 10-year warranty on all hardware and accessories."
                }
            ]
        },
        {
            category: "Product Features",
            items: [
                {
                    question: "Why choose uPVC over traditional aluminum or timber?",
                    answer: "uPVC offers superior thermal insulation, reducing your energy bills and keeping your home warmer in winter and cooler in summer. Unlike timber, it doesn't rot or require painting, and unlike standard aluminum, it doesn't conduct heat or cold, preventing condensation issues."
                },
                {
                    question: "Are your windows suitable for New Zealand's climate?",
                    answer: "Absolutely. Our European-designed windows are specifically adapted for New Zealand conditions. They are UV stabilised to withstand our harsh sun without discolouring and are built to handle high wind zones and coastal salt spray."
                },
                {
                    question: "How effective is the noise reduction?",
                    answer: "Our double-glazed uPVC systems are excellent at dampening sound. The combination of multi-chambered frames and quality double glazing can significantly reduce outside noise, making them ideal for homes in busy areas or near main roads."
                }
            ]
        },
        {
            category: "Installation & Maintenance",
            items: [
                {
                    question: "Do I need to paint or seal the frames?",
                    answer: "No, that's one of the biggest benefits of uPVC. The material is extremely low maintenance. It never needs painting, sealing, or treating. A simple wipe down with warm soapy water is all that's needed to keep them looking new."
                },
                {
                    question: "Can double glazing be retrofitted into my existing home?",
                    answer: "While we specialise in full replacement windows to ensure maximum performance and weather-tightness, our team can assess your property to recommend the best solution for upgrading your home's thermal efficiency."
                }
            ]
        }
    ];

    return (
        <section className="pt-32 pb-20 bg-slate-50 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center p-3 bg-secondary/10 rounded-full mb-6">
                        <HelpCircle className="text-secondary" size={32} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Everything you need to know about our products, services, and why Haven Windows & Doors is the right choice for your home.
                    </p>
                </motion.div>

                {/* FAQ Groups */}
                <div className="space-y-12">
                    {faqs.map((group, groupIndex) => (
                        <motion.div
                            key={groupIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: groupIndex * 0.1 + 0.3, duration: 0.6 }}
                        >
                            <h2 className="text-xl font-bold text-primary mb-6 pl-2 border-l-4 border-secondary">
                                {group.category}
                            </h2>
                            <div className="space-y-4">
                                {group.items.map((faq, index) => (
                                    <FAQItem key={index} question={faq.question} answer={faq.answer} />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
