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

// Middleware for organiser activities BRUK DENNE FOR USER OGSÅ
router.use('', (req, res, next) => {
  var token = req.headers['x-access-token'];
  td.decode(token, (err, decoded) => {
    if (err) {
      res.status(401);
      res.json({
        error: err,
      });
    } else {
      if (decoded.type == 'organiser') {
        console.log('Token ok: ' + decoded.username);
        req.email = decoded.username;
        req.uid = decoded.id;
        next();
      } else {
        console.log('Token NOT ok');
        res.status(401);
        res.json({
          error: 'Not authorized, you do not have access to this action',
        });
      }
    }
  });
});

router.param('event_id', function(req, res, next, event_id) {
  dao.organiserOwnsEvent(req.params.event_id, req.uid, (status, data) => {
    console.log(status);
    console.log(data);
    if (data.length == 0) {
      res.status(404);
      res.send({ error: 'Arragementet eksiterer ikke' });
    } else {
      next();
    }
  });
});

// Find a specific event by id (with your organiser email)
router.get('/event/:event_id', (req: express$Request, res: express$Response) => {
  dao.getEvent(req.params.event_id, req.email, (status, data) => {
    res.status(status);
    res.send(data[0]);
  });
});

// Create new event (and connect it to the organiser)
router.post('/event', (req: { body: Object }, res: express$Response) => {
  dao.postEvent(req.body, (status, data) => {
    let d = data;
    if (status == 200) {
      dao.postEventOrganiser(data.insertId, req.id, (status, data) => {
        res.status(status);
        res.send(d);
      });
    } else {
      res.status(status);
      res.send(data);
    }
  });
});

// Get all locations
router.get('/location', (req: express$Request, res: express$Response) => {
  dao.getLocation((status, data) => {
    res.status(status);
    res.send(data);
  });
});

// Create new location
router.post('/location', (req: { body: Object }, res: express$Response) => {
  dao.postLocation(req.body, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

// Edit a specific event
router.put('/event/:event_id', (req: { body: Object }, res: express$Response) => {
  uploadFunctions.handleFile(req.body.image, function(name) {
    req.body.image = name;
    dao.editEvent(req.body, req.params.event_id, req.email, (status, data) => {
      res.status(status);
      res.send(data);
    });
  });
});

// Delete single event
router.delete('/event/:event_id', (req: express$Request, res: express$Response) => {
  // check if organiser the organiser has an event with the provided id
  var completedDeletions = 0;
  function checkIfDone() {
    if (completedDeletions > 6) {
      res.status(200);
      res.send('Event deleted');
    } else {
      completedDeletions++;
    }
  }
  dao.deleteEventOrganisers(req.params.id, (status, data) => {
    checkIfDone();
  });
  dao.deleteEventVolunteers(req.params.id, (status, data) => {
    checkIfDone();
  });
  dao.deleteEventArtists(req.params.id, (status, data) => {
    checkIfDone();
  });
  dao.deleteEventFiles(req.params.id, (status, data) => {
    checkIfDone();
  });
  dao.deleteEventTickets(req.params.id, (status, data) => {
    checkIfDone();
  });
  dao.deleteEventRiders(req.params.id, (status, data) => {
    checkIfDone();
  });
  dao.deleteEventSchedule(req.params.id, (status, data) => {
    checkIfDone();
  });
  dao.deleteEvent(req.params.id, (status, data) => {
    checkIfDone();
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
router.post('/artist/:event_id', (req: express$Request, res: express$Response) => {
  dao.addArtistToEvent(
    req.body.artist_id,
    req.params.event_id,
    req.body.contract,
    req.body.notes,
    (status, data) => {
      res.status(status);
      res.send(data);
    },
  );
});

// Get all types of volunteers from an organiser.
router.get('/group', (req: express$Request, res: express$Response) => {
  dao.getGroup(req.email, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

// TODO: Flytt til public?
// Get ticket-types for a single event
router.get('/event/:event_id/tickets', (req: express$Request, res: express$Response) => {
  dao.getEventTickets(req.params.event_id, (status, data) => {
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

// Lets an organiser look at his profile.
router.get('/myprofile', (req: express$Request, res: express$Response) => {
  td.decode(req.headers['x-access-token'], (err, decoded) => {
    if (err) {
      res.status(401);
      res.send(err);
    } else {
      dao.getProfile(decoded.username, (status, data) => {
        res.status(status);
        res.send(data);
      });
    }
  });
});

// Lets an organiser change his profile.
router.put('/myprofile', (req: express$Request, res: express$Response) => {
  td.decode(req.headers['x-access-token'], (err, decoded) => {
    if (err) {
      res.status(401);
      res.send(err);
    } else {
      dao.editProfile(decoded.username, (status, data) => {
        res.status(status);
        res.send(data);
      });
    }
  });
});

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
router.get('/event/:event_id/volunteer', (req: express$Request, res: express$Response) => {
  dao.getVolunteersByEvent(req.params.id, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

//Get all artists who are part of an event
router.get('/event/:event_id/artist', (req: express$Request, res: express$Response) => {
  dao.getArtistsByEvent(req.params.id, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

// Edit a ticket type
router.put('/tickets', (req: { body: Object }, res: express$Response) => {
  dao.editTicketType(req.body, req.email, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

module.exports = router;
