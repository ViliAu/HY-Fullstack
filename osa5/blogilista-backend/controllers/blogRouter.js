const router = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../middleware/userExtractor')
require('express-async-errors')

router.get('/', async (req, res) => {
    const blogs = await Blog.find({});
    return res.json(blogs);
})

router.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    return res.json(blog);
})
  
router.post('/', userExtractor, async (req, res) => {
    const {title, author, url} = req.body

    const user = req.user
    if (!user) {
        return res.status(401).send("Unauthorized");
    }

    const blog = new Blog({title, author, url, user: user})
    const result = await blog.save()
    return res.status(201).json(result)
})

router.delete('/:id', userExtractor, async (req, res) => {
    const user = req.user
    if (!user) {
        return res.status(401).send("Unauthorized");
    }
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        return res.status(204).send("Blog not found")
    }

    if (blog.user._id.toString() !== user.id) {
        return res.status(401).json({ error: 'unauthorized operation' });
    }
    const result = await Blog.findByIdAndDelete(req.params.id)
    if (result) {
        return res.status(200).send("Blog deleted")
    }
    else {
        return res.status(204).send("Blog not found")
    }
})

router.put('/:id', userExtractor, async (req, res) => {
    console.log(req.body)
    const { likes } = req.body
    const user = req.user
    if (!user) {
        return res.status(401).send("Unauthorized");
    }  

    if (!likes) {
        return res.status(400).send("Bad request")
    }
    
    //const blog = await Blog.findById(req.params.id);

    // if (blog.user._id.toString() !== user.id) {
    //     return res.status(401).json({ error: 'unauthorized operation' });
    // }

    const result = await Blog.findByIdAndUpdate(req.params.id, { likes }, { new: true, context: 'query' })
    if (result) {
        return res.json(result)
    }
    else {
        return res.status(204).send('Blog not found')
    }
})

module.exports = router;