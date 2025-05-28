const express = require('express');
const router = express.Router();
const userAuth = require('../middleware/userAuth');
const {getBlog,getBlogs,updateBlog,deleteBlog,createBlog} = require('../controllers/blogController');

router.get('/getBlog/:id',getBlog);
router.get('/getBlogs',getBlogs);
router.post('/createBlog',userAuth,createBlog);
router.put('/updateBlog/:id',userAuth,updateBlog);
router.delete('/deleteBlog/:id',userAuth,deleteBlog);

module.exports = router;