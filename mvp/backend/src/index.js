const express = require('express');
const app = express();
const dotenv = require('dotenv')

const authRoutes = require('./routes/auth/auth');
const moduleRoutes = require('./routes/module/module')

const cors = require('cors');
app.use(cors());

dotenv.config();

app.use(express.json());

const { connectDB } = require('./config/db');

<<<<<<< HEAD
app.use("/", authRoutes);
app.use("/module", moduleRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`API Server listening on port ${process.env.PORT || 5000}`);
});
=======
connectDB().then(db => {
  
	app.locals.db = db;
	console.log(db);

	app.use("/", authRoutes);
	app.use("/module", moduleRoutes);

	app.listen(process.env.PORT || 5000, () => {
		console.log(`API Server listening on port ${process.env.PORT || 5000}`);
	});

}).catch(err => {

	console.error("Failed to connect", err.message);

	process.exit(1);

}); 
>>>>>>> Leon
