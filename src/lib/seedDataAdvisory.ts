export const symptomsSeed = [
  // C001 (Maize)
  { symptom_id: "S001", disease_id: "D001", disease_name: "Maize Lethal Necrosis (MLN)", symptom_description: "Chlorotic mottling and yellow streaking starting from the leaf base, progressing upwards.", severity_stage: "Early Stage" },
  { symptom_id: "S002", disease_id: "D001", disease_name: "Maize Lethal Necrosis (MLN)", symptom_description: "Severe leaf necrosis, premature drying ('dead heart' symptom), stunted plant growth, and poor or no cob formation.", severity_stage: "Advanced Stage" },
  { symptom_id: "S003", disease_id: "D002", disease_name: "Gray Leaf Spot", symptom_description: "Small, narrow, tan-to-gray rectangular lesions running parallel to leaf veins.", severity_stage: "Early Stage" },
  { symptom_id: "S004", disease_id: "D002", disease_name: "Gray Leaf Spot", symptom_description: "Lesions merge, causing large areas of leaf blighting, premature leaf death, and stalk lodging.", severity_stage: "Advanced Stage" },
  { symptom_id: "S005", disease_id: "D003", disease_name: "Maize Streak Virus (MSV)", symptom_description: "Narrow, broken, pale yellow or chlorotic streaks running parallel to leaf veins.", severity_stage: "Early Stage" },
  { symptom_id: "S006", disease_id: "D003", disease_name: "Maize Streak Virus (MSV)", symptom_description: "Severe stunting of the plant, leaf distortion, and significantly reduced cob size or complete cob failure.", severity_stage: "Advanced Stage" },
  { symptom_id: "S007", disease_id: "D029", disease_name: "Rust Disease (Maize)", symptom_description: "Small, reddish-brown raised pustules on leaf surfaces.", severity_stage: "Early Stage" },
  { symptom_id: "S008", disease_id: "D029", disease_name: "Rust Disease (Maize)", symptom_description: "Pustules cover large leaf areas, leading to premature leaf drying and yellowing.", severity_stage: "Advanced Stage" },
  { symptom_id: "S009", disease_id: "D036", disease_name: "Mosaic Disease (Maize)", symptom_description: "Yellow-green mosaic patterns and mottling on young leaves.", severity_stage: "Early Stage" },

  // C002 (Common Bean)
  { symptom_id: "S010", disease_id: "D004", disease_name: "Bean Anthracnose", symptom_description: "Dark, sunken lesions on pods, stems, and seed surfaces.", severity_stage: "Early Stage" },
  { symptom_id: "S011", disease_id: "D004", disease_name: "Bean Anthracnose", symptom_description: "Blackened veins on the underside of leaves, and stem collapse in heavy infection.", severity_stage: "Advanced Stage" },
  { symptom_id: "S012", disease_id: "D005", disease_name: "Angular Leaf Spot", symptom_description: "Angular brown lesions restricted by leaf veins, starting on lower leaves.", severity_stage: "Early Stage" },
  { symptom_id: "S013", disease_id: "D005", disease_name: "Angular Leaf Spot", symptom_description: "Lesions cover upper leaves, causing premature defoliation and sunken spots on pods.", severity_stage: "Advanced Stage" },
  { symptom_id: "S014", disease_id: "D006", disease_name: "Bean Common Mosaic Virus (BCMV)", symptom_description: "Mottling, mosaic pattern of light and dark green on leaves.", severity_stage: "Early Stage" },
  { symptom_id: "S015", disease_id: "D006", disease_name: "Bean Common Mosaic Virus (BCMV)", symptom_description: "Severe leaf curling, puckering, stunting of the plant, and poor pod development.", severity_stage: "Advanced Stage" },
  { symptom_id: "S016", disease_id: "D027", disease_name: "Rust Disease (Bean)", symptom_description: "Small reddish-brown rust pustules on leaves.", severity_stage: "Early Stage" },
  { symptom_id: "S017", disease_id: "D033", disease_name: "Leaf Spot Disease (Bean)", symptom_description: "Circular, enlarging brown/black spots on leaves.", severity_stage: "Early Stage" },

  // C003 (Tomato)
  { symptom_id: "S018", disease_id: "D007", disease_name: "Late Blight", symptom_description: "Dark, water-soaked irregular spots on leaves and stems.", severity_stage: "Early Stage" },
  { symptom_id: "S019", disease_id: "D007", disease_name: "Late Blight", symptom_description: "White fuzzy mold under leaves in wet conditions, rapid leaf rot, and dark brown lesions on fruit.", severity_stage: "Advanced Stage" },
  { symptom_id: "S020", disease_id: "D008", disease_name: "Bacterial Wilt", symptom_description: "Sudden wilting of the plant starting from the growing tips, even with moist soil.", severity_stage: "Early Stage" },
  { symptom_id: "S021", disease_id: "D008", disease_name: "Bacterial Wilt", symptom_description: "Stems become hollow, showing brown vascular discoloration and bacterial ooze when cut.", severity_stage: "Advanced Stage" },
  { symptom_id: "S022", disease_id: "D009", disease_name: "Tomato Leafminer (Tuta absoluta)", symptom_description: "Pinhead-sized entry holes and silvery mines or tunnels in leaves.", severity_stage: "Early Stage" },
  { symptom_id: "S023", disease_id: "D009", disease_name: "Tomato Leafminer (Tuta absoluta)", symptom_description: "Leaves become completely mined and dry, and fruit shows exit holes and severe rot.", severity_stage: "Advanced Stage" },
  { symptom_id: "S024", disease_id: "D025", disease_name: "Early Blight", symptom_description: "Small dark spots with concentric rings ('target board' look) on older leaves.", severity_stage: "Early Stage" },
  { symptom_id: "S025", disease_id: "D025", disease_name: "Early Blight", symptom_description: "Concentric rings cover large leaf parts, causing leaves to yellow and drop.", severity_stage: "Advanced Stage" },
  { symptom_id: "S026", disease_id: "D034", disease_name: "Leaf Spot Disease (Tomato)", symptom_description: "Enlarging brown/black spots on leaf surfaces.", severity_stage: "Early Stage" },
  { symptom_id: "S027", disease_id: "D037", disease_name: "Mosaic Disease (Tomato)", symptom_description: "Mottling and mosaic of light and dark green on leaves.", severity_stage: "Early Stage" },

  // C004 (Irish Potato)
  { symptom_id: "S028", disease_id: "D010", disease_name: "Late Blight", symptom_description: "Dark, water-soaked lesions on leaves and stems, with white fuzzy mold underneath.", severity_stage: "Early Stage" },
  { symptom_id: "S029", disease_id: "D010", disease_name: "Late Blight", symptom_description: "Rapid collapse of foliage and dark brown, rotting, smelly potato tubers.", severity_stage: "Advanced Stage" },
  { symptom_id: "S030", disease_id: "D011", disease_name: "Bacterial Wilt", symptom_description: "Wilting of individual stems or entire plant during the hot part of the day.", severity_stage: "Early Stage" },
  { symptom_id: "S031", disease_id: "D011", disease_name: "Bacterial Wilt", symptom_description: "Vascular ring of tubers turns brown, releasing white bacterial ooze when squeezed.", severity_stage: "Advanced Stage" },
  { symptom_id: "S032", disease_id: "D012", disease_name: "Potato Virus Y (PVY)", symptom_description: "Mottling, mosaic, and crinkling of leaves.", severity_stage: "Early Stage" },
  { symptom_id: "S033", disease_id: "D012", disease_name: "Potato Virus Y (PVY)", symptom_description: "Stunted plants, leaf drop streak, and reduced, deformed tubers.", severity_stage: "Advanced Stage" },
  { symptom_id: "S034", disease_id: "D026", disease_name: "Early Blight", symptom_description: "Small brown spots with concentric target rings on leaves.", severity_stage: "Early Stage" },

  // C005 (Cassava)
  { symptom_id: "S035", disease_id: "D013", disease_name: "Cassava Mosaic Disease (CMD)", symptom_description: "Yellow-green mosaic pattern and slight leaf distortion.", severity_stage: "Early Stage" },
  { symptom_id: "S036", disease_id: "D013", disease_name: "Cassava Mosaic Disease (CMD)", symptom_description: "Severe leaf curling, leaf size reduction, stunting of the plant, and major root yield loss.", severity_stage: "Advanced Stage" },
  { symptom_id: "S037", disease_id: "D014", disease_name: "Cassava Brown Streak Disease (CBSD)", symptom_description: "Yellowing along leaf veins (often very mild or absent).", severity_stage: "Early Stage" },
  { symptom_id: "S038", disease_id: "D014", disease_name: "Cassava Brown Streak Disease (CBSD)", symptom_description: "Brown, corky necrotic rot inside the tuberous roots, often invisible until harvest.", severity_stage: "Advanced Stage" },
  { symptom_id: "S039", disease_id: "D015", disease_name: "Cassava Bacterial Blight", symptom_description: "Angular, water-soaked leaf spots starting on the lower leaf surface.", severity_stage: "Early Stage" },
  { symptom_id: "S040", disease_id: "D015", disease_name: "Cassava Bacterial Blight", symptom_description: "Leaf blight, gum exudation on stems, wilting, and complete stem dieback.", severity_stage: "Advanced Stage" },

  // C006 (Banana)
  { symptom_id: "S041", disease_id: "D016", disease_name: "Banana Xanthomonas Wilt (BXW)", symptom_description: "Yellowing and wilting of leaves, starting from the leaf margin on young shoots.", severity_stage: "Early Stage" },
  { symptom_id: "S042", disease_id: "D016", disease_name: "Banana Xanthomonas Wilt (BXW)", symptom_description: "Premature ripening of fruit bunches, dark yellow/brown vascular discoloration, and yellow bacterial ooze from cut stems.", severity_stage: "Advanced Stage" },
  { symptom_id: "S043", disease_id: "D017", disease_name: "Fusarium Wilt (Panama Disease)", symptom_description: "Yellowing of older leaves progressing upwards, with leaves collapsing at the petiole base.", severity_stage: "Early Stage" },
  { symptom_id: "S044", disease_id: "D017", disease_name: "Fusarium Wilt (Panama Disease)", symptom_description: "Splitting of the lower pseudostem and complete plant collapse.", severity_stage: "Advanced Stage" },
  { symptom_id: "S045", disease_id: "D018", disease_name: "Black Sigatoka", symptom_description: "Small yellow-brown streaks on leaves that enlarge into black-brown spots.", severity_stage: "Early Stage" },
  { symptom_id: "S046", disease_id: "D018", disease_name: "Black Sigatoka", symptom_description: "Extensive leaf death and drying, resulting in reduced bunch size and early fruit ripening.", severity_stage: "Advanced Stage" },
  { symptom_id: "S047", disease_id: "D035", disease_name: "Bacterial Wilt (Banana)", symptom_description: "Sudden wilting of banana foliage.", severity_stage: "Early Stage" },

  // C007 (Coffee)
  { symptom_id: "S048", disease_id: "D019", disease_name: "Coffee Berry Disease (CBD)", symptom_description: "Small, sunken, dark brown-to-black lesions on green berries.", severity_stage: "Early Stage" },
  { symptom_id: "S049", disease_id: "D019", disease_name: "Coffee Berry Disease (CBD)", symptom_description: "Berries shrivel, turn completely black, and drop prematurely (mummified berries).", severity_stage: "Advanced Stage" },
  { symptom_id: "S050", disease_id: "D020", disease_name: "Coffee Leaf Rust (CLR)", symptom_description: "Pale yellow-orange powdery pustules on the underside of leaves.", severity_stage: "Early Stage" },
  { symptom_id: "S051", disease_id: "D020", disease_name: "Coffee Leaf Rust (CLR)", symptom_description: "Severe defoliation, branch dieback, and loss of tree vigor.", severity_stage: "Advanced Stage" },
  { symptom_id: "S052", disease_id: "D021", disease_name: "Coffee Wilt Disease", symptom_description: "Leaves lose green color, dry, and branches turn brown.", severity_stage: "Early Stage" },
  { symptom_id: "S053", disease_id: "D021", disease_name: "Coffee Wilt Disease", symptom_description: "Complete drying of branches and gradual death of the entire tree.", severity_stage: "Advanced Stage" },

  // C008 (Kale / Sukuma Wiki)
  { symptom_id: "S054", disease_id: "D022", disease_name: "Black Rot", symptom_description: "Yellow V-shaped lesions beginning at the leaf margins.", severity_stage: "Early Stage" },
  { symptom_id: "S055", disease_id: "D022", disease_name: "Black Rot", symptom_description: "Blackened leaf veins and complete drying of leaves, stunting.", severity_stage: "Advanced Stage" },
  { symptom_id: "S056", disease_id: "D023", disease_name: "Downy Mildew", symptom_description: "Yellow patches on the upper surface of leaves.", severity_stage: "Early Stage" },
  { symptom_id: "S057", disease_id: "D023", disease_name: "Downy Mildew", symptom_description: "Gray-purple downy fungal growth on leaf undersides, leaves yellow and dry.", severity_stage: "Advanced Stage" },
  { symptom_id: "S058", disease_id: "D024", disease_name: "Cabbage Aphid Infestation", symptom_description: "Small green-gray sap-sucking insects clustered on leaves.", severity_stage: "Early Stage" },
  { symptom_id: "S059", disease_id: "D024", disease_name: "Cabbage Aphid Infestation", symptom_description: "Leaves curl, yellow, and plant growth becomes stunted due to heavy infestation.", severity_stage: "Advanced Stage" },
  { symptom_id: "S060", disease_id: "D042", disease_name: "Powdery Mildew (Kale)", symptom_description: "White powder-like growth on leaf surfaces.", severity_stage: "Early Stage" },
  { symptom_id: "S061", disease_id: "D047", disease_name: "Alternaria Leaf Spot", symptom_description: "Small dark concentric spots on leaf surfaces.", severity_stage: "Early Stage" },
  { symptom_id: "S062", disease_id: "D053", disease_name: "Clubroot Disease (Kale)", symptom_description: "Wilting of foliage during warm parts of the day.", severity_stage: "Early Stage" },
  { symptom_id: "S063", disease_id: "D057", disease_name: "Mosaic Disease (Kale)", symptom_description: "Yellow mottling and leaf distortion.", severity_stage: "Early Stage" },

  // C009 (Wheat)
  { symptom_id: "S064", disease_id: "D028", disease_name: "Rust Disease (Wheat)", symptom_description: "Yellowish or reddish powdery pustules on leaves or stems.", severity_stage: "Early Stage" },

  // C010 (Mango)
  { symptom_id: "S065", disease_id: "D030", disease_name: "Anthracnose (Mango)", symptom_description: "Sunken dark spots on flowers or young leaves.", severity_stage: "Early Stage" },
  { symptom_id: "S066", disease_id: "D030", disease_name: "Anthracnose (Mango)", symptom_description: "Large black lesions on fruit, leading to rotting and fruit drop.", severity_stage: "Advanced Stage" },

  // C011 (Avocado)
  { symptom_id: "S067", disease_id: "D031", disease_name: "Anthracnose (Avocado)", symptom_description: "Dark spots on ripening fruit skins.", severity_stage: "Early Stage" },

  // C012 (Groundnuts)
  { symptom_id: "S068", disease_id: "D032", disease_name: "Leaf Spot Disease (Groundnuts)", symptom_description: "Enlarging brown/black spots on leaves.", severity_stage: "Early Stage" },

  // C013 (Spinach)
  { symptom_id: "S069", disease_id: "D039", disease_name: "Downy Mildew (Spinach)", symptom_description: "Yellow patches on upper leaf surface.", severity_stage: "Early Stage" },
  { symptom_id: "S070", disease_id: "D043", disease_name: "Powdery Mildew (Spinach)", symptom_description: "White powdery growth on leaves.", severity_stage: "Early Stage" },
  { symptom_id: "S071", disease_id: "D049", disease_name: "Alternaria Leaf Spot (Spinach)", symptom_description: "Dark concentric leaf spots.", severity_stage: "Early Stage" },
  { symptom_id: "S072", disease_id: "D052", disease_name: "Bacterial Soft Rot (Spinach)", symptom_description: "Water-soaked lesions on stems.", severity_stage: "Early Stage" },
  { symptom_id: "S073", disease_id: "D056", disease_name: "White Rust (Spinach)", symptom_description: "Raised white pustules on leaf undersides.", severity_stage: "Early Stage" },
  { symptom_id: "S074", disease_id: "D058", disease_name: "Mosaic Disease (Spinach)", symptom_description: "Mottling and distorted leaf growth.", severity_stage: "Early Stage" },

  // C014 (Lettuce)
  { symptom_id: "S075", disease_id: "D040", disease_name: "Downy Mildew (Lettuce)", symptom_description: "Yellow spots on outer leaves.", severity_stage: "Early Stage" },
  { symptom_id: "S076", disease_id: "D044", disease_name: "Powdery Mildew (Lettuce)", symptom_description: "Fuzzy white patches on leaf surfaces.", severity_stage: "Early Stage" },
  { symptom_id: "S077", disease_id: "D051", disease_name: "Bacterial Soft Rot (Lettuce)", symptom_description: "Slimy wet decay of outer leaves.", severity_stage: "Early Stage" },
  { symptom_id: "S078", disease_id: "D059", disease_name: "Mosaic Disease (Lettuce)", symptom_description: "Mottled yellowing and stunting.", severity_stage: "Early Stage" },

  // C015 (Broccoli)
  { symptom_id: "S079", disease_id: "D046", disease_name: "Black Rot (Broccoli)", symptom_description: "V-shaped yellow leaf lesions.", severity_stage: "Early Stage" },
  { symptom_id: "S080", disease_id: "D055", disease_name: "Clubroot Disease (Broccoli)", symptom_description: "Wilting of leaves and clubbed roots.", severity_stage: "Early Stage" },

  // C016 (Cabbage)
  { symptom_id: "S081", disease_id: "D041", disease_name: "Downy Mildew (Cabbage)", symptom_description: "Yellow patches on leaves with downy growth.", severity_stage: "Early Stage" },
  { symptom_id: "S082", disease_id: "D045", disease_name: "Black Rot (Cabbage)", symptom_description: "Yellow V-shaped lesions on outer leaf margins.", severity_stage: "Early Stage" },
  { symptom_id: "S083", disease_id: "D048", disease_name: "Alternaria Leaf Spot (Cabbage)", symptom_description: "Target-ring spots on leaves.", severity_stage: "Early Stage" },
  { symptom_id: "S084", disease_id: "D050", disease_name: "Bacterial Soft Rot (Cabbage)", symptom_description: "Foul-smelling slimy decay of cabbage heads.", severity_stage: "Early Stage" },

  // C017 (Seedlings)
  { symptom_id: "S085", disease_id: "D038", disease_name: "Damping-Off", symptom_description: "Water-soaked lesions on the seedling stem at the soil level, causing the stem to thin and seedling to fall over.", severity_stage: "Early Stage" }
];

