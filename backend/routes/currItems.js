const router = require('express').Router();
const { itemSchema } = require('../schema');
const mongoose = require('mongoose');


router.get('/getItems/:id', async (req, res) => {
    // console.log(`on my own`, req.params.id)

    // console.log(`Wzima ID`, req.params.id);

    const  id  = req.params.id;
    console.log("id", id);

   const query = await itemSchema.aggregate([{ '$match': { '$expr' : { '$eq': [ '$_id' ,{'$convert': {'input': id, to : 'objectId', 'onError': '','onNull': ''}} ] } } }]);
    console.log("query", query);
        if (query.length != 0)
        res.json({
            status: 200,
            message: "File Found",
            title: query[0].title,
            image: query[0].image,
            description: query[0].description
            
        });

        else res.json({
            status: 401,
            message: "Not Found"
        })


})


router.post('/getItems', async (req, res) => {
    console.log(`Wzima BODY`, req.body);

    const { id } = req.body;

    const query = await itemSchema.findOne({_id: id});

    if (query)
    res.json({
        status: 200,
        message: "success",
        title: query.title,
        image: query.image,
        description: query.description
    });

    else res.json({
        status: 401,
        message: "Failed"
    })

})

module.exports = router;