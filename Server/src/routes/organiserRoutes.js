// @flow
import express from 'express';
import mysql from 'mysql';
import { sendInvite } from '../mailClient';
import { decodeBase64Image } from '../uploadHelper';
import uploadFunctions from '../uploadHelper';
let bcrypt = require('bcryptjs');
const tokenDecoder = require('./tokenDecoder');
let td = new tokenDecoder();

var nodemailer = require('nodemailer');

const organiserDao = require('../../dao/organiserDao.js');
let dao = new organiserDao('mysql-ait.stud.idi.ntnu.no', 'larsoos', 'S6yv7wYa', 'larsoos');

const upload = require('../uploadHelper');
let router = express.Router();

router.changeDao = function changeDao(organiserDao: organiserDao) {
  dao = organiserDao;
};

// Middleware for organiser activities
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
        //console.log('Token ok: ' + decoded.username);
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

// Checks organiser of event id for authorization
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

// Get event artists with contract and stuff
router.get('/artist/:event_id', (req: express$Request, res: express$Response) => {
  dao.getEventArtist(req.params.event_id, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

// Find a specific event by id (with your organiser id)
router.get('/event/:event_id', (req: express$Request, res: express$Response) => {
  dao.getEvent(req.params.event_id, req.uid, (status, data) => {
    console.log(data[0]);
    res.status(status);
    res.send(data[0]);
  });
});

// Create new event (and connect it to the organiser)
router.post('/event', (req: { body: Object }, res: express$Response) => {
  dao.postEvent(req.body, (status, data) => {
    let d = data;
    if (status == 200) {
      dao.postEventOrganiser(data.insertId, req.uid, (status, data) => {
        res.status(status);
        res.send(d);
      });
    } else {
      console.log(data);
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
  dao.getSingleLocation(req.body.address, (status, data) => {
    if (data.length === 0) {
      dao.postLocation(req.body, (status, data) => {
        res.status(100);
        res.send(data);
      });
    } else {
      res.status(status);
      res.send(data[0]);
    }
  });
});

// Edit a specific event
router.put('/event/:event_id', (req: { body: Object }, res: express$Response) => {
  if (req.body.image !== '') {
    uploadFunctions.handleFile(req.body.image, function(name) {
      req.body.image = name;
      dao.editEvent(req.body, req.params.event_id, (status, data) => {
        res.status(status);
        res.send(data);
      });
    });
  } else {
    dao.editEvent(req.body, req.params.event_id, (status, data) => {
      res.status(status);
      res.send(data);
    });
  }
});

//edit an event artist to add contracts and stuff
router.put('/artist/:artist_id', (req: { body: Object }, res: express$Response) => {
  uploadFunctions.handleFile(req.body.contract, function(name) {
    req.body.contract = name;
    dao.putEventArtist(
      req.params.artist_id,
      req.body.event_id,
      req.body.contract,
      req.body.notes,
      req.body.accepted,
      (status, data) => {
        res.status(status);
        res.send(data);
      },
    );
  });
});

// Delete single event
router.delete('/event/:event_id', (req: express$Request, res: express$Response) => {
  dao.deleteEvent(req.params.event_id, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

// Get artist
router.get('/artist', (req: express$Request, res: express$Response) => {
  dao.getArtist(req.body, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

//Get riders for event
router.get('/event/rider/:event_id', (req: express$Request, res: express$Response) => {
  dao.getRiders(req.params.event_id, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

// Adds a rider to the event on a user
router.put('/event/rider/:event_id/:rider_id', (req: { body: string }, res: express$Response) => {
  uploadFunctions.handleFile(req.body.rider_file, function(imageUrl) {
    req.body.rider_file = imageUrl;
    dao.editRider(req.body.rider_file, req.params.event_id, req.params.rider_id, (status, data) => {
      res.status(status);
      res.send(data);
    });
  });
});

// Adds a rider to the event on a user
router.post('/event/rider/:event_id/:user_id', (req: { body: string }, res: express$Response) => {
  uploadFunctions.handleFile(req.body.rider_file, function(imageUrl) {
    req.body.rider_file = imageUrl;
    dao.postRider(req.body.rider_file, req.params.event_id, req.params.user_id, (status, data) => {
      res.status(status);
      res.send(data);
    });
  });
});

// Delete a single rider
router.delete('/event/rider/:event_id/:rider_id', (req: express$Request, res: express$Response) => {
  dao.deleteRider(req.params.event_id, req.params.rider_id, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

//Send email
router.post('/sendmail', (req: express$Request, res: express$Response) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'harmoni.scrum@gmail.com',
      pass: 'scrum2team',
    },
  });

  var mailOptions = {
    from: 'harmoni.scrum@gmail.com',
    to: req.body.email,
    subject: 'Nytt arrangement',
    html:
      '<h1>Nytt arrangement</h1><p>Heisann! <br>Du har blitt lagt til i arrangementet ' +
      req.body.name +
      '. ' +
      req.body.text +
      '</p><p>Mvh.<br>Alle oss i harmoni</p>',
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.sendStatus(404);
    } else {
      console.log('Email sent: ' + info.response);
      res.sendStatus(200);
    }
  });
});

// Add artist to owned event
router.post('/artist/:event_id', (req: express$Request, res: express$Response) => {
  dao.getUserId(req.body.email, (status, data) => {
    res.status(status);
    let d = data;

    if (data.length === 0) {
      //lag en dummy user og artist:
      let password = 'EndreMeg';
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(password, req.body.salt);
      dao.postUser(req.body.email, hash, salt, (status, data) => {
        res.status(status);
        let id = data.insertId;
        dao.postArtist(id, (status2, data2) => {
          res.status(status2);
          dao.addArtistToEvent(id, req.params.event_id, (status3, data3) => {
            res.status(status3);
            res.send({ message: 'Added new user', password: password });
          });
        });
      });
    } else {
      let start_id = data[0].user_id;
      //sjekk om bruker allerede er artist
      console.log(start_id);
      dao.checkArtist(start_id, (status, data) => {
        res.status(status);
        d = data;
        if (data.length === 0) {
          // Bruker er ikke artist
          dao.postArtist(start_id, (status, data) => {
            res.status(status);
            dao.addArtistToEvent(start_id, req.params.event_id, (status, data) => {
              res.status(status);
              res.send({ message: 'Made user artist and added him/her to event', id: start_id });
            });
          });
        } else {
          // Bruker er artist
          dao.addArtistToEvent(start_id, req.params.event_id, (status, data) => {
            console.log(status + ' - status');
            if (status == 500) {
              res.status(400);
              res.send('Artist already in event');
            } else {
              res.status(status);
              res.send({ message: 'Added existing artist to event', id: start_id });
            }
          });
        }
      });
    }
  });
});

//adds volunteer to event, here we go again 413
router.post('/volunteer/:vid/:event_id', (req: express$Request, res: express$Response) => {
  dao.getUserId(req.body.email, (status, data) => {
    res.status(status);
    let d = data;

    if (data.length === 0) {
      //lag en dummy user og artist:
      dao.postUser(req.body.email, (status, data) => {
        res.status(status);
        let ud = data;
        let id = ud.insertId;

        res.status(status);
        dao.addVolunteerToEvent(id, req.params.event_id, req.params.vid, (status, data) => {
          res.status(status);
          res.send(data);
        });
      });
    } else {
      let start_id = data[0].user_id;
      //sjekk om artist eksisterer
      console.log(start_id);
      dao.addVolunteerToEvent(start_id, req.params.event_id, req.params.vid, (status, data) => {
        if (status == 500) {
          res.status(400);
          res.send('Staff already in event');
        } else {
          res.status(status);
          res.send(data);
        }
      });
    }
  });
});

// Deletes one organiser
router.delete('/organiser/:organiser_id', (req: express$Request, res: express$Response) => {
  dao.deleteOrganiser(req.params.organiser_id, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

// Get all types of volunteers from an organiser.
router.get('/group', (req: express$Request, res: express$Response) => {
  dao.getGroup(req.uid, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

// Get all events your organiser account is connected to
router.get('/myevents', (req: express$Request, res: express$Response) => {
  dao.getMyEvents(req.uid, (status, data2) => {
    res.status(status);
    res.send(data2);
  });
  /*
  dao.getMyId(req.email, (status, data) => {
    res.status(status);
    dao.getMyEvents(data, (status, data2) => {
      res.status(status);
      res.send(data2);
    });
  });*/
});

// TODO: Flytt til public?
// Get ticket-types for a single event
router.get('/event/:event_id/tickets', (req: express$Request, res: express$Response) => {
  dao.getEventTickets(req.params.event_id, (status, data) => {
    res.status(status);
    res.send(data);
  });
});
// Lets an organiser look at his profile.
router.get('/myprofile', (req: express$Request, res: express$Response) => {
  dao.getProfile(req.uid, (status, data) => {
    res.status(status);
    res.send(data[0]);
  });
});

// Lets an organiser change his profile.
router.put('/myprofile', (req: express$Request, res: express$Response) => {
  if (req.body.password.length !== 0) {
    req.body.salt = bcrypt.genSaltSync(10);
    req.body.hash = bcrypt.hashSync(req.body.password, req.body.salt);
    req.body.password = null;
  }
  if (req.body.image !== null && req.body.image !== undefined) {
    uploadFunctions.handleFile(req.body.image, function(imageUrl) {
      req.body.image = imageUrl;
      dao.editProfile(req.uid, req.body, (status, data) => {
        res.status(status);
        res.send(data);
      });
    });
  } else {
    dao.editProfile(req.uid, req.body, (status, data) => {
      res.status(status);
      res.send(data);
    });
  }
});

router.put('/event/:event_id/cancel', (req: express$Request, res: express$Response) => {
  dao.toggleCancel(req.params.event_id, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

//Get all volunteers who are part of an event
router.get('/event/:event_id/volunteer', (req: express$Request, res: express$Response) => {
  dao.getVolunteersByEvent(req.params.event_id, req.uid, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

//post a new volunteer type to an organiser
router.post('/volunteer', (req: express$Request, res: express$Response) => {
  dao.postVolunteerType(req.body.name, req.uid, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

//delete voluunteer type by id
router.delete('/volunteer/:id', (req: express$Request, res: express$Response) => {
  dao.deleteVolunteerType(req.params.id, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

//adds user to event with a volunteer type
/*router.post('event/:eid/user/:id/volunteer/:vid', (req: express$Request, res: express$Response) => {
  dao.addVolunteerToEvent(req.params.id, req.params.eid, req.params.vid, (status, data) => {
    res.status(status);
    res.send(data);
  });
});*/

//removes user from event as staff
router.delete('/event/:eid/user/:id', (req: express$Request, res: express$Response) => {
  dao.removeVolunteerFromEvent(req.params.id, req.params.eid, (status, data) => {
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

// Get all of users ticket types
router.get('/tickets', (req: express$Request, res: express$Response) => {
  dao.getMyTickets(req.uid, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

// Create a new ticket type
router.post('/tickets', (req: { body: Object }, res: express$Response) => {
  dao.postTicketType(req.body, req.uid, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

// Add ticket type to event
router.post('/event/:eid/tickets', (req: { body: Object }, res: express$Response) => {
  dao.postEventTicket(req.body, req.params.eid, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

// Edit a ticket type
router.put('/tickets/:id', (req: { body: Object }, res: express$Response) => {
  dao.editTicketType(req.body, req.params.id, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

// Delete a ticket type
router.delete('/tickets/:id', (req: express$Request, res: express$Response) => {
  dao.deleteTicketType(req.params.id, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

// Delete a ticket type from an event
router.delete('/event/:eid/tickets/:tid', (req: express$Request, res: express$Response) => {
  dao.deleteEventTicket(req.params.tid, req.params.eid, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

//Get a ticket type
router.get('/tickets/:id', (req: express$Request, res: express$Response) => {
  dao.getTicketType(req.params.id, (status, data) => {
    res.status(status);
    res.send(data);
  });
});

module.exports = router;
