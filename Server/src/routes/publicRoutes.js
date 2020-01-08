// @flow
import express from 'express';
let router  = express.Router();

// Example 1 - GET /public
router.get("/", (req, res) => {
    console.log("Triggered at /public");
    res.sendStatus(200);
});

// Example 2 - POST /public/event
router.post("/event", (req, res) => {
    console.log("Triggered at /public/event");
    res.sendStatus(200);
});

module.exports = router;