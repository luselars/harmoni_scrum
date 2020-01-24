//@flow
let jwt = require('jsonwebtoken');
let privateKey = 'shhhhhverysecret';
let publicKey = privateKey;

/** module to decode tokens */
module.exports = class tokenDecoder {
  /**
   * method to decode token
   */
  decode(token: string, callback: (err: number, decoded: Object) => mixed) {
    jwt.verify(token, publicKey, (err, decoded) => {
      callback(err, decoded);
    });
  }
};
