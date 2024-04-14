


const mongoose = require("mongoose");
const currentDate = new Date();
const isoDate = currentDate.toISOString().split('T')[0];
// console.log(isoDate);
const BlogSchema = new mongoose.Schema({
    title : {type : String, required : true},
    content : {type : String, required : true},
    image : {type : String, required : true},
    creator : {type : mongoose.Types.ObjectId, required : true, ref : 'User'},
    author : {type : String},
    date : {type : String}

}, {timestamps : true})

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;