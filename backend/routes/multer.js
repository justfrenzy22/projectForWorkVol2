const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const { itemSchema}  = require('../schema.js');


router.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    console.log(`Destination`);
    cb(null, path.resolve(__dirname, "../../frontend1/public/images2/"));
  },
  filename: (req, file, cb) => {
    console.log(`filename`);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9); 
    cb(null,  uniqueSuffix + '-' +  file.originalname );
    console.log(` filename ${file.filename} original ${file.originalname} field ${file.fieldname} `);
  },
});

const upload = multer({storage: storage});

router.post("/items", upload.single('files'), async (req, res) => {
    console.log(`[test1]`);
    try {
        console.log(`test debug 1`, req.body.file);

    const { title, description } = req.body;
    const items = new itemSchema();
    items.title = title;
    items.description = description;
    console.log(`original name`, req.file.originalname);
    console.log(`filename `, req.file.filename); 
    console.log(`fieldname`, req.file.fieldname);
    items.image = req.file.filename;
    console.log(`req image path`, req.file.path);
    console.log(`Save file`);
    await items.save();
    res.json({
      status: 200,
      message: "File uploaded successfully"
    })
    
    } catch (err) {
        console.log(`Catch some error`, err);
        res.json({
          status: 400,
          message: "Error sending File"
        })
    }


}, upload.single('files'));

module.exports = router;