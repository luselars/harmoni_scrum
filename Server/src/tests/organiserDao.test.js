/* DELETE SOON BICH BOCH
event.name = "Mcpearsons nye organfest";
event.image = "piano.img";
event.start = "2008-1-29 14:57:00";
event.end = "2008-1-29 16:00:00";
event.status = "ready to party";
event.is_public = 1;
event.venue = "Koselig plass";
event.location_id = 1;
event.event_id = 2;
*/

// @flow
import mysql from "mysql";
import {Event, User, Location, Organiser} from "../../dao/modelDao.js"
const organiserDao = require("../../dao/organiserDao.js");
let dao = new organiserDao();

let event = new Event();
event.name = "Mcpearsons nye organfest";
event.image = "piano.img";
event.start = "2008-1-29 14:57:00";
event.end = "2008-1-29 16:00:00";
event.status = "ready to party";
event.is_public = 1;
event.venue = "Koselig plass";
event.location_id = 1;

describe('Empty test', () => {
    it('1 equals 1', done => {
        expect(1).toEqual(1);
        done();
    });
});


describe('', () => {

    // Find an event by ID (needs to be administered by email)
    it("Find event that doesn't exist", done => {
        function callback(status,data) {
            expect(data.length).toBe(0);
            done();
        }
        dao.getEvent(1, callback);
    });

    // Creates a new event
    it("Creating event", done => {
        function callback(status,data) {
            expect(data.affectedRows).toBeGreaterThanOrEqual(1);
            done();
        }
        let event = new Event();
        event.name = "Mcpearsons nye organfest";
        event.image = "piano.img";
        event.start = "2008-1-29 14:57:00";
        event.end = "2008-1-29 16:00:00";
        event.status = "ready to party";
        event.is_public = 0;
        event.venue = "Koselig plass";
        event.location_id = 1;
        dao.postEvent(event, callback);
    });

    // Find an event by ID (needs to be administered by email)
    it("Get event by id", done => {
        function callback(status,data) {
            expect(data.length).toBe(1);
            done();
        }
        dao.getEvent(1, callback);
    });

    // Updates an event
    it("Update event", done => {
        function callback(status,data) {
            console.log("Test callback: status=");
            expect(data.affectedRows).toBeGreaterThanOrEqual(1);
            done();
        }
        let event = new Event();
        event.is_public = 1;
        event.event_id = 1;
        dao.editEvent(event, callback);
    });

    // Deletes an event
    it("Delete event", done => {
        function callback(status,data) {
            console.log("Test callback: status=");
            expect(data.affectedRows).toBeGreaterThanOrEqual(1);
            done();
        }
        dao.deleteEvent(1, callback);
    });
});