const express = require('express');
const cors = require('cors');
const server = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const upload = require('./multer);
const uploadFiles = require('./routes/multer');
const delColl = require('./routes/deleteCollection');
const Register = require('./routes/register');
const Login = require('./routes/login');
const currItems = require('./routes/currItems');
const currForCardItems = require('./routes/currCardItems');
const sgMail = require('@sendgrid/mail');
const key = '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';
const { userSchema, itemSchema, cardSchema }  = require('./schema.js');
const fs = require('fs');
const https = require('https');
const stripe = require('stripe')('sk_test_51MYZOuINYSUvelreylvJS42b1FxFDt0or6USi5RqkpEQBEVVxMelUQVwSi6DKN0Y84DRayOsW0IFIfPpFjmvK281006PoHasaC');
mongoose.connect('mongodb://localhost:27017/test');


// server.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "https://designdimov.bpcloud.ml");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });





// server.use(cors({ origin: 'https://designdimov.bpcloud.ml' }));

server.use(cors({
  origin: 'https://designdimov.bpcloud.ml',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


// http://dimovdesign.duckdns.org/

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true}));


server.get('/', (req, res) => {
    res.json({
        message: 'logged',
        status: 200
    });
})

server.get('/register', (req, res) => {
    console.log("raboti");
})
// POST, GET, PATCH,  DELETE

server.use('/', Register);
server.use('/', Login);
server.use('/', uploadFiles);
server.use('/', delColl);
server.use('/', currItems);
server.use('/', currForCardItems)
// server.post('/items', upload.single('files'),  async (req, res) => {
//     const { title, description } = req.body;

//     const items = new itemSchema();
//     items.title = title;
//     items.description = description;
//     items.image =  req.file.filename;
//     console.log(`asd`)
//     await items.save();

//     res.json({
//         status: 200
//     }).send({message: "Asd"})
// })


server.post('/currForCardItems', async (req, res) => {
    //const { username, password, email } = req.body;
    const { title, description,image,color,user } = req.body;
    const query = await itemSchema.findOne({_id: mongoose.Types.ObjectId(user)});
   
    const items = new cardSchema();
   
    items.user = user;
    items.title = title;
    items.description = description;
    items.image = image;
    items.color = color;
    

    await items.save();
    res.json({
        status: 200,
        message: await items

    })
})
server.post('/cardItemsForUser',  async (req, res) => {
    const { user } = req.body;
    const query = await cardSchema.find({user});
   
    if(query != null ){
        res.json({
            status: 200, 
            message: await query,
         });
    }else {
        res.json({
            status: 401, 
            message: console.log('losho'),
         });
    }
     
   
        
});


server.get('/allItems',  async (req, res) => {
    console.log(`goes here, plzzz`);
    console.log(req)
    
    const query = await itemSchema.find({});

    if(query != null ){
        res.status(200).send({ message: query })
        // res.json({
        //     status: 200, 
        //     message: await query,
        //  });
    }else {
        res.status(401).send({message: 'Error getting items'})
            // res.json({
            //     status: 401, 
            //     message: console.log('losho'),
            // });
    }
});

server.post('/currItem',async (req,res)  => {
    const { id } = req.body;
    //console.log(id);
    const query = await itemSchema.findOne({_id: mongoose.Types.ObjectId(id)});
   // console.log(query);
    res.json({
        status: 200, 
        message: "success",
        title: query.title,
        image: query.image,
        description: query.description
    });
})


server.post('/sendEmail',async(req,res) => {
    
    const {name1,email,text} = req.body;
    //console.log(`name: `+name1);
    //console.log(`email: `+email);
    //console.log(`text: `+text);
    let subjectBot =``; 
    if (email == `dimovdesignbot@gmail.com`){
        subjectBot = `${name1} is sending message`;
    }else {
        subjectBot = `Respond for you: ${name1} `;
    }
      sgMail.setApiKey(key)
    const msg = {
    to: ['dimovdesignbot@gmail.com',email], // Change to your recipient
    from: 'dimovdesignbot@gmail.com', // Change to your verified sender
    
    subject: subjectBot,
    text: `Name: ${name1}\nText: `+text,
   // html: `<strong>`+` My name is `+name1+` `+ text + `\n email : `+ email + ` </strong>`,
}
sgMail
  .send(msg,true)
  .then(() => {
    console.log('Email sent')
    res.json({
        status:200,
        message:`Success!`
    })
  })
   .catch((error) => {
    res.json({
        status:404,
        message:`Not Found!`
        })
    console.error(error)
  })
})


server.post("/stripePayment",async (req,res)  => {
    //try {
       // const { token, amount } = req.body;
    
       // const charge = await stripe.charges.create({
       //   amount: amount * 100, // convert to cents
      //    currency: 'usd',
      //    source: token.id,
    //    });
        //data: data, //product
       // ccv: CCV,
      //  cardHolder: cardHolder,
      //  cardNumber: inputs,//cardNumber
      //  selectedMonth: selectedMonth,
      //  selectedYear: selectedYear
        const {data ,ccv,cardHolder,cardNumber,selectedMonth,selectedYear} = req.body;
        console.log("alo daaaaaaaaaaaaaaaa");
        console.log(req.body);
       stripe.paymentMethods.create({
        type: 'card',
        card: {
          number: cardNumber,
          exp_month: selectedMonth,
          exp_year: selectedYear,
          cvc: ccv
        }
      }, function(err, paymentMethod) {
        // handle errors
        if (err) {
            res.json({
                status:402,
                message:`Error with payment payment!`
                })
          console.error(err);
          return;
        }else {
            
            console.log("Valid card!");//terminal
        }
        
        stripe.paymentIntents.create({
            amount: 999,
            currency: 'usd',
            payment_method: paymentMethod.id,
            confirmation_method: 'manual',
            confirm: true
          }, function(err, paymentIntent) {
            // handle errors
            if (err) {
                res.json({
                    status:402,
                    message:`Error with payment payment!`
                    })
              console.error(err);
             
              return;
            }else {
                res.json({
                    status:200,
                    message:`Accepted payment!`//paymentIntent.status === "succeeded"
                    })
                console.log("Accepted card!");
            }
        })
    })
    
      //  res.json({ message: 'Payment processed successfully' });
    //  } catch (error) {
    //    res.json({ 
     //       status:404,
      //      message:"Not Found!"
      //   });
      //}
})

const Server = https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/yans-cloud.duckdns.org/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/yans-cloud.duckdns.org/fullchain.pem')
}, server);


    // const servera = https.createServer({
    //     key: fs.readFileSync('/home/pepo/key.pem'),
    //     cert: fs.readFileSync('/home/pepo/cert.pem')
    // }, server);

    Server.listen(8000, () => {
        console.log(`HTTPS server running on port ${8000} \n v1.1.0`);
    })


// req,params.id
// const port = 8000;
// server.listen(port, (req, res) => {
    // console.log("Server on");
    // console.log(`Listening on ${port} port`)
// });



