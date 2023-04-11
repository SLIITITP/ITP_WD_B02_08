const router = require("express").Router();
let Class = require("../models/class");

//add new classes
router.route("/addClass").post((req,res)=>{
    const grade = Number(req.body.grade);
    const subject = req.body.subject;
    const teacher = req.body.teacher;
    const hall = req.body.hall;
    const date = req.body.date;
    const time = req.body.time;
    const fees = Number(req.body.fees);

    const newClass = Class({
        grade,
        subject,
        teacher,
        hall,
        date,
        time,
        fees
    })
    newClass.save().then(()=>{
        res.json("Class Added")
    }).catch((err)=>{
        console.log(err);
    })
})

//retrieve all classes
router.route("/allClasses").get((req,res)=>{
    Class.find().then((classes)=>{
        res.json(classes)
    }).catch((err)=>{
        console.log(err)
    })
})

//update classes
router.route("/updateClass/:id").put(async(req,res)=>{
    let classId = req.params.id;
    const{subject,teacher,hall,date,time,fees}= req.body;
    const updateClass = {
        subject,
        teacher,
        hall,
        date,
        time,
        fees
    }

    const update = await Class.findByIdAndUpdate(classId,updateClass)
    .then(() =>{
        res.status(200).send({status: "Class updated"})
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })
})


//delete classes
router.route("/deleteClass/:id").delete(async(req,res)=>{
    let classId = req.params.id;

    await Class.findByIdAndDelete(classId)
    .then(()=>{
        res.status(200).send({status: "class deleted"});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete class", error: err.message});
    })
})

//retrieve specifc classes
router.route("/getSpecificClass/:id").get(async(req,res)=>{
    let classId = req.params.id;
    const SpecificClass = await Class.findById(classId)
    .then((speClass)=>{
        res.status(200).send({status: "user fetched",speClass});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with get class", error: err.message});
    })
})

/*retrieve class details by day
router.get('/schedule/:day', async (req, res) => {
    try {
      const schedule = await Class.find({ day: req.params.date });
      res.json(schedule);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({status: "Error with get class", error: err.message});
    }
 });
*/
module.exports = router;