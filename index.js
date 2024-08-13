const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const orderRoutes = require('./routes/orderRoutes');
const path = require("path");
const { protect } = require('./Middleware/authMiddleware');
const dbConnect = require('./config/db');

require('dotenv').config();
require('express-async-errors');

const app = express();

if(!process.env.JWT_SECRET){
    console.log("Invalid JWT Secret provided");
}

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' http://localhost:3000"
  );
  next();
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(helmet());


// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', protect, orderRoutes);


dbConnect();

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
