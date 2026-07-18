
CREATE DATABASE FarmmateDatabase;
GO
USE FarmmateDB;
GO
CREATE TABLE users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    county VARCHAR(100) NOT NULL,
    preferred_language VARCHAR(50),
    primary_crops_grown VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    date_registered DATE NOT NULL
);
GO
INSERT INTO users
(full_name, role, phone, county, preferred_language, primary_crops_grown, password, date_registered)
VALUES
('John Mwema Kamau','Farmer','+254 712 111 222','Kiambu','Kiswahili','Maize, Beans','Test@1234','2026-01-15'),

('Susan Wairimu Mbugua','Farmer','+254 722 222 333','Nyandarua','Kiswahili','Irish Potato, Kale','Test@1234','2026-01-18'),

('Hassan Juma Mwakio','Farmer','+254 733 333 444','Kilifi','Kiswahili','Cassava, Banana','Test@1234','2026-01-20'),

('Lucy Nyambura Wanjiku','Farmer','+254 701 444 555','Murang''a','English','Coffee, Beans','Test@1234','2026-01-22'),

('Brian Otieno Ouma','Farmer','+254 745 555 666','Kisumu','Kiswahili','Maize, Tomato','Test@1234','2026-01-25'),

('Agnes Chepkemoi Ruto','Farmer','+254 711 666 777','Uasin Gishu','English','Maize, Irish Potato','Test@1234','2026-01-28'),

('James Mwangi Karanja','Agricultural Officer','+254 712 345 678','Kiambu','English','N/A','Test@1234','2026-01-10'),

('Grace Wanjiru Njoroge','Agricultural Officer','+254 722 456 789','Nyandarua','English','N/A','Test@1234','2026-01-10'),

('Admin User','Administrator','+254 700 000 001','Nairobi','English','N/A','Test@1234','2026-01-01'),

('Test Tester Mwangi','Farmer','+254 700 999 888','Nakuru','Kiswahili','Kale, Beans','Test@1234','2026-02-02');
GO

CREATE TABLE crops (
    crop_id INT IDENTITY(1,1) PRIMARY KEY,
    crop_name VARCHAR(100) NOT NULL,
    scientific_name VARCHAR(150)
);
GO
INSERT INTO crops (crop_name, scientific_name)
VALUES
('Maize', 'Zea mays'),
('Common Bean', 'Phaseolus vulgaris'),
('Tomato', 'Solanum lycopersicum'),
('Irish Potato', 'Solanum tuberosum'),
('Cassava', 'Manihot esculenta'),
('Banana', 'Musa spp.'),
('Kale', 'Brassica oleracea var. acephala'),
('Coffee', 'Coffea arabica');
GO

CREATE TABLE diseases (
    disease_id INT IDENTITY(1,1) PRIMARY KEY,
    crop_id INT NOT NULL,
    disease_name VARCHAR(100) NOT NULL,
    description VARCHAR(MAX),

    CONSTRAINT FK_Diseases_Crops
    FOREIGN KEY (crop_id)
    REFERENCES crops(crop_id)
);
GO
INSERT INTO diseases (crop_id, disease_name, description)
VALUES
-- Maize
(1, 'Maize Lethal Necrosis (MLN)', 'A viral disease causing yellowing, necrosis and severe yield loss.'),
(1, 'Gray Leaf Spot', 'A fungal disease that causes rectangular gray lesions on maize leaves.'),
(1, 'Maize Streak Virus', 'A viral disease spread by leafhoppers causing yellow streaks on leaves.'),

-- Common Bean
(2, 'Bean Anthracnose', 'A fungal disease affecting pods, stems and leaves.'),
(2, 'Bean Rust', 'A fungal disease producing reddish-brown pustules on leaves.'),
(2, 'Angular Leaf Spot', 'A fungal disease causing angular brown lesions on leaves.'),

-- Tomato
(3, 'Late Blight', 'A fungal disease causing dark lesions on leaves, stems and fruits.'),
(3, 'Early Blight', 'A fungal disease causing concentric brown spots on leaves.'),
(3, 'Bacterial Wilt', 'A bacterial disease causing sudden wilting of tomato plants.'),

