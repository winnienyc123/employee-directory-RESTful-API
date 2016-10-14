var restful = require('node-restful');
var mongoose = restful.mongoose;

//Employee Schema
var employeeSchema = new mongoose.Schema({
    name: String,
    age: Number,
    title: String
});

//Export Model
module.exports = restful.model('Employees',employeeSchema);
