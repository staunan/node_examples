var http = require("https");
var axios = require("axios");
require('dotenv').config();

const DEVICE_ID = process.env.DEVICE_ID;
const DEVICE_PASSWORD = process.env.DEVICE_PASSWORD;

let payload = {
    "Currency": "USD",
    "Amount": 20,
    "DocumentAmount": 20,
    "TaxAmount": "1.5", 
    "CustomerNumber": "AARONFIT0001", 
    "CustomerName": "Santanu Bera", 
    "IsMultipleInvoice": false, 
    "DocumentNumber": "nft_internal_id", 
    "DocDate": "11/4/2022 13:02:09 PM",
    "TransactionType": "Sale",
    "PostDataType": "CashReceipt",
    "DocType": "3",
    "Status": "1",
    "ShippingAddress": {
        "Address1": "123 Test Street", 
        "Address2": "12 Test Street", 
        "Address3": "1 Test Street", 
        "Email": "customer@gmail.com", 
        "City": "CA", 
        "State": "CA", 
        "Country": "USA", 
        "Zip": "721151", 
        "Phone1": "8617888454", 
    }, 
    "BillingAddress": {
        "Address1": "line 12", 
        "Address2": "liner r3", 
        "Address3": "line 3", 
        "Email": "customer@gmail.com", 
        "City": "CA", 
        "State": "CA", 
        "Country": "US", 
        "Zip": "721151", 
        "Phone1": "8617888454"
    }, 
    "Notification": {
        "Type": "SMS", 
        "SMSTemplate": "!!!Your Payment has been received!!!", 
        "EmailTemplate": null
    },
    "NotificationPhone": "8617888454",
    "UserDefinedFields": [
        {
            "Key": "SubTotal", 
            "Value": "20"
        }
    ],
    "Payment": {
        "CreditCardGateway": "EVO US_CC",
        "AcceptType": 1
    },    
    "CustomeMessage": "Test Custom Message",
    "ReturnUrl": "http://localhost:8080/checkout",
};

function create_paylink(){
    var options = {
      "method": "POST",
      "hostname": "sandbox.payfabric.com",
      "port": null,
      "path": "/paylink/api/document",
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
          var body = Buffer.concat(chunks).toString();
          console.log(JSON.parse(body));
      });
    });

    req.write(JSON.stringify(payload));
      
    req.end();
}
create_paylink();