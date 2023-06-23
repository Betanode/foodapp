const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const { genSalt } = require('bcryptjs');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const secretKey = "MyNameIsAbhinav"
router.post('/createuser', [

    body('email').isEmail(),
    body('password', 'Password is too small').isLength({ min: 5 })
]
    , async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password , salt);
        try {
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
                location: req.body.location
            })
            res.json({ success: true })
        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }
    });

router.post('/loginuser', [

    body('email').isEmail(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const email = req.body.email;
    try {
        let userData = await User.findOne({ email })
        if (!userData) {
            return res.status(400).json({ errors: "Provide correct details" });
        }
        const comPass = await bcrypt.compare(req.body.password,userData.password)
        if (!comPass) {
            return res.status(400).json({ errors: "Provide correct details" });
        }
        const data = {
            user:{
                id:userData.id
            }
        }
        const authToken = jwt.sign(data,secretKey)
        return res.json({ success: true , authToken:authToken });
    } catch (error) {
        console.log(error)
        res.json({ success: false })
    }
})

module.exports = router;
