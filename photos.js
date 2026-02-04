// ============================================
// ST. CROIX MATERIALS — PHOTO GALLERY (70 photos)
// ============================================
// To add a new photo:
//   1. Resize to ~1600px max, add watermark
//   2. Drop the file in the /photos/ folder
//   3. Add a new line below
//   4. Commit and push
//
// Categories: pumping, flatwork, residential, commercial, agricultural
// ============================================

var GALLERY = [
    // === HERO / SHOWCASE ===
    { file: "lakeside-patio-night.jpg",       title: "Lakeside Patio at Night",       alt: "Glow-in-the-dark aggregate concrete patio with fire pit overlooking lake at night in Wisconsin",         category: "residential" },
    { file: "pump-truck-wind-turbine.jpg",    title: "Wind Turbine Foundation",       alt: "St. Croix Materials pump truck pouring concrete for a wind turbine foundation in Northwest Wisconsin",  category: "pumping" },
    { file: "stamped-herringbone-walkway.jpg",title: "Herringbone Walkway",           alt: "Stamped herringbone brick pattern concrete walkway with steps in Northwest Wisconsin",                   category: "residential" },
    { file: "mixer-truck-branded.jpg",        title: "St. Croix Materials Mixer",     alt: "St. Croix Materials branded concrete mixer truck in Northwest Wisconsin",                               category: "pumping" },
    { file: "pump-mixer-foggy.jpg",           title: "Pump & Mixer on Site",          alt: "St. Croix Materials pump truck and mixer truck working together on foggy Wisconsin morning",             category: "pumping" },
    { file: "fire-pit-steps-patio.jpg",       title: "Fire Pit Patio",                alt: "Circular concrete fire pit patio with concrete steps at residential property in Wisconsin",              category: "residential" },

    // === RESIDENTIAL ===
    { file: "stamped-patio-curved.jpg",       title: "Stamped Curved Patio",          alt: "Decorative stamped concrete patio with curved edge at residential home in Northwest Wisconsin",          category: "residential" },
    { file: "stamped-patio-barndominium.jpg", title: "Stamped Barndominium Patio",    alt: "Stamped concrete patio at modern barndominium with birch trees in Northwest Wisconsin",                  category: "residential" },
    { file: "stamped-patio-entrance.jpg",     title: "Stamped Patio Entrance",        alt: "Stamped concrete patio at barndominium entrance with timber frame in Northwest Wisconsin",               category: "residential" },
    { file: "stamped-patio-dark.jpg",         title: "Stamped Patio Dark Finish",     alt: "Dark stamped concrete patio with decorative border at home in Northwest Wisconsin",                      category: "residential" },
    { file: "lakeside-stamped-patio.jpg",     title: "Lakeside Stamped Patio",        alt: "Stamped concrete patio overlooking lake in Northwest Wisconsin",                                         category: "residential" },
    { file: "stamped-wood-plank.jpg",         title: "Wood Plank Stamp",              alt: "Stamped concrete wood plank pattern patio at home in Northwest Wisconsin",                               category: "residential" },
    { file: "wood-plank-stamp-closeup.jpg",   title: "Wood Plank Detail",             alt: "Detailed view of wood plank stamped concrete pattern in Northwest Wisconsin",                            category: "residential" },
    { file: "stamped-entry-step.jpg",         title: "Stamped Entry Step",            alt: "Textured stamped concrete front entry step at new construction in Northwest Wisconsin",                  category: "residential" },
    { file: "stamped-texture-closeup.jpg",    title: "Stamped Texture Detail",        alt: "Closeup of stamped concrete texture with gravel border in Northwest Wisconsin",                          category: "residential" },
    { file: "wooded-lot-driveway.jpg",        title: "Wooded Lot Driveway",           alt: "Scored concrete driveway pour at wooded residential lot in Northwest Wisconsin",                         category: "residential" },
    { file: "residential-driveway.jpg",       title: "Residential Driveway",          alt: "Fresh concrete residential driveway pour with stone accent house in Northwest Wisconsin",                category: "residential" },
    { file: "long-driveway-pour.jpg",         title: "Long Driveway Pour",            alt: "Long straight concrete driveway pour at residential property in Northwest Wisconsin",                    category: "residential" },
    { file: "driveway-garage.jpg",            title: "Driveway & Garage Apron",       alt: "Fresh concrete driveway and garage apron pour at residential home in Northwest Wisconsin",               category: "residential" },
    { file: "stained-driveway-cedar.jpg",     title: "Stained Driveway",              alt: "Stained concrete driveway apron at cedar-sided home in Northwest Wisconsin",                             category: "residential" },
    { file: "colored-concrete-closeup.jpg",   title: "Colored Concrete",              alt: "Stamped and colored concrete driveway closeup in Northwest Wisconsin",                                   category: "residential" },
    { file: "concrete-hillside-steps.jpg",    title: "Hillside Steps",                alt: "Poured concrete hillside staircase at residential property in Northwest Wisconsin",                      category: "residential" },
    { file: "hillside-steps-long.jpg",        title: "Long Hillside Staircase",       alt: "Long concrete hillside staircase with forms at residential property in Northwest Wisconsin",             category: "residential" },
    { file: "colored-patio-cabin.jpg",        title: "Colored Cabin Patio",           alt: "Colored concrete patio and steps at wooded cabin in Northwest Wisconsin",                                category: "residential" },
    { file: "residential-sidewalk.jpg",       title: "Residential Sidewalk",          alt: "Fresh concrete sidewalk pour at residential property in Northwest Wisconsin",                            category: "residential" },
    { file: "stamped-walkway-narrow.jpg",     title: "Stamped Walkway",               alt: "Narrow stamped concrete walkway at residential property in Northwest Wisconsin",                         category: "residential" },
    { file: "lakeside-slab-pour.jpg",         title: "Lakeside Slab Pour",            alt: "Concrete slab pour at lakeside home with water view in Northwest Wisconsin",                             category: "residential" },
    { file: "garage-slab-pour.jpg",           title: "Garage Slab Pour",              alt: "Fresh concrete garage and driveway slab pour at residential home in Northwest Wisconsin",                category: "residential" },
    { file: "new-build-garage-steps.jpg",     title: "New Build Garage & Steps",      alt: "Fresh concrete garage slab and entry steps at new construction in Northwest Wisconsin",                  category: "residential" },
    { file: "new-construction-apron.jpg",     title: "New Construction Apron",        alt: "Fresh concrete garage apron pour at new home construction in Northwest Wisconsin",                       category: "residential" },
    { file: "cabin-interior.jpg",             title: "Cabin Interior",                alt: "Finished cabin interior with concrete foundation work by St. Croix Materials",                           category: "residential" },

    // === PUMPING ===
    { file: "pump-truck-sunset.jpg",          title: "Pump Truck at Sunset",          alt: "St. Croix Materials concrete pump truck silhouetted at sunset on Wisconsin farmland",                    category: "pumping" },
    { file: "pump-tall-boom-pour.jpg",        title: "Tall Boom Pour",                alt: "St. Croix Materials pump truck with tall boom pouring slab on blue sky day in Wisconsin",               category: "pumping" },
    { file: "pump-truck-elevated-pour.jpg",   title: "Elevated Pour",                 alt: "St. Croix Materials pump truck with boom elevated pouring on sunny day in Wisconsin",                   category: "pumping" },
    { file: "pump-mixer-fall-pour.jpg",       title: "Fall Pour",                     alt: "Pump truck and mixer operating on fall job site with blue sky in Northwest Wisconsin",                   category: "pumping" },
    { file: "pump-icf-foundation.jpg",        title: "ICF Foundation Pour",           alt: "Pump truck pouring concrete over ICF walls and rebar grid in Northwest Wisconsin",                      category: "pumping" },
    { file: "pump-boom-icf-hillside.jpg",     title: "Hillside ICF Pour",             alt: "Pump boom reaching over ICF foundation on hillside near lake home in Northwest Wisconsin",              category: "pumping" },
    { file: "pump-truck-dramatic-sky.jpg",    title: "Pump Truck Dramatic Sky",       alt: "St. Croix Materials pump truck with boom extended under dramatic clouds in Wisconsin",                  category: "pumping" },
    { file: "pump-boom-extended.jpg",         title: "Pump Boom Extended",            alt: "St. Croix Materials pump truck with boom fully extended on job site in Wisconsin",                       category: "pumping" },
    { file: "pump-truck-golden-hour.jpg",     title: "Pump Truck at Dusk",            alt: "St. Croix Materials concrete pump truck operating at golden hour near Centuria Wisconsin",               category: "pumping" },
    { file: "pump-truck-winter-pour.jpg",     title: "Winter Pour",                   alt: "St. Croix Materials pump truck on winter concrete pour job site in Wisconsin",                           category: "pumping" },

    // === FLATWORK ===
    { file: "polished-barn-floor.jpg",        title: "Polished Barn Floor",           alt: "Polished and finished concrete barn floor with reflective surface in Northwest Wisconsin",               category: "flatwork" },
    { file: "polished-shop-floor.jpg",        title: "Polished Shop Floor",           alt: "Polished concrete shop floor with reflective finish in Northwest Wisconsin barn",                        category: "flatwork" },
    { file: "pavilion-floor-wooded.jpg",      title: "Pavilion Floor",                alt: "Polished concrete pavilion floor surrounded by trees in Northwest Wisconsin",                            category: "flatwork" },
    { file: "curved-walkway-barndo.jpg",      title: "Curved Walkway",                alt: "Curved concrete walkway with clean edge at barndominium in Northwest Wisconsin",                        category: "flatwork" },
    { file: "barndominium-slab-scored.jpg",   title: "Barndominium Slab",             alt: "Scored concrete slab at modern barndominium with timber accents in Northwest Wisconsin",                category: "flatwork" },
    { file: "new-construction-floor.jpg",     title: "New Construction Floor",        alt: "Smooth concrete floor pour in new home construction in Northwest Wisconsin",                             category: "flatwork" },
    { file: "foundation-slab-shadows.jpg",    title: "Foundation Slab",               alt: "Concrete foundation slab pour with steel framing casting shadows in Northwest Wisconsin",                category: "flatwork" },
    { file: "foundation-pour-icf.jpg",        title: "ICF Foundation",                alt: "Insulated concrete form foundation pour surrounded by pine trees in Northwest Wisconsin",                category: "flatwork" },
    { file: "large-foundation-skidsteer.jpg", title: "Large Foundation",              alt: "Large concrete foundation slab pour with skid steer on site in Northwest Wisconsin",                    category: "flatwork" },
    { file: "long-slab-pour.jpg",             title: "Long Slab Pour",                alt: "Long concrete foundation slab pour with tree line in Northwest Wisconsin",                               category: "flatwork" },
    { file: "rebar-grid-pour.jpg",            title: "Rebar Grid Pour",               alt: "Concrete truck pouring over rebar grid for residential foundation in Northwest Wisconsin",               category: "flatwork" },
    { file: "shop-apron-scored.jpg",          title: "Shop Apron Scored",             alt: "Freshly poured and scored concrete shop apron for commercial building in Northwest Wisconsin",           category: "flatwork" },
    { file: "shop-apron-interior.jpg",        title: "Shop Apron Interior View",      alt: "View of fresh concrete shop apron from inside garage in Northwest Wisconsin",                            category: "flatwork" },
    { file: "barn-floor-perspective.jpg",     title: "Barn Floor",                    alt: "Long perspective view of concrete barn floor in Northwest Wisconsin agricultural building",              category: "flatwork" },
    { file: "bridge-deck-railing.jpg",        title: "Bridge Deck",                   alt: "Concrete bridge deck with metal railing in Northwest Wisconsin",                                         category: "flatwork" },
    { file: "foundation-footings.jpg",        title: "Foundation Footings",           alt: "Concrete foundation footings excavation for new building in Northwest Wisconsin",                        category: "flatwork" },
    { file: "icf-wall-construction.jpg",      title: "ICF Wall Construction",         alt: "Insulated concrete form wall construction for new building in Northwest Wisconsin",                     category: "flatwork" },
    { file: "lakeside-foundation-rebar.jpg",  title: "Lakeside Foundation Prep",      alt: "Foundation pad with rebar grid overlooking lake in Northwest Wisconsin",                                 category: "flatwork" },
    { file: "lakeside-icf-wall.jpg",          title: "Lakeside ICF Foundation",       alt: "ICF concrete foundation wall form overlooking lake in Northwest Wisconsin",                              category: "flatwork" },
    { file: "lakeside-retaining-wall.jpg",    title: "Lakeside Foundation",           alt: "Concrete retaining wall and foundation built lakeside in Northwest Wisconsin",                           category: "flatwork" },

    // === COMMERCIAL ===
    { file: "stamped-shop-apron.jpg",         title: "Stamped Shop Apron",            alt: "Stamped ashlar pattern concrete apron at white shop building in Northwest Wisconsin",                    category: "commercial" },
    { file: "commercial-shop-floor.jpg",      title: "Commercial Shop Floor",         alt: "Large commercial shop building concrete floor pour in Northwest Wisconsin",                              category: "commercial" },
    { file: "commercial-building-apron.jpg",  title: "Commercial Building Apron",     alt: "Concrete apron pour at commercial building in Northwest Wisconsin",                                     category: "commercial" },
    { file: "ski-resort-pour.jpg",            title: "Ski Resort Pour",               alt: "Concrete mixer truck at ski resort chairlift foundation pour in Wisconsin",                              category: "commercial" },
    { file: "gas-station-sidewalk.jpg",       title: "Gas Station Sidewalk",          alt: "Commercial concrete sidewalk and curb work at gas station in Northwest Wisconsin",                       category: "commercial" },
    { file: "commercial-sidewalk.jpg",        title: "Commercial Sidewalk",           alt: "Fresh concrete sidewalk and apron pour at commercial building in Northwest Wisconsin",                   category: "commercial" },
    { file: "municipal-curb-work.jpg",        title: "Municipal Curb & Gutter",       alt: "Municipal concrete curb and gutter work in Northwest Wisconsin",                                         category: "commercial" },

    // === AGRICULTURAL ===
    { file: "agricultural-feed-bunk.jpg",     title: "Feed Bunk Pad",                 alt: "Concrete agricultural feed bunk pad near grain bin in Northwest Wisconsin",                              category: "agricultural" },
    { file: "barn-apron-farmstead.jpg",       title: "Barn Apron",                    alt: "Concrete barn apron pour at red barn farmstead in Northwest Wisconsin",                                   category: "agricultural" }
];