-- Irish Potato
(4, 'Late Blight', 'A destructive fungal disease causing leaf and tuber rot.'),
(4, 'Early Blight', 'A fungal disease causing brown target-like spots on leaves.'),
(4, 'Bacterial Wilt', 'A bacterial disease causing rapid wilting of potato plants.'),

-- Cassava
(5, 'Cassava Mosaic Disease', 'A viral disease causing mosaic leaf patterns and poor growth.'),
(5, 'Cassava Brown Streak Disease', 'A viral disease causing root necrosis and yellow leaf veins.'),

-- Banana
(6, 'Black Sigatoka', 'A fungal disease causing black streaks and reduced yield.'),
(6, 'Panama Disease', 'A fungal disease causing yellowing and wilting of banana plants.'),

-- Kale
(7, 'Black Rot', 'A bacterial disease causing V-shaped yellow lesions on leaves.'),
(7, 'Downy Mildew', 'A fungal disease causing yellow patches with gray fungal growth.'),
(7, 'Alternaria Leaf Spot', 'A fungal disease causing dark circular spots on leaves.'),

-- Coffee
(8, 'Coffee Leaf Rust', 'A fungal disease causing orange powdery spots on leaves.'),
(8, 'Coffee Berry Disease', 'A fungal disease attacking developing coffee berries.');
GO

CREATE TABLE symptoms (
    symptom_id INT IDENTITY(1,1) PRIMARY KEY,
    disease_id INT NOT NULL,
    symptom_name VARCHAR(150) NOT NULL,
	severity_stage VARCHAR(20),

    CONSTRAINT FK_Symptoms_Diseases
    FOREIGN KEY (disease_id)
    REFERENCES diseases(disease_id)
);
GO
INSERT INTO symptoms (disease_id, symptom_name)
VALUES

-- D001 Maize Lethal Necrosis
(1,'Chlorotic mottling and yellow streaking starting from the leaf base'),
(1,'Severe leaf necrosis, premature drying (dead heart)'),
(1,'Stunted growth and poor/no cob formation'),

-- D002 Gray Leaf Spot
(2,'Small, narrow, tan-to-gray rectangular lesions running parallel to leaf veins'),
(2,'Lesions merge and cause large areas of leaf blighting'),

-- D003 Maize Streak Virus
(3,'Narrow, broken yellow streaks running parallel to leaf veins'),
(3,'Severe stunting and reduced cob size'),

-- D004 Bean Anthracnose
(4,'Dark sunken lesions on pods and stems'),
(4,'Blackened veins on the underside of leaves'),

-- D005 Angular Leaf Spot
(5,'Angular brown lesions restricted by leaf veins'),
(5,'Premature leaf drop'),

-- D006 Bean Rust
(6,'Small reddish-brown pustules on leaves'),
(6,'Yellowing and drying of leaves'),

-- D007 Late Blight (Tomato)
(7,'Dark water-soaked lesions on leaves'),
(7,'White fungal growth under leaves during humid conditions'),

-- D008 Early Blight (Tomato)
(8,'Brown concentric ring lesions on older leaves'),
(8,'Yellowing around leaf spots'),

-- D009 Bacterial Wilt (Tomato)
(9,'Sudden wilting without yellowing'),
(9,'Brown discoloration inside stem tissues'),

-- D010 Late Blight (Irish Potato)
(10,'Dark irregular leaf lesions'),
(10,'Brown rotting tubers');

-- D011 Bacterial Wilt (Potato)
(11,'Wilting of individual stems despite moist soil','Early'),
(11,'Brown ring of discoloration visible when tuber is cut; bacterial ooze','Advanced');

-- D012 Potato Virus Y
(12,'Mottling, mosaic, and crinkling of leaves','Early'),
(12,'Stunted plants and reduced, deformed tubers','Advanced');

-- D013 Cassava Mosaic Disease
(13,'Yellow-green mosaic patterns and leaf distortion','Early'),
(13,'Severe leaf curling, stunting, and reduced root yield','Advanced'),

