const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer')
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)
//study material routes
const Study = require('./routes/study.routes');


const controller = require('./controller/registrationController');


const app = express();

//app middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


const PORT = 9090;
const MONGODB_URL = 'mongodb+srv://ITP:mern2023@itp.iv1rmde.mongodb.net/?retryWrites=true&w=majority';


mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("DB connection successfull!");
}).catch((err) => {
    console.log('connection Unsuccessfull', err);
})

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
})

//import routes
const classRouter = require('./routes/classes');
const ticketRoutes = require('./routes/tickets');

//assignment
const postRoutes = require('./routes/assignment');


const loginRouter = require('./routes/login');
//Payment Management
const SubjectRouter = require('./routes/Subject')
const NipunUserRouter = require('./routes/NipunUser');
const PaymentRouter = require('./routes/Payment')


const usersRoute = require("./routes/usersRoute");
const examsRoute = require("./routes/examsRoute");
const reportsRoute = require("./routes/reportsRoute");


//route middleware
app.use('/api/payment', PaymentRouter);
app.use('/api/subject', SubjectRouter);
app.use('/api/user', NipunUserRouter);
app.use(ticketRoutes);
app.use(postRoutes);


app.use("/api/users", usersRoute);
app.use("/api/exams", examsRoute);
app.use("/api/reports", reportsRoute);

//route middleware
app.use("/class",classRouter);



app.use("/api",loginRouter);


//study material middlewares
app.use("/study",Study);







//මේකට යටින් ගහන්න එපා මුකුත්
// ගහන ඒවා උඩින් ගහන්න (Enter ගහලා)
//API for PAYMENT
app.post("/payment", cors(), async (req, res) => {
	let { amount, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "lkr",
			description: "Thilina Institute",
			payment_method: id,
			confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})