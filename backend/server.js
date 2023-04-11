const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

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
const stripeR = require('./routes/stripe');


const usersRoute = require("./routes/usersRoute");
const examsRoute = require("./routes/examsRoute");


//route middleware
app.use('/api/payment', PaymentRouter);
app.use('/api/subject', SubjectRouter);
app.use('/api/user', NipunUserRouter);
app.use('/api/stripe', stripeR);
app.use(ticketRoutes);
app.use(postRoutes);


app.use("/api/users", usersRoute);
app.use("/api/exams", examsRoute);

//route middleware
app.use("/class",classRouter);



app.use("/api",loginRouter);