-- D014 Cassava Brown Streak Disease
(14,'Yellowing along leaf veins (often mild or absent)','Early'),
(14,'Brown, corky necrotic rot inside tuberous roots, undetectable until harvest','Advanced'),

-- D015 Banana Xanthomonas Wilt
(15,'Angular, water-soaked leaf spots and wilting of young shoots','Early'),
(15,'Stem dieback and gum exudation','Advanced'),

-- D016 Fusarium Wilt (Panama Disease)
(16,'Yellowing and wilting of leaves starting from leaf margins','Early'),
(16,'Premature ripening of bunches and yellow bacterial ooze from cut stems','Advanced'),

-- D017 Banana Bunchy Top Virus
(17,'Yellowing of older leaves progressing upward','Early'),
(17,'Splitting of the lower pseudostem and plant collapse','Advanced'),

-- D018 Black Sigatoka
(18,'Small yellow-brown streaks on leaves that enlarge into black-brown spots','Early'),
(18,'Extensive leaf death and reduced bunch size','Advanced'),

-- D019 Coffee Berry Disease
(19,'Small, sunken, dark brown-to-black lesions on green berries','Early'),
(19,'Berries shrivel, mummify, and drop prematurely','Advanced'),

-- D020 Coffee Leaf Rust
(20,'Pale yellow-orange powdery pustules on leaf undersides','Early'),
(20,'Severe defoliation and dieback of branches','Advanced');

-- D021 Black Rot (Kale)
(21,'Yellow V-shaped lesions beginning at the leaf edges','Early'),
(21,'Blackened leaf veins and complete leaf wilting','Advanced'),

-- D022 Downy Mildew (Kale)
(22,'Yellow patches on the upper leaf surface','Early'),
(22,'Gray-purple fungal growth on the underside of leaves','Advanced'),

-- D023 Alternaria Leaf Spot (Kale)
(23,'Small dark circular spots with concentric rings','Early'),
(23,'Large dead patches causing leaf drop','Advanced'),

-- D024 Powdery Mildew (Kale)
(24,'White powder-like growth on leaf surfaces','Early'),
(24,'Leaves become yellow, dry and distorted','Advanced'),

-- D025 Coffee Wilt Disease
(25,'Leaves lose their green colour and begin wilting','Early'),
(25,'Complete drying of branches and eventual death of the tree','Advanced'),

-- D026 Maize Ear Rot
(26,'White or pink fungal growth on maize ears','Early'),
(26,'Kernel decay and poor grain quality','Advanced'),

-- D027 Northern Corn Leaf Blight
(27,'Long gray-green cigar-shaped lesions','Early'),
(27,'Large dead leaf areas reducing photosynthesis','Advanced'),

-- D028 Common Rust (Maize)
(28,'Small reddish-brown raised pustules','Early'),
(28,'Leaves dry prematurely under severe infection','Advanced'),

-- D029 Bean Root Rot
(29,'Brown lesions on roots and lower stem','Early'),
(29,'Root decay leading to plant wilting','Advanced'),

-- D030 Fusarium Wilt (Tomato)
(30,'Yellowing of lower leaves','Early'),
(30,'Complete plant wilting with brown vascular tissue','Advanced');

-- D031 Anthracnose
(31,'Dark, sunken lesions on fruits, stems, and leaves','General'),

-- D032 Leaf Spot Disease
(32,'Brown or black spots that enlarge and cause leaf fall','General'),

-- D033 Leaf Spot Disease
(33,'Brown or black spots that enlarge and cause leaf fall','General'),

-- D034 Leaf Spot Disease
(34,'Brown or black spots that enlarge and cause leaf fall','General'),

-- D035 Bacterial Wilt
(35,'Sudden wilting despite adequate moisture and discoloration of stems','General'),

-- D036 Mosaic Disease
(36,'Yellow-green mottling, distorted leaves, and stunted growth','General'),

-- D037 Mosaic Disease
(37,'Yellow-green mottling, distorted leaves, and stunted growth','General'),

-- D038 Damping-Off
(38,'Failure of seeds to germinate or collapse of seedlings at the soil line','General'),

-- D039 Downy Mildew
(39,'Yellow patches on leaves with grey or white growth underneath','General'),

