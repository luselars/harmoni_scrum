// @flow
const crypto = require('crypto');
const fs = require("fs");

let uploadFunctions = {
    base64Decoder: function(file: string) : string {
        let matches = file.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};

        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }

        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');
        return response;
    },
    createFilePath: function(extension: string) : string {
        extension = extension.substring(extension.indexOf('/') + 1, extension.length);
        extension = "." + extension;
        console.log(extension);
        const len = 16;
        let p = __dirname + '/../files/';
        //Create a random number for the file
        let str = crypto.randomBytes(Math.ceil(len/2))
            .toString('hex') // convert to hexadecimal format
            .slice(0,len);
        // Check if image exists, if it does: generate a new number.
        while (fs.existsSync(p + str + extension)) {
            str = crypto.randomBytes(Math.ceil(len/2))
                .toString('hex') // convert to hexadecimal format
                .slice(0,len);
        }
        console.log(str + extension);
        return p + str + extension;
    }
};

module.exports = uploadFunctions;