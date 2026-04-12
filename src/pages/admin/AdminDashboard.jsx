import { Package, Tag, TrendingUp, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';

const AdminDashboard = () => {
    const { products, promo } = useAdmin();

    // Calculate stats
    const totalCategories = products?.length || 0;
    const totalProducts = (products || []).reduce((acc, cat) => acc + (cat?.products?.length || 0), 0);
    const windowCategories = (products || []).filter(p => p.type === 'windows').length;
    const doorCategories = (products || []).filter(p => p.type === 'doors').length;

    const stats = [
        {
            label: 'Total Categories',
            value: totalCategories,
            icon: Package,
            color: 'bg-blue-500',
            link: '/admin-8f3kL2x9/products'
        },
        {
            label: 'Total Products',
            value: totalProducts,
            icon: TrendingUp,
            color: 'bg-green-500',
            link: '/admin-8f3kL2x9/products'
        },
        {
            label: 'Window Types',
            value: windowCategories,
            icon: Package,
            color: 'bg-purple-500',
            link: '/admin-8f3kL2x9/products'
        },
        {
            label: 'Door Types',
            value: doorCategories,
            icon: Package,
            color: 'bg-orange-500',
            link: '/admin-8f3kL2x9/products'
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
                    <p className="text-slate-500 mt-1">Welcome to the Haven Admin Panel</p>
                </div>
                <Link
                    to="/"
                    target="_blank"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
                >
                    <Eye size={18} />
                    View Live Site
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <Link
                        key={index}
                        to={stat.link}
                        className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                                <p className="text-3xl font-bold text-primary mt-2">{stat.value}</p>
                            </div>
                            <div className={`${stat.color} p-3 rounded-xl text-white group-hover:scale-110 transition-transform`}>
                                <stat.icon size={24} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Categories */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-primary">Recent Categories</h2>
                        <Link to="/admin-8f3kL2x9/products" className="text-secondary hover:underline text-sm font-medium">
                            View All
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {products.slice(0, 4).map((category) => (
                            <div key={category.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                                <img
                                    src={category.image}
                                    alt={category.title}
                                    className="w-12 h-12 rounded-lg object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-primary truncate">{category.title}</p>
                                    <p className="text-sm text-slate-500 capitalize">{category.type}</p>
                                </div>
                                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                                    {category.products.length} products
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Promo Preview */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-primary">Current Promo</h2>
                        <Link to="/admin-8f3kL2x9/promo" className="text-secondary hover:underline text-sm font-medium">
                            Edit
                        </Link>
                    </div>
                    <div className="bg-secondary rounded-xl p-6 text-white">
                        <div className="flex items-center gap-3 mb-2">
                            <Tag size={20} />
                            <span className="bg-white text-secondary text-xs font-bold px-3 py-1 rounded-full uppercase">
                                {promo.tagText}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{promo.title}</h3>
                        <p className="text-white/90">
                            {promo.description} <span className="font-bold underline">{promo.highlightText}</span>.
                        </p>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default AdminDashboard;
