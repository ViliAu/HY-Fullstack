const router = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('express-async-errors')

router.get('/', async(req, res) => {
    const users = await User.find({}).select("username name id");
    return res.json(users);
})

router.post('/', async (req, res) => {
    const {username, name, password} = req.body;
    if (!password || password.length < 3) {
        return res.status(400).send("Password must be a minimum of 3 characters")
    }
    const existingUser = await User.findOne({username}).select("username name");
    if (existingUser) {
        return res.status(400).send("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await new User({username, name, password: hashedPassword}).save();
    return res.status(201).json(result);
})

router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    const user = await User.findOne({ username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.password)

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
        error: 'invalid credentials'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    res.status(200)
        .send({ token, username: user.username, name: user.name })
})

module.exports = router;