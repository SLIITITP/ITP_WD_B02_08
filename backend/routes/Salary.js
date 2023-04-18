const express = require('express');
const router = express.Router();
const TeacherSalary = require('../models/teacherSalary');

// Add teacher salary data
router.post('/teacherSalary', async (req, res) => {
    try {
        // const { commissionPercentage, salaryData, total, netTotal } = req.body;
        const { commissionPercentage, salaryData, total } = req.body;

        // Create a new instance of the TeacherSalary model
        const newTeacherSalary = new TeacherSalary({
            commissionPercentage,
            salaryData,
            total,
            // netTotal
        });

        // Save the new instance to the database
        await newTeacherSalary.save();

        res.status(201).json({ message: 'Teacher salary data added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding teacher salary data' });
    }
});

module.exports = router;