export const treatmentsSeed = [
  { treatment_id: "T001", disease_id: "D001", disease_name: "Maize Lethal Necrosis (MLN)", treatment_recommendation: "There is no chemical cure. Immediately uproot and bury/burn infected plants to check viral spread.", treatment_type: "Physical Control" },
  { treatment_id: "T002", disease_id: "D001", disease_name: "Maize Lethal Necrosis (MLN)", treatment_recommendation: "Apply systemic insecticides to control vectors like thrips and aphids.", treatment_type: "Chemical Control" },
  { treatment_id: "T003", disease_id: "D002", disease_name: "Gray Leaf Spot", treatment_recommendation: "Apply commercial fungicides containing azoxystrobin, pyraclostrobin or propiconazole upon spotting early rectangular lesions.", treatment_type: "Chemical Control" },
  { treatment_id: "T004", disease_id: "D003", disease_name: "Maize Streak Virus (MSV)", treatment_recommendation: "Uproot infected plants; spray systemic insecticides (e.g. imidacloprid) to control vector leafhoppers.", treatment_type: "Chemical/Physical" },
  { treatment_id: "T005", disease_id: "D004", disease_name: "Bean Anthracnose", treatment_recommendation: "Apply protective or systemic fungicides such as carbendazim, mancozeb or copper oxychloride.", treatment_type: "Chemical Control" },
  { treatment_id: "T006", disease_id: "D005", disease_name: "Angular Leaf Spot", treatment_recommendation: "Apply fungicides containing chlorothalonil, azoxystrobin or mancozeb at flowering stage if symptoms are seen.", treatment_type: "Chemical Control" },
  { treatment_id: "T007", disease_id: "D006", disease_name: "Bean Common Mosaic Virus (BCMV)", treatment_recommendation: "Uproot and destroy infected bean plants; control transmitting aphids with neem-based or chemical sprays.", treatment_type: "Vector Control" },
  { treatment_id: "T008", disease_id: "D007", disease_name: "Late Blight", treatment_recommendation: "Apply preventive fungicides (e.g. mancozeb, copper oxychloride) or curative systemic fungicides (e.g. metalaxyl, cymoxanil) immediately.", treatment_type: "Chemical Control" },
  { treatment_id: "T009", disease_id: "D008", disease_name: "Bacterial Wilt", treatment_recommendation: "No effective chemical treatments exist; immediately uproot infected plants, apply lime to the planting hole.", treatment_type: "Soil Sanitation" },
  { treatment_id: "T010", disease_id: "D009", disease_name: "Tomato Leafminer (Tuta absoluta)", treatment_recommendation: "Use pheromone traps for monitoring; apply recommended bio-pesticides or chemical sprays (e.g. spinosad, indoxacarb, flubendiamide).", treatment_type: "Integrated Pest Management" },
  { treatment_id: "T011", disease_id: "D010", disease_name: "Late Blight", treatment_recommendation: "Spray fungicides (e.g. metalaxyl-M, mancozeb, or fluazinam) on a weekly basis during cool, wet seasons.", treatment_type: "Chemical Control" },
  { treatment_id: "T012", disease_id: "D011", disease_name: "Bacterial Wilt", treatment_recommendation: "There is no chemical treatment. Remove infected potato plants immediately to prevent soil contamination spread.", treatment_type: "Physical Control" },
  { treatment_id: "T013", disease_id: "D012", disease_name: "Potato Virus Y (PVY)", treatment_recommendation: "Control vector aphids with mineral oil or insecticides; pull out and discard diseased potato plants.", treatment_type: "Vector Control" },
  { treatment_id: "T014", disease_id: "D013", disease_name: "Cassava Mosaic Disease (CMD)", treatment_recommendation: "Rogue out (uproot) infected young plants; plant resistant cuttings; control whitefly vectors.", treatment_type: "Phytosanitary" },
  { treatment_id: "T015", disease_id: "D014", disease_name: "Cassava Brown Streak Disease (CBSD)", treatment_recommendation: "No curative chemical exists. Uproot infected plants and replace with certified tolerant cassava cuttings.", treatment_type: "Physical Control" },
  { treatment_id: "T016", disease_id: "D015", disease_name: "Cassava Bacterial Blight", treatment_recommendation: "Prune infected branches with sterilized shears, destroy pruned twigs, rogue out heavily infected plants.", treatment_type: "Phytosanitary" },
  { treatment_id: "T017", disease_id: "D016", disease_name: "Banana Xanthomonas Wilt (BXW)", treatment_recommendation: "Remove male buds with a forked stick; use the Single Diseased Stem Removal (SDSR) technique to cut down infected stems.", treatment_type: "Cultural/Mechanical" },
  { treatment_id: "T018", disease_id: "D017", disease_name: "Fusarium Wilt (Panama Disease)", treatment_recommendation: "No chemical treatments are effective. Inject herbicides (e.g. glyphosate) to kill and dry the infected plant in place.", treatment_type: "Eradication" },
  { treatment_id: "T019", disease_id: "D018", disease_name: "Black Sigatoka", treatment_recommendation: "Apply systemic fungicides (e.g. propiconazole, tebuconazole) alternating with protectants to avoid resistance.", treatment_type: "Chemical Control" },
  { treatment_id: "T020", disease_id: "D019", disease_name: "Coffee Berry Disease (CBD)", treatment_recommendation: "Apply copper-based fungicides or systemic triazole fungicides on a monthly schedule starting from early flower-bud stage.", treatment_type: "Chemical Control" },
  { treatment_id: "T021", disease_id: "D020", disease_name: "Coffee Leaf Rust (CLR)", treatment_recommendation: "Spray copper oxychloride or systemic fungicides (e.g. triadimefon, hexaconazole) when first orange spots appear.", treatment_type: "Chemical Control" },
  { treatment_id: "T022", disease_id: "D021", disease_name: "Coffee Wilt Disease", treatment_recommendation: "Uproot infected coffee trees completely, burn them in the hole, and let the soil rest for 2 years before replanting.", treatment_type: "Eradication" },
  { treatment_id: "T023", disease_id: "D022", disease_name: "Black Rot", treatment_recommendation: "Apply copper-based bactericides at early disease signs; remove and destroy heavily spotted leaves.", treatment_type: "Chemical/Physical" },
  { treatment_id: "T024", disease_id: "D023", disease_name: "Downy Mildew", treatment_recommendation: "Apply fungicides containing metalaxyl, mancozeb or copper compounds to protect healthy kale leaves.", treatment_type: "Chemical Control" },
  { treatment_id: "T025", disease_id: "D024", disease_name: "Cabbage Aphid Infestation", treatment_recommendation: "Spray with soapy water, neem oil, or contact/systemic insecticides (e.g. imidacloprid, lambda-cyhalothrin).", treatment_type: "Chemical/Biological" },
  { treatment_id: "T026", disease_id: "D026", disease_name: "Early Blight (Potato)", treatment_recommendation: "Apply preventive chlorothalonil or curative azoxystrobin fungicides.", treatment_type: "Chemical Control" },
  { treatment_id: "T027", disease_id: "D028", disease_name: "Rust Disease (Wheat)", treatment_recommendation: "Apply triazole or strobilurin-based foliar fungicides at first sign of rust.", treatment_type: "Chemical Control" },
  { treatment_id: "T028", disease_id: "D038", disease_name: "Damping-Off", treatment_recommendation: "Drench nursery bed with metalaxyl, propamocarb or copper oxychloride; reduce watering instantly.", treatment_type: "Fungicidal Drench" },
  { treatment_id: "T029", disease_id: "D050", disease_name: "Bacterial Soft Rot", treatment_recommendation: "No effective cure; harvest immediately, discard rotting heads, and ensure well-ventilated dry storage.", treatment_type: "Post-Harvest Care" },
  { treatment_id: "T030", disease_id: "D053", disease_name: "Clubroot Disease", treatment_recommendation: "Apply agricultural lime to raise soil pH above 7.2; use soil sterilants or recommended soil fungicides.", treatment_type: "Soil Treatment" }
];

