// @flow
import express from 'express';
import mysql from 'mysql';

const userDao = require("../../dao/userDao.js");

let dao = new userDao();
let router = express.Router();

module.exports = router;

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

