import * as admin from "firebase-admin";

admin.initializeApp();

export const baseUrl = 'http://localhost:9199/v0/b'
export const bucket = admin.storage().bucket(); 

export const print = (value: string) => {
    console.log(value);
}