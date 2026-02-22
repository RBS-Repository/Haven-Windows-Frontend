export const productCategories = [
    // --- Windows ---
    {
        id: "fixed-window",
        type: "windows",
        title: "Fixed Window",
        description: "Non-opening windows designed to maximize views and natural light.",
        image: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        products: [
            {
                id: "fixed-standard",
                title: "Standard Fixed Lite",
                description: "Clean lines and maximum glass area for unobstructed views.",
                longDescription: "Our Standard Fixed Lite windows offer the perfect balance of simplicity and performance. With no opening sash, they provide the highest thermal efficiency in our range.",
                image: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                specs: {
                    "Frame": "German VEKA uPVC",
                    "Glass": "Double Glazed Low-E",
                    "Compliance": "Exceeds NZS4211",
                    "Warranty": "10 Years"
                }
            },
            {
                id: "fixed-architectural",
                title: "Architectural Shape",
                description: "Custom geometric shapes including raked, arched, and circular windows.",
                longDescription: "Make a statement with custom shaped fixed windows. Perfect for gables or feature walls, maintaining high thermal performance.",
                image: "https://images.unsplash.com/photo-1533035336122-4327d347d2fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                specs: {
                    "Frame": "German VEKA uPVC (Bendable)",
                    "Glass": "Custom Safety Glass",
                    "Compliance": "Exceeds NZS4211",
                    "Warranty": "10 Years"
                }
            }
        ]
    },
    {
        id: "sliding-window",
        type: "windows",
        title: "Sliding Window",
        description: "Space-saving design perfect for areas where outward opening windows aren't practical.",
        image: "https://images.unsplash.com/photo-1596707338309-9fc6d691079d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        products: [
            {
                id: "sliding-duo",
                title: "Duo Slider",
                description: "Two-panel sliding window with one fixed and one sliding panel.",
                longDescription: "The classic sliding window config. Smooth operation on high-quality rollers.",
                image: "https://images.unsplash.com/photo-1596707338309-9fc6d691079d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                specs: {
                    "Frame": "VEKA Sliding System",
                    "Glass": "Double Glazed",
                    "Rail": "Aluminium/Steel Track",
                    "Compliance": "Exceeds NZS4211"
                }
            },
            {
                id: "sliding-stacker",
                title: "Stacker Window",
                description: "Multi-panel window where two panels slide behind a fixed one.",
                longDescription: "Open up wide with a stacker window, creating a massive connection to the outdoors.",
                image: "https://images.unsplash.com/photo-1600573472535-9cddf524b079?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                specs: {
                    "Frame": "VEKA Multi-track",
                    "Glass": "Toughened Safety Glass",
                    "Compliance": "Exceeds NZS4211",
                    "Warranty": "10 Years"
                }
            }
        ]
    },
    {
        id: "awning-window",
        type: "windows",
        title: "Awning Window",
        description: "Hinged at the top and opening outwards for ventilation in all weathers.",
        image: "https://images.unsplash.com/photo-1628744876497-eb30460be9f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        products: [
            {
                id: "awning-standard",
                title: "Standard Awning",
                description: "Top-hinged window with friction stays.",
                longDescription: "The most popular window style in NZ. Allows airflow while keeping rain out.",
                image: "https://images.unsplash.com/photo-1628744876497-eb30460be9f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                specs: {
                    "Frame": "VEKA 70mm System",
                    "Hardware": "Stainless Friction Stays",
                    "Compliance": "Exceeds NZS4211",
                    "Warranty": "10 Years"
                }
            }
        ]
    },
    {
        id: "tilt-turn-window",
        type: "windows",
        title: "Tilt & Turn Window",
        description: "European standard. Tilts for ventilation, turns for cleaning.",
        image: "https://images.unsplash.com/photo-1503708928676-1cb796a0891e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        products: [
            {
                id: "tilt-turn-std",
                title: "Tilt & Turn Classic",
                description: "Inward opening window with dual function usage.",
                longDescription: "Secure ventilation in tilt mode, full access in turn mode. The ultimate versatile window.",
                image: "https://images.unsplash.com/photo-1503708928676-1cb796a0891e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                specs: {
                    "Frame": "VEKA Tilt & Turn",
                    "Hardware": "ROTO/SIEGENIA Gear",
                    "Security": "Multi-point Cam Lock",
                    "Compliance": "Exceeds NZS4211"
                }
            }
        ]
    },

    // --- Doors ---
    {
        id: "hinge-door",
        type: "doors",
        title: "Entrance Door",
        description: "Secure, heavy-duty uPVC entrance doors.",
        image: "https://images.unsplash.com/photo-1489171079546-d2508db563b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        products: [
            {
                id: "entry-single",
                title: "Single Entrance Door",
                description: "Classic single door with high security locking.",
                longDescription: "A robust main entry door featuring 5-point locking and steel reinforcement.",
                image: "https://images.unsplash.com/photo-1489171079546-d2508db563b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                specs: {
                    "Frame": "VEKA Door System",
                    "Locking": "5-Point Hook Lock",
                    "Threshold": "Aluminium Low Step",
                    "Compliance": "Exceeds NZS4211"
                }
            }
        ]
    },
    {
        id: "french-door",
        type: "doors",
        title: "French Door",
        description: "Classic double opening doors.",
        image: "https://images.unsplash.com/photo-1518982367980-60b6d9134b28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        products: [
            {
                id: "french-classic",
                title: "Classic French Pair",
                description: "Double opening doors for maximum width.",
                longDescription: "Traditional aesthetic with modern performance. Both leaves open out or in.",
                image: "https://images.unsplash.com/photo-1518982367980-60b6d9134b28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                specs: {
                    "Frame": "VEKA System",
                    "Hinges": "3D Adjustable",
                    "Glass": "Toughened Safety",
                    "Compliance": "Exceeds NZS4211"
                }
            }
        ]
    },
    {
        id: "sliding-door",
        type: "doors",
        title: "Sliding Door",
        description: "Smooth gliding patio doors.",
        image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        products: [
            {
                id: "slider-patio",
                title: "Patio Slider",
                description: "Standard 2-panel sliding door.",
                longDescription: "Connect your living space to the deck with this effortless sliding door.",
                image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                specs: {
                    "Frame": "VEKA Slider",
                    "Wheels": "Heavy Duty Bogie",
                    "Compliance": "Exceeds NZS4211",
                    "Warranty": "10 Years"
                }
            }
        ]
    }
];