-- D040 Downy Mildew
(40,'Yellow patches on leaves with grey or white growth underneath','General'),

-- D041 Downy Mildew
(41,'Yellow patches on leaves with grey or white growth underneath','General'),

-- D042 Powdery Mildew
(42,'White powder-like growth on leaves and stems','General'),

-- D043 Powdery Mildew
(43,'White powder-like growth on leaves and stems','General'),

-- D044 Powdery Mildew
(44,'White powder-like growth on leaves and stems','General'),

-- D045 Black Rot
(45,'Yellow V-shaped lesions from leaf edges and blackened veins','General'),

-- D046 Black Rot
(46,'Yellow V-shaped lesions from leaf edges and blackened veins','General'),

-- D047 Alternaria Leaf Spot
(47,'Small dark spots with concentric rings on leaves','General'),

-- D048 Alternaria Leaf Spot
(48,'Small dark spots with concentric rings on leaves','General'),

-- D049 Alternaria Leaf Spot
(49,'Small dark spots with concentric rings on leaves','General'),

-- D050 Bacterial Soft Rot
(50,'Soft, watery, foul-smelling decay of leaves and stems','General');

-- D051 Clubroot Disease
(51,'Swollen roots, yellowing leaves, wilting, and stunted growth','General'),

-- D052 Clubroot Disease
(52,'Swollen roots, yellowing leaves, wilting, and stunted growth','General'),

-- D053 Clubroot Disease
(53,'Swollen roots, yellowing leaves, wilting, and stunted growth','General'),

-- D054 White Rust
(54,'White or cream-colored raised spots under leaves and yellow patches above','General'),

-- D055 Mosaic Disease
(55,'Yellow-green mottling and distorted leaves','General'),

-- D056 Mosaic Disease
(56,'Yellow-green mottling and distorted leaves','General'),

-- D057 Mosaic Disease
(57,'Yellow-green mottling and distorted leaves','General'),

-- D058 Coffee Leaf Rust
(58,'Yellow-orange powdery spots on the underside of leaves and premature leaf fall','General'),

-- D059 Black Sigatoka
(59,'Dark streaks and black spots on banana leaves','General');
GO

CREATE TABLE treatments (
    treatment_id INT IDENTITY(1,1) PRIMARY KEY,
    disease_id INT NOT NULL,
    treatment VARCHAR(MAX) NOT NULL,

    CONSTRAINT FK_Treatments_Diseases
    FOREIGN KEY (disease_id)
    REFERENCES diseases(disease_id)
);
GO
INSERT INTO treatments (disease_id, treatment)
VALUES

-- D001 Maize Lethal Necrosis
(1,'There is no cure. Remove and destroy infected plants; plant certified disease-free seed.'),

-- D002 Gray Leaf Spot
(2,'Apply fungicides containing azoxystrobin, pyraclostrobin or propiconazole.'),

-- D003 Maize Streak Virus
(3,'There is no cure. Control leafhoppers and plant resistant varieties.'),

-- D004 Bean Anthracnose
(4,'Apply fungicides containing mancozeb or copper oxychloride.'),

-- D005 Angular Leaf Spot
(5,'Apply fungicides containing chlorothalonil or mancozeb.'),

-- D006 Bean Common Mosaic Virus
(6,'There is no cure. Plant certified virus-free seed and remove infected plants.'),

-- D007 Late Blight (Tomato)
(7,'Apply fungicides containing mancozeb, metalaxyl or chlorothalonil.'),

-- D008 Bacterial Wilt (Tomato)
(8,'There is no effective chemical cure. Remove infected plants immediately.'),

-- D009 Tomato Leafminer
(9,'Apply recommended insecticides and use pheromone traps.'),

-- D010 Late Blight (Potato)
(10,'Apply fungicides containing mancozeb, metalaxyl or chlorothalonil.'),

-- D011 Bacterial Wilt (Potato)
(11,'Remove infected plants and use certified disease-free seed tubers.'),

-- D012 Potato Virus Y
(12,'Control aphids and plant certified virus-free seed.'),

-- D013 Cassava Mosaic Disease
(13,'Use resistant cassava varieties and remove infected plants.'),

