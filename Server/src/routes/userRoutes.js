// @flow
import express from 'express';
import mysql from 'mysql';
const path = require("path");
const fs = require("fs");
const crypto = require('crypto');

const userDao = require("../../dao/userDao.js");
const upload = require('../uploadMiddleware');
let dao = new userDao();
let router = express.Router();


// Edit a specific user
router.put('', (req: { body: JSON }, res: express$Response) => {
    dao.editUser(req.body,(status, data) => {
        res.status(status);
        res.send(data);
    });
});

// Delete single user
router.delete('/:id', (req: express$Request, res: express$Response) => {
    dao.deleteUser(req.params.id ,(status, data) => {
            res.status(status);
            res.send(data);
        }
    );
});

 // Retrieve all events that the user is a part of 
 router.get("/:id/event", (req: express$Request, res: express$Response) => {
    dao.getUserByEvent(req.params.id, (status, data) => {
        res.status(status);
        res.send(data);
    })
});



// Get file. The id should match a file in the folder files
// TODO make sure the user is authorised to get the requested file. e.g. the user-id is present in the same row as the filename in db
router.get('/file/:id', function(req, res) {
    console.log("Got a file request");
    res.sendFile(path.join(__dirname + '/../../files/' + req.params.id));
});


// Upload file. If the request is valid the file is moved to the folder files with a new randomised name
// and the new name is returned to the user.
// Accepts files with the extensions .pdf, .jpg, .jpeg and .png.
// There is no validation to see if a file with an extension is actually that type of file.
router.post('/file', upload.single('recfile'), async function (req, res) {
    // Length of randomly generated name of file
    const len = 16;
    console.log("File upload request received");
    // Check if there is a file present in the request.
    if (!req.file) {
        res.statusMessage = "Please provide a file.";
        return res.sendStatus(401);
    }
    // Get file extension
    let ext = path.extname(req.file.originalname);
    // If the extension is valid
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.pdf') {
        // Length of random generated name
        const len = 16;
        let p = __dirname + '/../../files/';
        //Create a random number for the image
        let str = crypto.randomBytes(Math.ceil(len/2))
            .toString('hex') // convert to hexadecimal format
            .slice(0,len);
        // Check if image exists, if it does: generate a new number.
        while (fs.existsSync(p + str + ext)) {
            str = crypto.randomBytes(Math.ceil(len/2))
                .toString('hex') // convert to hexadecimal format
                .slice(0,len);
        }
        console.log(str + ext);
        p = p + str + ext;
        fs.writeFile(p, req.file.buffer, function (err) {
            if (err) throw err;
            console.log("File moved to /files");
        });
        return res.sendStatus(200);
        }
        // Return 401 if the extension is not supported.
        else {
            res.statusMessage = "File extension not supported.";
            return res.sendStatus(401);
        }
    });



module.exports = router;

