var fs = require('fs');
var aws = require('aws-sdk');
var path = require('path');
const { exit } = require('process');
var MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
var mongoConURL = "mongodb://staunan:27017,staunan:27018,staunan:27019/?replicaSet=rs&readPreference=primary&appname=MongoDB%20Compass&ssl=false";
var dbo = null; // database object
const database_name = "nft_images";
const collection_name = "images";

let s3 = (() => {
	return new aws.S3({
		accessKeyId: process.env.AWS_ACESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
		Bucket: process.env.AWS_BUCKET_NAME,
	});
})();
function uploadPicture(imageName){
	return new Promise(function(resolve, reject){
		fs.readFile("images/" + imageName, function(err, data) {

			let fileName = path.basename(imageName, path.extname(imageName)) + "-" + Date.now() + path.extname(imageName);

			// Setting up S3 upload parameters
		    const params = {
		        Bucket: "zilnft.app",
		        Key: fileName, // File name you want to save as in S3
		        Body: data
		    };

		    // Uploading files to the bucket
		    s3.upload(params, function(err, uploadedImage) {
		        if (err) {
		            resolve({
			        	status: false,
			        	error: err
			        });
		        }
		        resolve({
		        	status: true,
		        	imageURL: uploadedImage.Location
		        });
		    });
		});
	});
}
function updatePicture(imgObj, imagURL){
	return new Promise(function(resolve, reject){
		MongoClient.connect(mongoConURL, function(err, db) {
		  	dbo = db.db(database_name);
		  	let updateData = {"$set" : {"uploaded": true, "imageURL": imagURL}};
		  	dbo.collection(collection_name).updateOne({'_id': imgObj._id}, updateData, function(err, res) {
			    if (err) resolve(false);
			    resolve(true);
			    db.close();
			});
		});
	});
}
function uploadPictures(){
	// Get all the images that are not uploaded --
	MongoClient.connect(mongoConURL, function(err, db) {
	  dbo = db.db(database_name);
	  dbo.collection(collection_name).find({"uploaded": false}).toArray(async function(err, imagesNeedToUpload) {
	    if (err) throw err;
	    console.log("Found " + imagesNeedToUpload.length + " Images");
	    for(let i=0; i<imagesNeedToUpload.length; i++){
			let imageName = imagesNeedToUpload[i].imageName;
			console.log("Uploading : " + imageName);
			let uploadRes = await uploadPicture(imageName);
			if(uploadRes.status){
				console.log("Updating Image : " + imageName);
				await updatePicture(imagesNeedToUpload[i], uploadRes.imageURL);
			}
		}
	    db.close();
	  });
	});
}
uploadPictures();

// ----------------------------------------------------------------------
function assignImagesToDB(){
	fs.readdir("images", async (err, diskPictures) => {

		let diskPicturesObj = [];
		diskPictures.forEach((d)=>diskPicturesObj.push({'imageName' : d, "uploaded": false}));

		MongoClient.connect(mongoConURL, function(err, db) {
		  dbo = db.db(database_name);

		  dbo.collection(collection_name).insertMany(diskPicturesObj, function(err, res) {
		    if (err) throw err;
		    console.log(diskPicturesObj.length + " document inserted");
		    db.close();
		  });
		});
	});
}
// assignImagesToDB();