import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Tag, ChevronLeft, Menu, X, LogOut, RotateCcw, Cloud, CloudOff, RefreshCw, Check, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { resetToDefaults, isOnline, syncToDatabase, syncStatus } = useAdmin();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

    const navItems = [
        { path: '/admin-8f3kL2x9', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin-8f3kL2x9/products', label: 'Products', icon: Package },
        { path: '/admin-8f3kL2x9/promo', label: 'Promo Section', icon: Tag },
        { path: '/admin-8f3kL2x9/gallery', label: 'Gallery', icon: ImageIcon },
    ];

    const isActive = (path) => {
        if (path === '/admin-8f3kL2x9') return location.pathname === '/admin-8f3kL2x9';
        return location.pathname.startsWith(path);
    };

    const getSyncIcon = () => {
        switch (syncStatus) {
            case 'syncing': return <RefreshCw size={20} className="animate-spin" />;
            case 'success': return <Check size={20} />;
            case 'error': return <AlertCircle size={20} />;
            default: return <Cloud size={20} />;
        }
    };

    const getSyncText = () => {
        switch (syncStatus) {
            case 'syncing': return 'Syncing...';
            case 'success': return 'Synced!';
            case 'error': return 'Sync Failed';
            default: return 'Sync to DB';
        }
    };

    return (
        <div className="min-h-screen bg-slate-100">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-primary text-white flex items-center justify-between px-4 z-50">
                <Link to="/" className="flex items-center gap-2">
                    <img src="/logo.png" alt="Haven" className="h-8 w-auto brightness-0 invert" />
                </Link>
                <div className="flex items-center gap-2">
                    {isOnline ? (
                        <Cloud size={20} className="text-green-400" />
                    ) : (
                        <CloudOff size={20} className="text-yellow-400" />
                    )}
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {mobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMobileMenuOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 h-full bg-primary text-white z-50 transition-all duration-300
                ${sidebarOpen ? 'w-64' : 'w-20'}
                ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
                    {sidebarOpen && (
                        <Link to="/" className="flex items-center gap-2">
                            <img src="/logo.png" alt="Haven" className="h-8 w-auto brightness-0 invert" />
                        </Link>
                    )}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="hidden lg:block p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <ChevronLeft size={20} className={`transition-transform ${!sidebarOpen ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                {/* Connection Status */}
                <div className={`mx-4 mt-4 px-4 py-2 rounded-lg flex items-center gap-2 text-sm ${isOnline ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                    {isOnline ? <Cloud size={16} /> : <CloudOff size={16} />}
                    {sidebarOpen && <span>{isOnline ? 'Connected to DB' : 'Offline Mode'}</span>}
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`
                                flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                                ${isActive(item.path)
                                    ? 'bg-secondary text-white shadow-lg'
                                    : 'hover:bg-white/10 text-white/80'
                                }
                            `}
                        >
                            <item.icon size={20} />
                            {sidebarOpen && <span className="font-medium">{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                {/* Footer Actions */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 space-y-2">
                    {/* Sync Button */}
                    <button
                        onClick={syncToDatabase}
                        disabled={syncStatus === 'syncing'}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${syncStatus === 'success'
                            ? 'bg-green-500/20 text-green-300'
                            : syncStatus === 'error'
                                ? 'bg-red-500/20 text-red-300'
                                : 'hover:bg-white/10 text-white/80'
                            }`}
                    >
                        {getSyncIcon()}
                        {sidebarOpen && <span>{getSyncText()}</span>}
                    </button>


                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-white/60 transition-colors"
                    >
                        <LogOut size={20} />
                        {sidebarOpen && <span>Exit Admin</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`
                transition-all duration-300 pt-16 lg:pt-0
                ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}
            `}>
                <div className="p-6 lg:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
