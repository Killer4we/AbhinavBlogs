const Blog = require('../models/blog');

const getBlogs = async(req,res)=>{
    try{
        const blogs = await Blog.find(); //will fetch all the available blogs
        if(blogs.length===0){
            res.status(200).json({
                success:true,
                message:"No blogs available"
            })
        }

        res.status(200).send(blogs);
        
    }catch(error){
        console.error(error.message);
        res.status(404).send(error.message);

    }
};

const getBlog = async(req,res)=>{
    const {id}=req.params;
    try{
        const blog = await Blog.findById(id);
        if(!blog){
            res.send("No Blog found");
        }
        res.status(200).send(blog);
    }
    catch(error){
        console.error(error.message);
        res.status(404).send(error.message);

    }
};

const createBlog = async(req,res)=>{
    const {title,description,author} = req.body;
    try{
        const newBlog = new Blog({title,description,author});
        await newBlog.save();
        res.status(200).send(newBlog);
    }catch(error){
        console.error(error.message);
        res.status(404).send(error.message);
    }
};

const updateBlog = async(req,res)=>{
    const {id} = req.params;
    const {title,description,author} = req.body;
    try{
        const updatedBlog = await Blog.findByIdAndUpdate(id,{title,description,author},{new:true});
        if(!updatedBlog){
            res.status(200).send("Blog not found");
        }
        res.status(200).send(updatedBlog);
    }catch(error){
        console.error(error.message);
        res.status(404).send(error.message);

    }
};

const deleteBlog = async(req,res)=>{
    const {id} = req.params;
    try{
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if(!deletedBlog){
            res.status(200).send("Blog not found");
        }
        res.status(200).send("Blog deleted successfully");
    }catch(error){
        console.error(error.message);
        res.status(404).send(error.message);

    }
};

module.exports = {getBlog,getBlogs,updateBlog,deleteBlog,createBlog};