-- D014 Cassava Brown Streak Disease
(14,'Plant resistant varieties and use disease-free cuttings.'),

-- D015 Banana Xanthomonas Wilt
(15,'Remove infected plants and disinfect farm tools after use.'),

-- D016 Fusarium Wilt (Panama Disease)
(16,'Use resistant banana varieties and destroy infected plants.'),

-- D017 Banana Bunchy Top Virus
(17,'Control aphids and remove infected banana plants.'),

-- D018 Black Sigatoka
(18,'Apply fungicides containing mancozeb or propiconazole.'),

-- D019 Coffee Berry Disease
(19,'Apply copper-based fungicides during the rainy season.'),

-- D020 Coffee Leaf Rust
(20,'Apply fungicides containing copper oxychloride or triadimefon.');

-- D021 Black Rot (Kale)
(21,'Apply copper-based bactericides, remove infected plants and practice crop rotation.'),

-- D022 Downy Mildew (Kale)
(22,'Apply fungicides containing mancozeb or metalaxyl and improve field drainage.'),

-- D023 Alternaria Leaf Spot (Kale)
(23,'Apply fungicides such as chlorothalonil or mancozeb.'),

-- D024 Powdery Mildew (Kale)
(24,'Apply sulfur-based or potassium bicarbonate fungicides.'),

-- D025 Coffee Wilt Disease
(25,'Remove infected trees completely and disinfect farm tools.'),

-- D026 Maize Ear Rot
(26,'Harvest promptly, dry grain properly and discard infected ears.'),

-- D027 Northern Corn Leaf Blight
(27,'Apply fungicides containing azoxystrobin or propiconazole.'),

-- D028 Common Rust (Maize)
(28,'Apply fungicides such as propiconazole or tebuconazole.'),

-- D029 Bean Root Rot
(29,'Improve soil drainage, rotate crops and apply recommended fungicides.'),

-- D030 Fusarium Wilt (Tomato)
(30,'Use resistant varieties and practice crop rotation.'),

-- D031 Anthracnose
(31,'Apply copper-based fungicides or mancozeb and remove infected plant parts.'),

-- D032 Leaf Spot Disease
(32,'Apply chlorothalonil or mancozeb fungicides.'),

-- D033 Leaf Spot Disease
(33,'Apply chlorothalonil or mancozeb fungicides.'),

-- D034 Leaf Spot Disease
(34,'Apply chlorothalonil or mancozeb fungicides.'),

-- D035 Bacterial Wilt
(35,'Remove infected plants immediately and avoid contaminated irrigation water.'),

-- D036 Mosaic Disease
(36,'Remove infected plants and control insect vectors.'),

-- D037 Mosaic Disease
(37,'Remove infected plants and control insect vectors.'),

-- D038 Damping-Off
(38,'Treat seeds before planting and avoid overwatering seedlings.'),

-- D039 Downy Mildew
(39,'Apply metalaxyl or mancozeb fungicides.'),

-- D040 Downy Mildew
(40,'Apply metalaxyl or mancozeb fungicides.');

-- D041 Downy Mildew
(41,'Apply metalaxyl or mancozeb fungicides and improve air circulation.'),

-- D042 Powdery Mildew
(42,'Apply sulfur-based fungicides or potassium bicarbonate sprays.'),

-- D043 Powdery Mildew
(43,'Apply sulfur-based fungicides or potassium bicarbonate sprays.'),

-- D044 Powdery Mildew
(44,'Apply sulfur-based fungicides or potassium bicarbonate sprays.'),

-- D045 Black Rot
(45,'Apply copper-based bactericides and destroy infected crop residues.'),

-- D046 Black Rot
(46,'Apply copper-based bactericides and practice crop rotation.'),

-- D047 Alternaria Leaf Spot
(47,'Apply chlorothalonil or mancozeb fungicides.'),

-- D048 Alternaria Leaf Spot
(48,'Apply chlorothalonil or mancozeb fungicides.'),

-- D049 Alternaria Leaf Spot
(49,'Apply chlorothalonil or mancozeb fungicides.'),

