
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "hamsterwarsiths",
        "private_key": process.env.FB_ADMIN_KEY.replace(/\\n/g, '\n'),
        "client_email": process.env.FB_CLIENT_EMAIL,
        "client_id": "114671624810368348829",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-dwzfe%40hamsterwarsiths.iam.gserviceaccount.com"
    }),
    databaseURL: process.env.DB_URL,
    storageBucket: process.env.STORAGE_BUCKET

});

const db = admin.firestore();
const storage = admin.storage();
module.exports = { db, storage };

