//@flow
module.exports = class tokenDecoder {
  privateKey = "shhhhhverysecret";
  publicKey = privateKey;
  decode(token: string) {
    jwt.verify(token, publicKey, (err, decoded) => {
      if (err) {
        console.log("Token NOT ok");
        return { status: 401, error: "Not authorized, log in again" };
      } else {
        console.log("Token ok");
        return { status: 200, email: decoded.username, type: decoded.type };
      }
    });
  }
};
