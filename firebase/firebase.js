var admin = require('firebase-admin');
var serviceAccount = require('./congressos-ser-educacional-firebase-adminsdk-h98t9-c1f88ff95f.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "congressos-ser-educacional.appspot.com"
});

var db = admin.firestore();
var bucket = admin.storage().bucket();

exports.firestore = db;
exports.bucket = bucket;
