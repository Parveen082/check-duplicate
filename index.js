const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://parveenchouhan082:delllatitude7480e@cluster0.na2jf.mongodb.net/backendtest', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(" MongoDB error:", err));

// Schema & Model
const ProductSchema = new mongoose.Schema({
  mobile: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  dob: { type: String, required: true },
  email: { type: String, required: true },
  employeeType: { type: String, required: true },
  pancard: { type: String, required: true }
}, { strict: false });

const Product = mongoose.model('zyps', ProductSchema);

// POST: Only check if data exists
app.post('/apicheck', async (req, res) => {
  const { mobile, partnerId, pancard } = req.body;

  try {
    const existing = await Product.findOne({
      mobile,
      pancard,
      partnerId
    });

    if (existing) {
      return res.status(200).json({ message: "✅ Data exists",});
    } else {
      return res.status(200).json({ message: "🆕 lead created sucessfully in zype" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
