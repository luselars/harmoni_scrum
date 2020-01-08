// @flow
import express from 'express';
const path = require("path");
const fs = require("fs");
const crypto = require('crypto');

let router  = express.Router();
const upload = require('../uploadMiddleware');


// Upload file. If the request is valid the file is moved to the folder files with a new randomised name
// and the new name is returned to the user.
// Accepts files with the extensions .pdf, .jpg, .jpeg and .png.
// There is no validation to see if a file with an extension is actually that type of file.
router.post('/file', upload.single('file'), async function (req, res) {
    // Length of random generated file-name
    const len = 16;
    console.log("File upload request received");
    // Check if there is a file present in the request.
    if (!req.files.file) {
        res.statusMessage = "Please provide a file.";
        return res.sendStatus(401);
    }
    // Get file extension
    let ext = path.extname(req.files.file.name);
    // If the extension is valid
    if (ext === '.png' || ext === '.jpg' || ext === 'jpeg' || ext === 'pdf') {
        let p = __dirname + '/../../files/';
        console.log(p);
        //Create a random number for the image
        let str = crypto.randomBytes(Math.ceil(len/2))
            .toString('hex') // convert to hexadecimal format
            .slice(0,len);
        // Check if image exists, if it does: generate a new number.
        while (fs.existsSync(p + number + ext)) {
            str = crypto.randomBytes(Math.ceil(len/2))
                .toString('hex') // convert to hexadecimal format
                .slice(0,len);
        }
        let fullPath = p + str + ext;
        // relocate file
        req.files.image.mv(fullPath);
        // TODO check if we need the two following sentences
        // // return new name of file
        // res.statusMessage = number + ext;
        return res.sendStatus(200);
    }
    // Return 401 if the extension is not supported.
    else {
        res.statusMessage = "File extension not supported.";
        return res.sendStatus(401);
    }
});

module.exports = router;