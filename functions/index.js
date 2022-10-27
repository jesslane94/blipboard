const functions = require("firebase-functions");
const admin = require('firebase-admin');

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello world!");
});

exports.getBlips = functions.https.onRequest((req, res) => {
  admin.firestore().collection('blips').get()
    .then((data) => {
      let blips = [];
      data.forEach((doc) => {
        blips.push(doc.data());
      });
      return res.json(blips);
    })
    .catch((err) => console.error(err));
});