const router = require('express').Router();
const { userSchema }  = require('../schema.js');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");



router.post('/register', async (req, res) => {

    console.log(`Went to register backend`)

    try {
        const { email, username, password } = req.body;
        const user = new userSchema();
        const checkEmail = await userSchema.findOne({email: email});
        const checkUser = await userSchema.findOne({username: username});

        if (checkEmail)
        return res.json({
            status: 409,
            message: "User with given email already exist"    
        })

        if( checkUser)
        return res.json({
            status: 409,
            message: 'This username already exists',
        });

        user.username = username;
        user.password = password;
        user.email = email;

        console.log(`Saving Account...`)

        await user.save();

        const msg = {
            to: `${email}`, // Change to your recipient
            from: 'dimovdesignbot@gmail.com', // Change to your verified sender
            subject: 'Verification',
            text: "You've been registered in our site",
          }
        
    
        sgMail.send(msg);
        
        
        res.json({
            status: 200, 
            message: 'success',
        });
        
    } catch (err) {
        console.log(`Error register`, err);
        res.json({
            status: 500,
            message: 'internal Server Error',
        })
    }
    
});


module.exports = router;