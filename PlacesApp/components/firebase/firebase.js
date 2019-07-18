import app from 'firebase/app';
import 'firebase/auth';

let config = {
    apiKey: "AIzaSyDW_k49x7CLOeS1MAhPXRVoeUyPMswaBKg",
    authDomain: "places-app-b905c.firebaseapp.com",
    databaseURL: "https://places-app-b905c.firebaseio.com",
    projectId: "places-app-b905c",
    storageBucket: "",
    messagingSenderId: "388895909005",
    appId: "1:388895909005:web:467618b1f1594c8b"
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
    }

    // *** Auth API ***
    doCreateUserWithEmailAndPasswordAndUsername = (email, password, username) => {
        console.log(this.auth)
        this.auth.createUserWithEmailAndPassword(email, password).then(authUser => {
            console.log(this.auth)
            this.auth.currentUser.updateProfile({
                displayName: username,
            })
        });
    }

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    getCurrentUser = () => this.auth.currentUser;

}

export default Firebase;