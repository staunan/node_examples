var http = require("https");
require('dotenv').config();

const DEVICE_ID = process.env.DEVICE_ID;
const DEVICE_PASSWORD = process.env.DEVICE_PASSWORD;
             
var options = {
    "method": "GET",
    "hostname": "sandbox.payfabric.com",
    "port": null,
    "path": "/payment/api/token/create",
    "headers": {
        "authorization": DEVICE_ID + "|" + DEVICE_PASSWORD
    }
};
             
var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
    });
});

req.end();
