// @flow
import express from 'express';
import mysql from 'mysql';
import { sendInvite } from '../mailClient';
import { decodeBase64Image } from '../uploadHelper';
import uploadFunctions from '../uploadHelper';
const tokenDecoder = require('./tokenDecoder');
let td = new tokenDecoder();

const organiserDao = require('../../dao/organiserDao.js');
let dao = new organiserDao();

const upload = require('../uploadHelper');
let router = express.Router();

// TODO add auth to all this shit

// Middleware for organiser activities BRUK DENNE FOR USER OGSÅ
/*app.use("/organiser", (req, res, next) => {
  var token = req.headers["x-access-token"];
  let decoded = td.decode(token);
  if (decoded.status == 200) {
    if (decoded.type == "organiser") {
      console.log("Token ok: " + decoded.username);
      next();
    } else {
      console.log("Token NOT ok");
      res.status(401);
      res.json({
        error: "Not authorized, you do not have access to this action"
      });
    }
  } else {
    res.status(decoded.status);
    res.json({ error: decoded.error });
  }
});*/

// Find a specific event by id (with your organiser email)
router.get('/event/:id', (req: express$Request, res: express$Response) => {
  td.decode(req.headers['x-access-token'], (err, decoded) => {
    if (err) {
      res.status(401);
      res.send(err);
    } else {
      dao.getEvent(req.params.id, decoded.username, (status, data) => {
        res.status(status);
        res.send(data[0]);
      });
    }
  });
});

// Create new event (and connect it to the organiser)
router.post('/event', (req: { body: Object }, res: express$Response) => {
  dao.postEvent(req.body, (status, data) => {
    res.status(status);
    let d = data;
    dao.postEventOrganiser(data.insertId, (status, data) => {
      res.status(status);
      res.send(d);
    });
  });
});

// Edit a specific event
router.put('/event', (req: { body: Object }, res: express$Response) => {
  uploadFunctions.handleFile(req.body.image, function(name) {
    req.body.image = name;
    dao.editEvent(req.body, (status, data) => {
      res.status(status);
      res.send(data);
    });
  });
});

// Delete single event
router.delete('/event/:id', (req: express$Request, res: express$Response) => {
  dao.deleteEventOrganisers(req.params.id, (status, data) => {
    res.status(status);
    res.send(data);
  });
  dao.deleteEventVolunteers(req.params.id, (status, data) => {
    res.status(status);
    res.send(data);
  });
  dao.deleteEventArtists(req.params.id, (status, data) => {
    res.status(status);
    res.send(data);
  });
  dao.deleteEventFiles(req.params.id, (status, data) => {
    res.status(status);
    res.send(data);
  });
  dao.deleteEventTickets(req.params.id, (status, data) => {
    res.status(status);
    res.send(data);
  });
  dao.deleteEventRiders(req.params.id, (status, data) => {
    res.status(status);
    res.send(data);
  });
  dao.deleteEventSchedule(req.params.id, (status, data) => {
    res.status(status);
    res.send(data);
  });
  dao.deleteEvent(req.params.id, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

// Get artist
router.get('/artist', (req: { body: string }, res: express$Response) => {
  dao.getArtist(req.body, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

// Add artist to owned event
router.post('/artist/:id', (req: { body: Object }, res: express$Response) => {
  dao.editEvent(req.body, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

// Get a group of volunteers from an organiser.
router.get('/group/:id', (req: express$Request, res: express$Response) => {
  dao.getGroup(req.params.id, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

// Get ticket-types for a single event
router.get('/event/:id/tickets', (req: express$Request, res: express$Response) => {
  dao.getEventTickets(req.params.id, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

// Send an invite email (CHANGE TO POST WITH COMMENTING POSSIBILITY)
router.get('/sendmail', (req, res) => {
  console.log('Sender mail');
  sendInvite('jonas4a@gmail.com', 'event!!!', function(resp) {
    console.log(resp);
    if (resp) res.sendStatus(200);
    else res.sendStatus(400);
  });
});

// TODO auth
// Upload file. If the request is valid the file is moved to the folder files with a new randomised name
// and the new name is returned to the user.
// Accepts files with the extensions .pdf, .jpg, .jpeg and .png.
// There is no validation to see if a file with an extension is actually that type of file.
// router.post('/file', upload.single('recfile'), async function (req, res) {
//     // Length of randomly generated name of file
//     const len = 16;
//     console.log("File upload request received");
//     // Check if there is a file present in the request.
//     if (!req.file) {
//         res.statusMessage = "Please provide a file.";
//         return res.sendStatus(401);
//     }
//     // Get file extension
//     let ext = path.extname(req.file.originalname);
//     // If the extension is valid
//     if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.pdf') {
//         // Length of random generated name
//         const len = 16;
//         let p = __dirname + '/../../files/';
//         //Create a random number for the image
//         let str = crypto.randomBytes(Math.ceil(len/2))
//             .toString('hex') // convert to hexadecimal format
//             .slice(0,len);
//         // Check if image exists, if it does: generate a new number.
//         while (fs.existsSync(p + str + ext)) {
//             str = crypto.randomBytes(Math.ceil(len/2))
//                 .toString('hex') // convert to hexadecimal format
//                 .slice(0,len);
//         }
//         console.log(str + ext);
//         p = p + str + ext;
//         fs.writeFile(p, req.file.buffer, function (err) {
//             if (err) throw err;
//             console.log("File moved to /files");
//         });
//         res.status(200);
//         res.send({"name":str+ext});
//         // return res.sendStatus(200);
//     }
//     // Return 401 if the extension is not supported.
//     else {
//         res.statusMessage = "File extension not supported.";
//         return res.sendStatus(401);
//     }
// });

// TODO delete this after incorporating
router.post('/filetest', (req: express$Request, res: express$Response) => {
  // TODO remember to check extension and size?
  // console.log(req.body.file);
  let file = uploadFunctions.base64Decoder(req.body.file);
  let path = uploadFunctions.createFilePath(file.type);
  fs.writeFile(path, file.data, function(err) {
    if (err) {
      // TODO correct response code?
      res.sendStatus(400);
      throw err;
    }
    console.log('File moved.');
    res.sendStatus(200);
  });
});

//Get all volunteers who are part of an event
router.get('/event/:id/volunteer', (req: express$Request, res: express$Response) => {
  dao.getVolunteersByEvent(req.params.id, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

//Get all artists who are part of an event
router.get('/event/:id/artist', (req: express$Request, res: express$Response) => {
  dao.getArtistsByEvent(req.params.id, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

// Edit a ticket type
router.put("/tickets", (req: { body: Object }, res: express$Response) => {
    dao.editTicketType(req.body, (status, data) => {
        res.status(status);
        res.send(data);
    });
});


//Get a ticket type
router.get('/tickets/:id', (req: express$Request, res: express$Response) => {
    td.decode(req.headers['x-access-token'], (err, decoded) => {
        if (err) {
          res.status(401);
          res.send(err);
        } else {
          dao.getMyId(decoded.username, (status, data) => {
            res.status(status);
            dao.getTicketType(req.params.id,data[0], (status, data2) => {
                res.status(status);
                console.log(data2);
                res.send(data2);
              });
          });
        }
      });
  });




module.exports = router;
