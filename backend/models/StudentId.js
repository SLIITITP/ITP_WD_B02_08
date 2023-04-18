const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studenIdSchema = new Schema({
    studentId : {
        type : String,
        required: true
    },
})

const StudenIds = mongoose.model("StudenIds", studenIdSchema);
module.exports = StudenIds;