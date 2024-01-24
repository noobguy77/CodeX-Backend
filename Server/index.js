import express from "express";
import logger from 'morgan';
import dotenv from "dotenv";
import connectDB from './util/mongoose.js';

dotenv.config({ path: "../Server/util/config.env" });

const port = process.env.PORT || 5000;
let apiAddress = process.env.apiAddress;


console.log("Using API from URL: ", apiAddress);

// INIT
const app = express();

// Middlewares & configs setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.disable('x-powered-by');
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});


//connect to DB
connectDB();

//Import Routes
import userRoutes from './routes/user.route.js';
app.use(userRoutes);



app.get("/health", (req, res) => {
  res.send("Server is up and running!");
})


app.listen(port, () => console.log('Server @ port', port));
