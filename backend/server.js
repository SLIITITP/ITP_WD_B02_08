const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


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
const PaymentRouter = require('./routes/Payment')
const classRouter = require('./routes/classes');
const SubjectRouter = require('./routes/Subject')
const NipunUserRouter = require('./routes/NipunUser')
const ticketRoutes = require('./routes/tickets');





const usersRoute = require('./routes/usersRoute')

//route middleware
app.use('/api/payment', PaymentRouter);
app.use('/api/subject', SubjectRouter);
app.use('/api/user', NipunUserRouter);
app.use(ticketRoutes);






app.use('/api/users', usersRoute);

//route middleware
app.use("/class",classRouter);
