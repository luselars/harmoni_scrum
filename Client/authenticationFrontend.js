import EventService from "../EventService.js";
import UserService from "../UserService.js";

// Login for regular users
function login() {
  var username = "test"; //document.getElementById();
  var password = "test"; //document.getElementById();
  eventService
    .loginUser(username, password)
    .then(response => response.json())
    .then(json => handleResponse(json))
    .catch(error => console.error("Error: ", error));
}

// Login for organisers
function login() {
  var username = "test"; //document.getElementById();
  var password = "test"; //document.getElementById();
  eventService
    .loginOrganiser(username, password)
    .then(response => response.json())
    .then(json => handleResponse(json))
    .catch(error => console.error("Error: ", error));
}

// Saves the token in localStorage for use
function handleResponse(json) {
  localStorage.setItem("token", json.jwt);
}

// For registration
// Hashes and salts a password and returns the hash and salt
function generateHash(password) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  return { hash: hash, salt: salt };
}
