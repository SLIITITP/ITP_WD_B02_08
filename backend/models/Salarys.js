const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeacherSalarySchema = new Schema({

    teacherID: {
        type: String,
        required: false
    },
    teacherName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    netTotal: {
        type: Number,
        required: true
    },
    commissionPercentage: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    otherCharges: {
        type: Number,
        required: true
    },
    otherChargesNote: {
        type: String,
        required: true
    },
    salaryData: {
        type: [{
            grade: {
                type: String,
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
            }
        }],
        required: true
    }
});

const TeacherSalary = mongoose.model('TeacherSalary', TeacherSalarySchema);

module.exports = TeacherSalary;