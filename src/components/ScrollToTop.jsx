import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        // Only scroll to top if there's no hash in the URL on initial navigation
        if (!hash) {
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);

    useEffect(() => {
        // Handle hash scrolling with a slight delay to ensure elements are rendered
        if (hash) {
            const element = document.getElementById(hash.replace('#', ''));
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [hash, pathname]); // Also re-trigger on pathname change to handle initial landing

    return null;
}
