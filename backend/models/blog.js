const {Schema,model} = require('mongoose');

const BlogSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
  },
});

const BlogModel = model("blog", BlogSchema);

module.exports = BlogModel;