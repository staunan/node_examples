# Image Upload Example
The Code demonstrate how to upload images to AWS-S3 server and store them in MongoDB as well.

# Flow
First comment the **uploadPictures()** method and uncomment **assignImagesToDB()** and then run the file:
```js
// uploadPictures();
assignImagesToDB();
```
The method **assignImgaesToDB()** reads all the images from the directory **images** and upload the list to **images** collection in MongoDB.
In the second run, comment the **assignImagesToDB()** method and uncomment **uploadPictures()** method.
```js
uploadPictures();
// assignImagesToDB();
```
The method uploadPictures uploads the images to AWS-S3 server and updates the images collection. You can run over and over again for bulk uploading. It will upload only those files which are not uploaded yet.

## Run the Code
To run the code open the terminal go to ImageUpload directory and run the following command:
```js
node image_upload.js
```