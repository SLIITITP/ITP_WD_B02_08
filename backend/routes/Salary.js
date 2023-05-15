const express = require('express');
const router = express.Router();
const TeacherSalary = require('../models/Salarys');

// Add teacher salary data
router.post('/teacherSalary', async (req, res) => {
    try {
        // const { commissionPercentage, salaryData, total, netTotal } = req.body;
        const { teacherID, teacherName, date, netTotal, commissionPercentage, total, otherCharges, otherChargesNote, salaryData, } = req.body;

        // Create a new instance of the TeacherSalary model
        const newTeacherSalary = new TeacherSalary({
            teacherID,
            teacherName,
            date,
            netTotal,
            commissionPercentage,
            total,
            otherCharges,
            otherChargesNote,
            salaryData,
        });

        // Save the new instance to the database
        await newTeacherSalary.save();

        res.status(201).json({ message: 'Teacher salary data added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding teacher salary data' });
    }
});


// GET route to retrieve all teacher salary entries
router.get('/teachersalary', async (req, res) => {
    try {
        const teacherSalaries = await TeacherSalary.find();
        res.json(teacherSalaries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//route for get payment count
router.get('/paymentcount', async (req, res) => {
    try {
        const { teacherName, grade, month, subject } = req.query;
        const result = await TeacherSalary.aggregate([
            { $match: { 'teacherName': teacherName } },
            { $unwind: '$salaryData' },
            { $match: { 'salaryData.grade': grade, 'salaryData.month': month, 'salaryData.subject': subject } },
            { $group: { _id: null, totalPaymentCount: { $sum: '$salaryData.paymentCount' } } }
        ]);
        const paymentCount = result.length ? result[0].totalPaymentCount : 0;
        res.send({ paymentCount });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

//owners income calculate
// router.get('/ownersCommission', async (req, res) => {
//     try {
//         const teacherSalaries = await TeacherSalary.find();
//         if (!teacherSalaries) {
//             return res.status(404).json({ message: 'No teacher salaries found' });
//         }
//         let totalCommission = 0;
//         teacherSalaries.forEach((salary) => {
//             totalCommission += (salary.total * salary.commissionPercentage) / 100;
//         });
//         const ownersCommission = totalCommission;
//         if (!ownersCommission) {
//             return res.status(404).json({ message: 'Unable to calculate owner\'s commission' });
//         }
//         res.json({ ownersCommission });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

router.get('/income-summary', async (req, res) => {
    try {
        const { fromDate, toDate } = req.query;
        if (!fromDate || !toDate) {
            return res.status(400).json({ msg: 'Please provide valid fromDate and toDate parameters' });
        }

        const teacherSalaries = await TeacherSalary.find({ date: { $gte: new Date(fromDate), $lte: new Date(toDate) } });
        if (!teacherSalaries) {
            return res.status(404).json({ msg: 'No teacher salaries found for the given date range' });
        }

        let totalCommission = 0;
        teacherSalaries.forEach((salary) => {
            totalCommission += (salary.total * salary.commissionPercentage) / 100;
        });

        const ownersCommission = totalCommission;
        const netTotal = teacherSalaries.reduce((acc, salary) => acc + salary.netTotal, 0);
        const otherChargesSum = teacherSalaries.reduce((acc, salary) => acc + salary.otherCharges, 0);
        const teacherIncome = netTotal - ownersCommission;

        res.json({ teacherIncome, ownersCommission, netTotal, otherChargesSum });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

router.get('/all-time-income', async (req, res) => {
    try {
        const teacherSalaries = await TeacherSalary.find();
        if (!teacherSalaries) {
            return res.status(404).json({ msg: 'No teacher salaries found' });
        }

        let totalCommission = 0;
        teacherSalaries.forEach((salary) => {
            totalCommission += (salary.total * salary.commissionPercentage) / 100;
        });

        const ownersCommission = totalCommission;
        const netTotal = teacherSalaries.reduce((acc, salary) => acc + salary.netTotal, 0);
        const otherChargesSum = teacherSalaries.reduce((acc, salary) => acc + salary.otherCharges, 0);
        const teacherIncome = netTotal - ownersCommission - otherChargesSum;

        res.json({ teacherIncome, ownersCommission, netTotal, otherChargesSum });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});


module.exports = router;
