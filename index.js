var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');

const FileSchema = require('./models/fileModel');

let mongoose = require('mongoose')
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});




// Storage: 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:/Users/julio/Downloads/'); // Directory to store uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique file name
    },
});
const upload = multer({storage: storage})
// Connect with the database 
mongoose.connect(process.env.DB_STRING);

app.post("/api/fileanalyse", upload.single("upfile"), async (req, res) =>{
 if (req.file) {
        res.json({
            name: req.file.originalname,
            type: req.file.mimetype,
            size: req.file.size
        });
    } else {
        // This 'else' block would catch cases where no file was sent or the field name didn't match.
        // However, the 'Unexpected field' error usually happens before this if-else.
        res.status(400).json({ error: 'No file uploaded or an issue occurred.' });
    }
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
