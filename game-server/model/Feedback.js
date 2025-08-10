const mongoose= require("mongoose");
const feedbackSchema = new mongoose.Schema({
    username:String,
    comments:{type:String, required:true},
    createdAt:{type:Date, default:Date.now}
});
module.exports= mongoose.model("Feedback", feedbackSchema);