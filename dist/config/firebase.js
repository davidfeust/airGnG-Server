"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.db = exports.auth = void 0;
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
// import {getAnalytics} from "firebase/analytics";
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
const storage_1 = require("firebase/storage");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
};
// // Initialize Firebase
const app = (0, app_1.initializeApp)(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = (0, auth_1.getAuth)();
exports.auth = auth;
const db = (0, firestore_1.getFirestore)();
exports.db = db;
const storage = (0, storage_1.getStorage)();
exports.storage = storage;
//# sourceMappingURL=firebase.js.map