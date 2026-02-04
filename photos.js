// ============================================
// ST. CROIX MATERIALS — PHOTO GALLERY
// ============================================
// To add a new photo:
//   1. Process your photo (resize to ~1600px max, add watermark)
//   2. Add the photo file to the /photos/ folder
//   3. Add a new line below following the same format
//   4. Commit and push to GitHub
//
// Format: { file: "filename.jpg", title: "Display Title", alt: "SEO description", category: "category" }
// Categories: pumping, flatwork, residential, commercial, agricultural
// ============================================

var GALLERY = [
    { file: "lakeside-patio-night.jpg",    title: "Lakeside Patio at Night",       alt: "Glow-in-the-dark aggregate concrete patio with fire pit overlooking lake at night in Wisconsin",         category: "residential" },
    { file: "pump-truck-wind-turbine.jpg", title: "Wind Turbine Foundation Pour",   alt: "St. Croix Materials pump truck pouring concrete for a wind turbine foundation in Northwest Wisconsin",  category: "pumping" },
    { file: "stamped-patio-curved.jpg",    title: "Stamped Concrete Patio",         alt: "Decorative stamped concrete patio with curved edge at residential home in Northwest Wisconsin",          category: "residential" },
    { file: "polished-barn-floor.jpg",     title: "Polished Barn Floor",            alt: "Polished and finished concrete barn floor with reflective surface in Northwest Wisconsin",               category: "flatwork" },
    { file: "shop-apron-scored.jpg",       title: "Commercial Shop Apron",          alt: "Freshly poured and scored concrete shop apron for commercial building in Northwest Wisconsin",           category: "commercial" },
    { file: "pump-truck-sunset.jpg",       title: "Pump Truck at Sunset",           alt: "St. Croix Materials concrete pump truck silhouetted at sunset on Wisconsin farmland",                    category: "pumping" },
    { file: "foundation-slab-shadows.jpg", title: "Foundation Slab Pour",           alt: "Concrete foundation slab pour with steel framing casting shadows in Northwest Wisconsin",                category: "flatwork" },
    { file: "residential-driveway.jpg",    title: "Residential Driveway",           alt: "Fresh concrete residential driveway pour with stone accent house in Northwest Wisconsin",                category: "residential" },
    { file: "agricultural-feed-bunk.jpg",  title: "Agricultural Feed Bunk",         alt: "Concrete agricultural feed bunk pad near grain bin in Northwest Wisconsin",                              category: "agricultural" },
    { file: "pump-truck-golden-hour.jpg",  title: "Pump Truck at Dusk",             alt: "St. Croix Materials concrete pump truck operating at golden hour near Centuria Wisconsin",               category: "pumping" },
    { file: "foundation-pour-icf.jpg",     title: "ICF Foundation Pour",            alt: "Insulated concrete form foundation pour surrounded by pine trees in Northwest Wisconsin",                category: "flatwork" },
    { file: "polished-shop-floor.jpg",     title: "Polished Shop Floor",            alt: "Polished concrete shop floor with reflective finish in Northwest Wisconsin barn",                        category: "flatwork" },
    { file: "driveway-garage.jpg",         title: "Residential Driveway & Garage",  alt: "Fresh concrete driveway and garage apron pour at residential home in Northwest Wisconsin",               category: "residential" },
    { file: "lakeside-retaining-wall.jpg", title: "Lakeside Foundation",            alt: "Concrete retaining wall and foundation built lakeside in Northwest Wisconsin",                           category: "flatwork" },
    { file: "shop-apron-interior.jpg",     title: "Shop Apron from Interior",       alt: "View of fresh concrete shop apron from inside garage in Northwest Wisconsin",                            category: "flatwork" },
    { file: "barn-floor-perspective.jpg",  title: "Barn Floor",                     alt: "Long perspective view of concrete barn floor in Northwest Wisconsin agricultural building",              category: "flatwork" },
    { file: "gas-station-sidewalk.jpg",    title: "Gas Station Sidewalk",           alt: "Commercial concrete sidewalk and curb work at gas station in Northwest Wisconsin",                       category: "commercial" },
    { file: "municipal-curb-work.jpg",     title: "Municipal Curb & Gutter",        alt: "Municipal concrete curb and gutter work in Northwest Wisconsin",                                         category: "commercial" },
    { file: "commercial-sidewalk.jpg",     title: "Commercial Sidewalk",            alt: "Fresh concrete sidewalk and apron pour at commercial building in Northwest Wisconsin",                   category: "commercial" },
    { file: "cabin-interior.jpg",          title: "Cabin Interior",                 alt: "Finished cabin interior with concrete foundation work by St. Croix Materials",                           category: "residential" }
];
