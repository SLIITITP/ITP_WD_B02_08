const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeacherSalarySchema = new Schema({

    commissionPercentage: {
        type: Number,
        required: true
    },
    salaryData: {
        type: [{
            grade: {
                type: Number,
                required: true
            },
            month: {
                type: String,
                required: true
            },
            subjectAmount: {
                type: Number,
                required: true
            },
            paymentCount: {
                type: Number,
                required: true
            },
        }],
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    netTotal: {
        type: Number,
        required: false
    }
});

const TeacherSalary = mongoose.model('TeacherSalary', TeacherSalarySchema);

module.exports = TeacherSalary;