-- D050 Bacterial Soft Rot
(50,'Remove infected plant parts and improve field sanitation.'),

-- D051 Clubroot Disease
(51,'Apply agricultural lime to raise soil pH and practice long crop rotations.'),

-- D052 Clubroot Disease
(52,'Apply agricultural lime to raise soil pH and use resistant varieties.'),

-- D053 Clubroot Disease
(53,'Improve drainage and avoid moving contaminated soil.'),

-- D054 White Rust
(54,'Apply fungicides containing mancozeb and remove infected leaves.'),

-- D055 Mosaic Disease
(55,'Remove infected plants and control insect vectors such as aphids.'),

-- D056 Mosaic Disease
(56,'Plant certified disease-free seed and control insect vectors.'),

-- D057 Mosaic Disease
(57,'Destroy infected plants and maintain field hygiene.'),

-- D058 Coffee Leaf Rust
(58,'Apply copper oxychloride or systemic fungicides such as triadimefon.'),

-- D059 Black Sigatoka
(59,'Apply recommended fungicides regularly and remove heavily infected leaves.');
GO

CREATE TABLE prevention (
    prevention_id INT IDENTITY(1,1) PRIMARY KEY,
    disease_id INT NOT NULL,
    prevention_method VARCHAR(MAX) NOT NULL,

    CONSTRAINT FK_Prevention_Diseases
    FOREIGN KEY (disease_id)
    REFERENCES diseases(disease_id)
);
GO
INSERT INTO prevention (disease_id, prevention_method)
VALUES

-- D001 Maize Lethal Necrosis
(1,'Plant certified disease-free seed'),
(1,'Control maize insect vectors'),
(1,'Remove and destroy infected plants'),

-- D002 Gray Leaf Spot
(2,'Practice crop rotation'),
(2,'Plant resistant maize varieties'),

-- D003 Maize Streak Virus
(3,'Control leafhopper populations'),
(3,'Plant resistant maize varieties'),

-- D004 Bean Anthracnose
(4,'Use certified disease-free seed'),
(4,'Practice crop rotation'),

-- D005 Angular Leaf Spot
(5,'Avoid overhead irrigation'),
(5,'Plant resistant bean varieties'),

-- D006 Bean Common Mosaic Virus
(6,'Plant certified virus-free seed'),
(6,'Control aphids'),

-- D007 Late Blight (Tomato)
(7,'Avoid wetting leaves'),
(7,'Rotate tomato crops'),
(7,'Use resistant varieties'),

-- D008 Bacterial Wilt (Tomato)
(8,'Use clean planting materials'),
(8,'Practice crop rotation'),

-- D009 Tomato Leafminer
(9,'Use pheromone traps'),
(9,'Inspect crops regularly'),

-- D010 Late Blight (Potato)
(10,'Use certified seed potatoes'),
(10,'Avoid overhead irrigation'),

-- D011 Bacterial Wilt (Potato)
(11,'Use disease-free seed tubers'),
(11,'Practice crop rotation'),

-- D012 Potato Virus Y
(12,'Control aphids'),
(12,'Plant certified seed'),

-- D013 Cassava Mosaic Disease
(13,'Use resistant cassava varieties'),
(13,'Plant healthy stem cuttings'),

-- D014 Cassava Brown Streak Disease
(14,'Plant disease-free cuttings'),
(14,'Destroy infected plants'),

-- D015 Banana Xanthomonas Wilt
(15,'Disinfect farm tools'),
(15,'Remove infected banana plants'),

-- D016 Fusarium Wilt
(16,'Plant resistant banana varieties'),
(16,'Avoid moving contaminated soil'),

-- D017 Banana Bunchy Top Virus
(17,'Control aphids'),
(17,'Destroy infected plants'),

-- D018 Black Sigatoka
(18,'Remove infected leaves'),
(18,'Improve air circulation'),

-- D019 Coffee Berry Disease
(19,'Prune coffee trees regularly'),
(19,'Remove infected berries'),

-- D020 Coffee Leaf Rust
(20,'Plant resistant coffee varieties'),
(20,'Maintain proper field sanitation');

