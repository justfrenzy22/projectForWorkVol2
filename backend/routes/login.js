const router = require('express').Router();
const { userSchema }  = require('../schema.js');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const query = await userSchema.findOne({email: email});

    if (query != null && query.password == password) 
        res.json({
            status: 200,
            message: 'Logged in successfully',
            id: query._id,
            name: query.username,
        })
    
    else 
        res.json({
            status: 401,
            message: 'Invalid Email or Password',
        })
})



module.exports = router;