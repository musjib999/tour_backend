import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp();

import { Storage } from "@google-cloud/storage";

export const db = admin.firestore();
export const https = functions.region('us-central1').https;
export const baseUrl = 'http://localhost:9199/v0/b'
export const bucket = admin.storage().bucket();
export const storage = functions.storage;
export const gsc = new Storage();

export function timestamp(): FirebaseFirestore.FieldValue {
    return admin.firestore.FieldValue.serverTimestamp();
}

export const print = (value: string) => {
    console.log(value);
}