-- D021 Black Rot (Kale)
(21,'Practice crop rotation'),
(21,'Use certified disease-free seed'),
(21,'Remove infected plants immediately'),

-- D022 Downy Mildew (Kale)
(22,'Avoid overhead irrigation'),
(22,'Improve air circulation between plants'),

-- D023 Alternaria Leaf Spot (Kale)
(23,'Destroy infected plant debris'),
(23,'Maintain proper plant spacing'),

-- D024 Powdery Mildew (Kale)
(24,'Avoid overcrowding'),
(24,'Remove infected leaves'),

-- D025 Coffee Wilt Disease
(25,'Use disease-free planting materials'),
(25,'Disinfect pruning tools'),

-- D026 Maize Ear Rot
(26,'Harvest on time'),
(26,'Dry harvested grain properly'),
(26,'Store grain in dry conditions'),

-- D027 Northern Corn Leaf Blight
(27,'Plant resistant maize varieties'),
(27,'Practice crop rotation'),

-- D028 Common Rust (Maize)
(28,'Plant resistant maize varieties'),
(28,'Monitor crops regularly'),

-- D029 Bean Root Rot
(29,'Improve soil drainage'),
(29,'Avoid waterlogging'),
(29,'Practice crop rotation'),

-- D030 Fusarium Wilt (Tomato)
(30,'Use resistant tomato varieties'),
(30,'Avoid planting tomatoes repeatedly in the same field'),

-- D031 Anthracnose
(31,'Use certified seeds'),
(31,'Maintain field sanitation'),

-- D032 Leaf Spot Disease
(32,'Practice crop rotation'),
(32,'Remove infected leaves'),

-- D033 Leaf Spot Disease
(33,'Practice crop rotation'),
(33,'Remove infected leaves'),

-- D034 Leaf Spot Disease
(34,'Practice crop rotation'),
(34,'Remove infected leaves'),

-- D035 Bacterial Wilt
(35,'Use disease-free planting materials'),
(35,'Remove infected plants immediately'),

-- D036 Mosaic Disease
(36,'Control aphids and whiteflies'),
(36,'Remove infected plants'),

-- D037 Mosaic Disease
(37,'Control aphids and whiteflies'),
(37,'Remove infected plants'),

-- D038 Damping-Off
(38,'Use sterilized soil'),
(38,'Avoid excessive watering'),

-- D039 Downy Mildew
(39,'Improve air circulation'),
(39,'Avoid overhead irrigation'),

-- D040 Downy Mildew
(40,'Improve air circulation'),
(40,'Avoid overhead irrigation');

-- D041 Downy Mildew
(41,'Improve air circulation between plants'),
(41,'Avoid overhead irrigation'),

-- D042 Powdery Mildew
(42,'Avoid overcrowding of plants'),
(42,'Remove infected leaves promptly'),

-- D043 Powdery Mildew
(43,'Avoid overcrowding of plants'),
(43,'Remove infected leaves promptly'),

-- D044 Powdery Mildew
(44,'Avoid overcrowding of plants'),
(44,'Remove infected leaves promptly'),

-- D045 Black Rot
(45,'Practice crop rotation'),
(45,'Remove infected plants immediately'),

-- D046 Black Rot
(46,'Practice crop rotation'),
(46,'Remove infected plants immediately'),

-- D047 Alternaria Leaf Spot
(47,'Destroy infected crop residues'),
(47,'Maintain proper spacing between plants'),

-- D048 Alternaria Leaf Spot
(48,'Destroy infected crop residues'),
(48,'Maintain proper spacing between plants'),

-- D049 Alternaria Leaf Spot
(49,'Destroy infected crop residues'),
(49,'Maintain proper spacing between plants'),

-- D050 Bacterial Soft Rot
(50,'Avoid injuring plants during harvesting'),
(50,'Improve field sanitation'),

-- D051 Clubroot Disease
(51,'Apply agricultural lime to reduce soil acidity'),
(51,'Practice long crop rotation'),

-- D052 Clubroot Disease
(52,'Apply agricultural lime to reduce soil acidity'),
(52,'Improve soil drainage'),

-- D053 Clubroot Disease
(53,'Use resistant crop varieties'),
(53,'Avoid moving contaminated soil'),

