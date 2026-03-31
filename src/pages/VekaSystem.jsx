import { Check, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const VekaSystem = () => {
    return (
        <main className="pt-24 bg-white min-h-screen pb-24">
            {/* Minimalist Breadcrumb */}
            <div className="bg-white border-b border-slate-100 py-4 mb-10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center text-sm font-medium text-slate-400">
                        <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
                        <ChevronRight size={14} className="mx-2" />
                        <Link to="/products" className="hover:text-slate-900 transition-colors">Categories</Link>
                        <ChevronRight size={14} className="mx-2" />
                        <span className="text-slate-900">VEKA AD70</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Split Hero Block */}
                <div className="mb-16 bg-white border border-slate-100 rounded-[2rem] shadow-sm overflow-hidden flex flex-col md:flex-row">
                    {/* Left: Text Content */}
                    <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-slate-200">
                                Tropical Mix
                            </span>
                            <span className="text-sm font-semibold text-primary uppercase tracking-widest">
                                Premium Profile
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
                            VEKA AD70 SOFTLINE
                        </h1>
                        <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-xl">
                            Energy efficient, multi-chamber uPVC profile engineered specifically for hot climates.
                        </p>
                    </div>

                    {/* Right: Technical Profile Cross-Section Image */}
                    <div className="w-full md:w-[45%] bg-slate-50 border-l border-slate-100 p-8 md:p-12 flex flex-col items-center justify-center relative min-h-[350px]">
                        {/* Subtle background pattern (architectural feel) */}
                        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>

                        <img
                            src="/ideal-4000-200x300.png"
                            alt="VEKA Window Profile Cross Section"
                            className="relative z-10 w-auto h-[250px] object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
                        />
                        <span className="relative z-10 mt-6 text-xs text-slate-400 uppercase tracking-widest font-bold">Cross-Section Engineering</span>
                    </div>
                </div>

                {/* Content: 2-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* Left Column: Description & Gallery */}
                    <div className="lg:col-span-7">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Designed for Performance</h2>
                        <div className="text-slate-600 leading-relaxed text-lg space-y-6 mb-16">
                            <p>
                                VEKA AD70 SOFTLINE is a high-quality solution for modern window and door systems. Founded in Germany and family-run since 1969, VEKA continues to uphold the values behind its long-standing success—delivering consistent quality, efficiency, dependability, and stability to its partners.
                            </p>
                            <p>
                                The AD70 SOFTLINE range provides cost-effective, energy-saving window and door options suitable for various home styles. Whether for large architectural designs or smaller traditional homes, it comes in a broad selection of colors and opening configurations to match different needs.
                            </p>
                            <p>
                                Built with UV resistance, dual sealing, and five insulation chambers, AD70 SOFTLINE effectively separates indoor and outdoor conditions, making it one of the most energy-efficient systems available in New Zealand. When paired with double or triple glazing, it enhances energy savings while improving comfort and security throughout the year.
                            </p>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 mb-6">Gallery</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                "https://thewindowcompany.co.nz/wp-content/uploads/2022/10/aluplast-ideal-4000-upvc-window-profile.jpg",
                                "https://thewindowcompany.co.nz/wp-content/uploads/2022/10/aluplast-ideal-4000-upvc-window-cross-section.jpg",
                                "https://thewindowcompany.co.nz/wp-content/uploads/2022/10/aluplast-ideal-4000-upvc-window-south-island.jpg",
                                "https://thewindowcompany.co.nz/wp-content/uploads/2022/10/aluplast-ideal-4000-upvc-window-wellington.jpg"
                            ].map((src, idx) => (
                                <div key={idx} className="aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
                                    <img
                                        src={src}
                                        alt={`Detail ${idx + 1}`}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Key Specifications (Sticky) */}
                    <div className="lg:col-span-5 sticky top-32">
                        <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 md:p-10">
                            <h3 className="text-xl font-bold text-slate-900 mb-8">Technical Specifications</h3>
                            <ul className="space-y-6">
                                {[
                                    "UV resistant uPVC profile",
                                    "Designed for hot, sunny climates",
                                    "5 Chamber profile with RAL seal of approval",
                                    "Resists discolouration from sunlight",
                                    "Code Mark Approved through MBIE",
                                    "Free of lead and cadmium",
                                    "Recyclable profile",
                                    "Available for both windows and doors",
                                    "Specially developed PVC profile material can withstand solar radiation up to 160 kcal/cm2 and 180 kcal/cm2"
                                ].map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-4">
                                        <div className="mt-1 bg-white border border-slate-200 shadow-sm p-1.5 rounded-lg shrink-0">
                                            <Check size={14} className="text-primary" strokeWidth={3} />
                                        </div>
                                        <span className="text-slate-700 leading-relaxed font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default VekaSystem;