export const preventionsSeed = [
  { prevention_id: "P001", disease_id: "D001", disease_name: "Maize Lethal Necrosis (MLN)", prevention_method: "Plant certified disease-free seed only; avoid recycling home-saved seeds." },
  { prevention_id: "P002", disease_id: "D001", disease_name: "Maize Lethal Necrosis (MLN)", prevention_method: "Observe a strict closed season of 2-3 months to break the insect vector cycles." },
  { prevention_id: "P003", disease_id: "D001", disease_name: "Maize Lethal Necrosis (MLN)", prevention_method: "Rotate maize with non-cereal crops such as beans, peas, potatoes, or cabbages." },
  { prevention_id: "P004", disease_id: "D002", disease_name: "Gray Leaf Spot", prevention_method: "Rotate maize with legumes or tubers for at least two seasons." },
  { prevention_id: "P005", disease_id: "D002", disease_name: "Gray Leaf Spot", prevention_method: "Plough under crop residues deeply to reduce overwintering fungal spores." },
  { prevention_id: "P006", disease_id: "D003", disease_name: "Maize Streak Virus (MSV)", prevention_method: "Plant resistant maize varieties recommended for the agro-ecological zone." },
  { prevention_id: "P007", disease_id: "D003", disease_name: "Maize Streak Virus (MSV)", prevention_method: "Maintain a weed-free buffer zone around the maize field to reduce grass hosts." },
  { prevention_id: "P008", disease_id: "D004", disease_name: "Bean Anthracnose", prevention_method: "Use certified disease-free bean seeds from registered agro-dealers." },
  { prevention_id: "P009", disease_id: "D004", prevention_method: "Avoid working in bean fields when foliage is wet to prevent spreading spores." },
  { prevention_id: "P010", disease_id: "D005", disease_name: "Angular Leaf Spot", prevention_method: "Practice crop rotation with non-legumes (e.g. maize, potatoes)." },
  { prevention_id: "P011", disease_id: "D006", disease_name: "Bean Common Mosaic Virus (BCMV)", prevention_method: "Plant certified virus-free seeds and use aphid-resistant bean varieties." },
  { prevention_id: "P012", disease_id: "D007", disease_name: "Late Blight", prevention_method: "Avoid overhead irrigation; water early in the morning so foliage dries quickly." },
  { prevention_id: "P013", disease_id: "D007", disease_name: "Late Blight", prevention_method: "Stake tomato plants and prune lower leaves to improve air circulation." },
  { prevention_id: "P014", disease_id: "D008", disease_name: "Bacterial Wilt", prevention_method: "Rotate tomatoes with non-solanaceous crops (e.g. maize, beans, cabbage) for 3-5 years." },
  { prevention_id: "P015", disease_id: "D008", disease_name: "Bacterial Wilt", prevention_method: "Ensure farm tools are disinfected with bleach before moving to clean fields." },
  { prevention_id: "P016", disease_id: "D009", disease_name: "Tomato Leafminer (Tuta absoluta)", prevention_method: "Use insect-proof netting in nurseries; practice crop rotation and eliminate wild nightshade hosts." },
  { prevention_id: "P017", disease_id: "D010", disease_name: "Late Blight", prevention_method: "Plant certified seed potato tubers from registered farms." },
  { prevention_id: "P018", disease_id: "D011", disease_name: "Bacterial Wilt", prevention_method: "Do not plant potatoes in fields with a history of bacterial wilt for at least 4 years." },
  { prevention_id: "P019", disease_id: "D012", disease_name: "Potato Virus Y (PVY)", prevention_method: "Rogue out (uproot) any plants showing mosaic signs within the first 4-6 weeks." },
  { prevention_id: "P020", disease_id: "D013", disease_name: "Cassava Mosaic Disease (CMD)", prevention_method: "Plant certified CMD-resistant cassava varieties (e.g. Tajirika, Shibe)." },
  { prevention_id: "P021", disease_id: "D014", disease_name: "Cassava Brown Streak Disease (CBSD)", prevention_method: "Obtain clean stem cuttings from authenticated multiplication fields." },
  { prevention_id: "P022", disease_id: "D015", disease_name: "Cassava Bacterial Blight", prevention_method: "Sterilize pruning knives; plant during dry spells so foliage is less wet." },
  { prevention_id: "P023", disease_id: "D016", disease_name: "Banana Xanthomonas Wilt (BXW)", prevention_method: "Sterilize all harvesting knives, pangas, and tools with fire or bleach after every plant." },
  { prevention_id: "P024", disease_id: "D017", disease_name: "Fusarium Wilt (Panama Disease)", prevention_method: "Plant certified tissue-culture banana seedlings instead of conventional suckers." },
  { prevention_id: "P025", disease_id: "D018", disease_name: "Black Sigatoka", prevention_method: "Prune excess leaves regularly and space banana plants to facilitate fast foliage drying." },
  { prevention_id: "P026", disease_id: "D019", disease_name: "Coffee Berry Disease (CBD)", prevention_method: "Plant CBD-resistant coffee varieties such as Ruiru 11 or Batian." },
  { prevention_id: "P027", disease_id: "D020", disease_name: "Coffee Leaf Rust (CLR)", prevention_method: "Prune coffee trees to improve sunlight penetration and air movement." },
  { prevention_id: "P028", disease_id: "D021", disease_name: "Coffee Wilt Disease", prevention_method: "Avoid wounding tree stems during weeding or pruning, as wounds serve as entry points." },
  { prevention_id: "P029", disease_id: "D022", disease_name: "Black Rot", prevention_method: "Avoid planting kale or cabbages in the same bed in consecutive seasons." },
  { prevention_id: "P030", disease_id: "D023", disease_name: "Downy Mildew", prevention_method: "Space kale rows sufficiently to encourage air flow and quick dew drying." },
  { prevention_id: "P031", disease_id: "D024", disease_name: "Cabbage Aphid Infestation", prevention_method: "Encourage natural predators like ladybird beetles; control weeds that harbor aphids." },
  { prevention_id: "P032", disease_id: "D038", disease_name: "Damping-Off", prevention_method: "Use sterilized seed-raising media; avoid overcrowding seedlings in nursery beds." },
  { prevention_id: "P033", disease_id: "D050", disease_name: "Bacterial Soft Rot", prevention_method: "Ensure careful handling to avoid wounding brassica heads during harvest." }
];
