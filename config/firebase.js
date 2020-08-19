// Initialize global variables
const app = require('firebase/app');
const { ifError } = require('assert');
require('firebase/auth')
require('firebase/firestore')

const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
} 

var userEmail = "no user";

class Firebase {
    constructor() {
        app.initializeApp(config)
        this.auth = app.auth()
        this.db = app.firestore()
        this.auth.onAuthStateChanged(function(user) {
            if (user) {
                userEmail = user.email
            } else {
            }
        });
    }

    // Firebase's auth API
    doCreateUserWithEmailAndPassword = (email, password) => {
        return this.auth.createUserWithEmailAndPassword(email, password)
    }

    // Firebase's user API
    doCreateUser = (id, user) => {
        return this.db.collection('users').doc(id).set(user);
    }

    doGetUser = id => {
        return this.db.collection('users').doc(id).get()
    }

    // Firebase API to sign in
    doSignInWithEmailAndPassword = (email, password) => {
        return this.auth.signInWithEmailAndPassword(email, password)
    }

    doSaveFireball = id => {
        if (userEmail) {
            return this.db
            .collection('fireballs').doc(userEmail)
            .set(
                {fireball: app.firestore.FieldValue.arrayUnion(id)},
                {merge: true}
            );
        }
    }

    doGetFireball = email => {
        return this.db.collection("fireballs").doc(email).get();
    }
}

const firebase = new Firebase()
module.exports = firebase