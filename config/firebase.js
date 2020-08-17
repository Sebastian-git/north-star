<<<<<<< HEAD
// Initialize global variables
=======
// Adding global variables
>>>>>>> 39ca7436df5d534e1fcd9be58c1e013ef1ce5988
const app = require('firebase/app')
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

class Firebase {
    constructor() {
        app.initializeApp(config)
        this.auth = app.auth()
        this.db = app.firestore()
    }

<<<<<<< HEAD
    // Firebase's auth API
=======
// Auth API
>>>>>>> 39ca7436df5d534e1fcd9be58c1e013ef1ce5988
    doCreateUserWithEmailAndPassword = (email, password) => {
        return this.auth.createUserWithEmailAndPassword(email, password)
    }

<<<<<<< HEAD
    // Firebase's user API
=======
// User API
>>>>>>> 39ca7436df5d534e1fcd9be58c1e013ef1ce5988
    doCreateUser = (id, user) => {
        return this.db.collection('users').doc(id).set(user);
    }

    doGetUser = id => {
        return this.db.collection('users').doc(id).get()
    }
}

const firebase = new Firebase()
module.exports = firebase