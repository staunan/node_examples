var http = require("https");
require('dotenv').config();

const DEVICE_ID = process.env.DEVICE_ID;
const DEVICE_PASSWORD = process.env.DEVICE_PASSWORD;

let createTransaction = async () => {
    return new Promise((resolve, reject)=>{
        var options = {
            "method": "POST",
            "hostname": "sandbox.payfabric.com",
            "port": null,
            "path": "/payment/api/transaction/create",
            "headers": {
                "content-type": "application/json",
                "authorization": DEVICE_ID + "|" + DEVICE_PASSWORD
            }
        };
            
        var req = http.request(options, function (res) {
            var chunks = [];
            
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            
            res.on("end", function () {
                var result = Buffer.concat(chunks).toString();
                resolve(JSON.parse(result));
            });
        });
            
        req.write(
            JSON.stringify({ 
                SetupId: 'EVO US_CC',
                Type: 'Sale',
                Amount: 1,
                Currency: 'USD',
                Card: {
                    Account: '4111111111111111',
                    ExpDate: '0530',
                    CardHolder: { FirstName: 'John', LastName: 'Doe' }
                }
            })
        );
        req.end();
    })
};

let processTransaction = async (transaction_key) => {
    return new Promise((resolve, reject)=>{
        var options = {
            "method": "GET",
            "hostname": "sandbox.payfabric.com",
            "port": null,
            "path": "/payment/api/transaction/process/"+transaction_key+"?cvc=123",
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
                resolve(body.toString());
            });
        });
            
        req.end();
    });
    
};

let performTransaction = async() => {
    let transaction_key = await createTransaction();
    console.log("Transaction Created :");
    console.log("Transaction Key : ", transaction_key.Key);
    let result = await processTransaction(transaction_key.Key);
    console.log("Transaction has been processed :");
    result = JSON.parse(result);
    console.log(result);
};
performTransaction();
