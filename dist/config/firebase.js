"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.db = exports.auth = void 0;
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
// import {getAnalytics} from "firebase/analytics";
const expo_constants_1 = __importDefault(require("expo-constants"));
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
const storage_1 = require("firebase/storage");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
    apiKey: expo_constants_1.default.manifest.extra.apiKey,
    authDomain: expo_constants_1.default.manifest.extra.authDomain,
    projectId: expo_constants_1.default.manifest.extra.projectId,
    storageBucket: expo_constants_1.default.manifest.extra.storageBucket,
    messagingSenderId: expo_constants_1.default.manifest.extra.messagingSenderId,
    appId: expo_constants_1.default.manifest.extra.appId,
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