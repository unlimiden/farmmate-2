import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// In-memory database records store
let databaseRecords = [
  {
    id: "rec-1",
    date: "Oct 24, 2026",
    crop: "Tomato",
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80&w=300",
    disease: "Late Blight (Phytophthora infestans)",
    status: "Warning",
    confidence: 98.4,
    treatment: "Apply copper fungicide every 7-10 days, remove infected foliage immediately, and avoid overhead irrigation.",
    symptoms: ["Water-soaked spots on leaves", "White fungal growth in humid weather", "Rapid brown necrosis"]
  },
  {
    id: "rec-2",
    date: "Oct 22, 2026",
    crop: "Wheat",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=300",
    disease: "Healthy Canopy",
    status: "Success",
    confidence: 99.8,
    treatment: "No treatment required. Maintain current nitrogen fertilization schedule and soil moisture monitoring.",
    symptoms: ["Vibrant green foliage", "Uniform stem development", "No lesions detected"]
  },
  {
    id: "rec-3",
    date: "Oct 19, 2026",
    crop: "Corn",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=300",
    disease: "Common Rust (Puccinia sorghi)",
    status: "Warning",
    confidence: 95.1,
    treatment: "Apply registered fungicides if pustules cover active canopy before tassel emergence. Rotate with resistant hybrids.",
    symptoms: ["Elongated golden-brown pustules on upper and lower leaf surfaces", "Chlorotic halos"]
  }
];

// API endpoint for database records
app.get("/api/records", (req, res) => {
  res.json({ success: true, records: databaseRecords });
});

app.post("/api/records", (req, res) => {
  const newRecord = req.body;
  databaseRecords.unshift(newRecord);
  res.json({ success: true, record: newRecord });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Vite middleware setup for development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
