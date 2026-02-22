import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HomeProductCarousel = () => {
    return (
        <section className="py-24 bg-slate-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <h2 className="text-4xl font-bold text-primary mb-4 text-center">Our Products</h2>
                <p className="text-slate-500 max-w-xl mx-auto text-center">Discover our range of premium uPVC systems, engineered for the New Zealand climate.</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                    {/* Windows Tile */}
                    <Link to="/products#windows" className="group relative h-[500px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                        <div className="absolute inset-0 bg-secondary/10 group-hover:bg-secondary/20 transition-colors z-10" />
                        <img
                            src="https://icdn.tradew.com/file/202204/1575393/jpg/8001745.jpg?x-oss-process=image/resize,m_pad,l_800/quality,Q_90"
                            alt="uPVC Windows"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20" />

                        <div className="absolute bottom-0 left-0 p-10 z-30 w-full">
                            <h3 className="text-4xl font-bold text-white mb-4">uPVC Windows</h3>
                            <p className="text-slate-200 mb-8 text-lg max-w-sm">Fixed, Sliding, Awning, and Tilt & Turn options for every home.</p>

                            <div className="flex items-center gap-3 text-white font-bold group-hover:translate-x-2 transition-transform">
                                Explore Collection <ArrowRight className="bg-white/20 rounded-full p-1" size={28} />
                            </div>
                        </div>
                    </Link>

                    {/* Doors Tile */}
                    <Link to="/products#doors" className="group relative h-[500px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                        <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors z-10" />
                        <img
                            src="https://icdn.tradew.com/file/202204/1575393/jpg/8016053.jpg?x-oss-process=image/resize,m_pad,l_800/quality,Q_90"
                            alt="uPVC Doors"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20" />

                        <div className="absolute bottom-0 left-0 p-10 z-30 w-full">
                            <h3 className="text-4xl font-bold text-white mb-4">uPVC Doors</h3>
                            <p className="text-slate-200 mb-8 text-lg max-w-sm">Seamless indoor-outdoor flow with Hinge, French, and Sliding doors.</p>

                            <div className="flex items-center gap-3 text-white font-bold group-hover:translate-x-2 transition-transform">
                                Explore Collection <ArrowRight className="bg-white/20 rounded-full p-1" size={28} />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HomeProductCarousel;
