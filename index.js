const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('../config/db');
const authRoutes = require('../routes/authRoutes');
const productRoutes = require('../routes/productRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const orderRoutes = require('../routes/orderRoutes');
const path = require("path");
const { protect } = require('../Middleware/authMiddleware');

require('dotenv').config();
require('express-async-errors');

const app = express();

if(!process.env.JWT_SECRET){
    console.log("Invalid JWT Secret provided");
}

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(helmet());


// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, '../public')));


app.use('/api', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', protect, orderRoutes);


connectDB();

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
