const express = require('express');
const router = express.Router();
const {getBlog,getBlogs,updateBlog,deleteBlog,createBlog} = require('../controllers/blogController');

router.get('/getBlog/:id',getBlog);
router.get('/getBlogs',getBlogs);
router.post('/createBlog',createBlog);
router.put('/updateBlog/:id',updateBlog);
router.delete('/deleteBlog/:id',deleteBlog);

module.exports = router;