-- D054 White Rust
(54,'Remove infected leaves'),
(54,'Practice crop rotation'),

-- D055 Mosaic Disease
(55,'Control aphids and whiteflies'),
(55,'Use disease-free planting materials'),

-- D056 Mosaic Disease
(56,'Control aphids and whiteflies'),
(56,'Use disease-free planting materials'),

-- D057 Mosaic Disease
(57,'Control aphids and whiteflies'),
(57,'Use disease-free planting materials'),

-- D058 Coffee Leaf Rust
(58,'Plant resistant coffee varieties'),
(58,'Prune coffee trees regularly'),

-- D059 Black Sigatoka
(59,'Remove infected banana leaves'),
(59,'Maintain good plantation hygiene');
GO

CREATE TABLE diagnosis_history (
    history_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    crop_id INT NOT NULL,
    disease_id INT NOT NULL,
    diagnosis DATETIME DEFAULT GETDATE(),

    CONSTRAINT FK_History_User
    FOREIGN KEY (user_id)
    REFERENCES users(user_id),

    CONSTRAINT FK_History_Crop
    FOREIGN KEY (crop_id)
    REFERENCES crops(crop_id),

    CONSTRAINT FK_History_Disease
    FOREIGN KEY (disease_id)
    REFERENCES diseases(disease_id)
);
GO
INSERT INTO diagnosis_history (user_id, crop_id, disease_id, diagnosis)
VALUES
(1,1,2,'Gray Leaf Spot detected'),
(2,4,10,'Late Blight detected'),
(3,3,7,'Late Blight detected'),
(4,8,20,'Coffee Leaf Rust detected'),
(5,7,21,'Black Rot detected'),
(6,2,4,'Bean Anthracnose detected'),
(1,5,13,'Cassava Mosaic Disease detected'),
(2,6,18,'Black Sigatoka detected'),
(3,1,3,'Maize Streak Virus detected'),
(5,3,30,'Fusarium Wilt detected');
GO

CREATE TABLE agricultural_officers (
    officer_id INT IDENTITY(1,1) PRIMARY KEY,
    officer_name VARCHAR(100) NOT NULL,
    organization VARCHAR(100) NOT NULL,
    county VARCHAR(100) NOT NULL,
    specialization VARCHAR(100),
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    years_experience INT
);
GO
INSERT INTO agricultural_officers
(officer_name, organization, county, specialization, phone, email, years_experience)
VALUES
('James Mwangi', 'Ministry of Agriculture', 'Kiambu', 'Crop Disease Management', '+254712345678', 'james.mwangi@kilimo.go.ke', 12),

('Grace Wanjiku', 'KALRO', 'Nakuru', 'Plant Pathology', '+254722456789', 'grace.wanjiku@kalro.org', 10),

('Peter Kiprono', 'Ministry of Agriculture', 'Uasin Gishu', 'Maize Production', '+254733567890', 'peter.kiprono@kilimo.go.ke', 8),

('Mary Atieno', 'KALRO', 'Kisumu', 'Horticulture', '+254711678901', 'mary.atieno@kalro.org', 9),

('Joseph Mutiso', 'County Agriculture Office', 'Machakos', 'Integrated Pest Management', '+254722789012', 'joseph.mutiso@machakos.go.ke', 11),

('Ann Njeri', 'County Agriculture Office', 'Nyeri', 'Vegetable Crop Production', '+254733890123', 'ann.njeri@nyeri.go.ke', 7),

('David Ouma', 'KALRO', 'Kakamega', 'Soil and Crop Health', '+254711901234', 'david.ouma@kalro.org', 13),

('Sarah Chebet', 'Ministry of Agriculture', 'Kericho', 'Coffee Crop Management', '+254722012345', 'sarah.chebet@kilimo.go.ke', 9);
GO
SELECT * FROM users;
SELECT * FROM crops;
SELECT * FROM diseases;
SELECT * FROM symptoms;
SELECT * FROM treatments;
SELECT * FROM prevention;
SELECT * FROM diagnosis_history;
SELECT * FROM agricultural_officers;