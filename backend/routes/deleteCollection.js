const router = require("express").Router();
const { itemSchema } = require("../schema");
const fs = require('fs');
const path = require('path');
// const mongoose = require("mongoose");

const directory = path.resolve(__dirname,"../../testd/public/images2");

const deleteImages = () => {
  fs.readdir(directory, (err, files) => {
    if(err) console.log(`Error Deleting Files`, err);

    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if(err) console.log(`Error Unlinking files`, err);
        console.log(`Successful deleting files uwu`);
      })
    }
  })
}

router.get("/delete-col", async (req, res) => {
  console.clear();
  try {
    // await mongoose.connection.dropCollection('itemSchema')
    // await mongoose.connection.dropCollection()
    itemSchema.deleteMany({}, (err) => {
      err
        ? console.log(`[Error Delete]`, err)
        : console.log(`All images have been deleted`);
    });
    deleteImages();
    res.json({
        status:  200,
        message: 'Successful schema delete',
    })
  } catch (err) {
    console.log(`[Error catch]`, err);
    res.json({
        status: 400,
        message: 'Error' + err,
    })
  }
});

module.exports = router;