// Handle all imports
const app = require("firebase/app");
require("firebase/auth");

// Config firebase using .env variables
const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
  };

  // New firebase class begins the firebase server
  class Firebase {
      constructor() {
          app.initializeApp(config);
          this.auth = app.auth();
      }
  }

  const firebase = new Firebase();

  module.exports = firebase;