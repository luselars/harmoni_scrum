//@flow
let jwt = require('jsonwebtoken');
let privateKey = 'shhhhhverysecret';
let publicKey = privateKey;
module.exports = class tokenDecoder {
  decode(token: string, callback: (err: number, decoded: Object) => mixed) {
    jwt.verify(token, publicKey, (err, decoded) => {
      callback(err, decoded);
    });
  }
};
