const express = require('express');
const app = express();
const dotenv = require('dotenv')
const userRoutes = require('./routes/user/user');

const cors = require('cors');
app.use(cors());

dotenv.config();
app.use(express.json());

const { connectDB } = require('./config/db');

app.use("/", authRoutes);

//proteger les route par le token
app.use(protect);

app.use("/", userRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log(`API Server listening on port ${process.env.PORT || 5000}`);
  });
}).catch(err => {
  console.error("Failed to connect", err.message);
  process.exit(1);
}); 
