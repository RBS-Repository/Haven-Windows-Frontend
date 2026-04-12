 import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { productCategories } from '../data/products';

// API Base URL - uses Vite proxy in development or Vercel rewrites in production
const API_BASE = import.meta.env.VITE_API_BASE || '/api';

// Default promo content (used only as fallback when DB is empty)
const defaultPromo = {
    tagText: "Special Offer",
    title: "Already have a quote?",
    description: "We aim to beat any comparable written quotes by up to",
    highlightText: "15%",
    buttonText: "Learn More",
    buttonLink: "#contact"
};

const AdminContext = createContext(null);

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within AdminProvider');
    }
    return context;
};

export const AdminProvider = ({ children }) => {
    const [products, setProducts] = useState(productCategories);
    const [promo, setPromo] = useState(defaultPromo);
    const [gallery, setGallery] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOnline, setIsOnline] = useState(false);
    const [syncStatus, setSyncStatus] = useState('idle'); // idle, syncing, success, error

    // Fetch data from backend
    const fetchData = useCallback(async () => {
        try {
            // Check backend health
            const healthRes = await fetch(`${API_BASE}/health`);
            if (healthRes.ok) {
                setIsOnline(true);

                // Fetch products from MongoDB
                const productsRes = await fetch(`${API_BASE}/products`);
                if (productsRes.ok) {
                    const data = await productsRes.json();
                    setProducts(data);
                }

                // Fetch promo from MongoDB
                const promoRes = await fetch(`${API_BASE}/promo`);
                if (promoRes.ok) {
                    const promoData = await promoRes.json();
                    setPromo(promoData);
                }

                // Fetch gallery from MongoDB
                const galleryRes = await fetch(`${API_BASE}/gallery`);
                if (galleryRes.ok) {
                    const galleryData = await galleryRes.json();
                    setGallery(galleryData);
                }
            } else {
                throw new Error('Backend not available');
            }
        } catch (error) {
            console.error('Backend connection error:', error);
            setIsOnline(false);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Initialize data on mount
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Sync current data to MongoDB
    const syncToDatabase = useCallback(async () => {
        if (!isOnline) {
            alert('Backend is not connected. Please start the server.');
            return false;
        }

        setSyncStatus('syncing');
        try {
            // Sync products
            const productsRes = await fetch(`${API_BASE}/products/sync`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ categories: products })
            });

            // Sync promo
            const promoRes = await fetch(`${API_BASE}/promo`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(promo)
            });

            if (productsRes.ok && promoRes.ok) {
                setSyncStatus('success');
                setTimeout(() => setSyncStatus('idle'), 3000);
                return true;
            } else {
                throw new Error('Sync failed');
            }
        } catch (error) {
            console.error('Sync error:', error);
            setSyncStatus('error');
            setTimeout(() => setSyncStatus('idle'), 3000);
            return false;
        }
    }, [products, promo, isOnline]);

    // Save category to DB
    const saveCategory = async (categoryData) => {
        if (isOnline) {
            try {
                await fetch(`${API_BASE}/category/${categoryData.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(categoryData)
                });
            } catch (error) {
                console.error('Failed to save to DB:', error);
            }
        }
    };

    // Product/Category CRUD operations
    const updateCategory = (categoryId, updates) => {
        setProducts(prev => {
            const updated = prev.map(cat =>
                cat.id === categoryId ? { ...cat, ...updates } : cat
            );
            const updatedCat = updated.find(c => c.id === categoryId);
            if (updatedCat) saveCategory(updatedCat);
            return updated;
        });
    };

    const addCategory = async (newCategory) => {
        const id = newCategory.title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
        const categoryData = { ...newCategory, id, images: newCategory.images || [], specs: newCategory.specs || {} };

        if (isOnline) {
            try {
                const res = await fetch(`${API_BASE}/category`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(categoryData)
                });
                if (res.ok) {
                    const saved = await res.json();
                    setProducts(prev => [...prev, saved]);
                    return saved;
                }
            } catch (error) {
                console.error('Failed to add category to DB:', error);
            }
        }

        setProducts(prev => [...prev, categoryData]);
        return categoryData;
    };

    const deleteCategory = async (categoryId) => {
        setProducts(prev => prev.filter(cat => cat.id !== categoryId));
        if (isOnline) {
            try {
                await fetch(`${API_BASE}/category/${categoryId}`, { method: 'DELETE' });
            } catch (error) {
                console.error('Failed to delete from DB:', error);
            }
        }
    };


    // Promo update
    const updatePromo = async (updates) => {
        const newPromo = { ...promo, ...updates };
        setPromo(newPromo);

        if (isOnline) {
            try {
                await fetch(`${API_BASE}/promo`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newPromo)
                });
            } catch (error) {
                console.error('Failed to save promo to DB:', error);
            }
        }
    };

    // Gallery operations
    const addGalleryItem = async (newItem) => {
        if (isOnline) {
            try {
                const res = await fetch(`${API_BASE}/gallery`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newItem)
                });
                if (res.ok) {
                    const saved = await res.json();
                    setGallery(prev => [saved, ...prev]);
                    return saved;
                }
            } catch (error) {
                console.error('Failed to add gallery item:', error);
            }
        }
        // Fallback for offline or static data
        setGallery(prev => [{ ...newItem, _id: Date.now().toString() }, ...prev]);
    };

    const deleteGalleryItem = async (id) => {
        setGallery(prev => prev.filter(item => (item._id || item.id) !== id));
        if (isOnline) {
            try {
                await fetch(`${API_BASE}/gallery/${id}`, { method: 'DELETE' });
            } catch (error) {
                console.error('Failed to delete gallery item:', error);
            }
        }
    };

    const syncGallery = async (items) => {
        if (isOnline) {
            try {
                const res = await fetch(`${API_BASE}/gallery/sync`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ items })
                });
                if (res.ok) {
                    const data = await res.json();
                    await fetchData();
                    return true;
                }
            } catch (error) {
                console.error('Failed to sync gallery:', error);
            }
        }
        return false;
    };

    // Reset - clears local state and refetches from DB
    const resetToDefaults = async () => {
        setProducts([]);
        setPromo(defaultPromo);
        if (isOnline) {
            await fetchData();
        }
    };

    const value = {
        products,
        promo,
        isLoading,
        isOnline,
        syncStatus,
        syncToDatabase,
        fetchData,
        updateCategory,
        addCategory,
        deleteCategory,
        updatePromo,
        gallery,
        addGalleryItem,
        deleteGalleryItem,
        syncGallery,
        resetToDefaults
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminContext;
