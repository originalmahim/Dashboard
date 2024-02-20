import { initializeApp } from "firebase/app";

const firebaseConfig = {
          apiKey: "AIzaSyC4GE-lsj2Zaf-hjEw-JJmYo4PwELOXza4",
          authDomain: "bdandalib.firebaseapp.com",
          projectId: "bdandalib",
          storageBucket: "bdandalib.appspot.com",
          messagingSenderId: "420154143222",
          appId: "1:420154143222:web:25aa397aeda7e0421fd7d7"
};

const app = initializeApp(firebaseConfig);
export default app;