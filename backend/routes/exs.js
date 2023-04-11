const express = require('express');
const router = express.Router();
const Student = require('../models/ex');

router.post('/AAA/add', async (req, res) => {
  try {
    const { name, address, subject, mobile } = req.body;
    const student = new Student({
      name,
      address,
      subject,
      mobile
    });
    const savedStudent = await student.save();
    res.json(savedStudent);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
