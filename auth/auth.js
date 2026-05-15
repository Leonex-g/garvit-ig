import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Firebase config — public keys, safe to be in JS files
// These are identifiers, NOT secret keys. Real security is enforced via Firebase Rules.
const firebaseConfig = {
  apiKey:            "AIzaSyDcvei08yjpiaAwRleqE_OkzpSTIchA4kI",
  authDomain:        "garvit-social.firebaseapp.com",
  projectId:         "garvit-social",
  storageBucket:     "garvit-social.firebasestorage.app",
  messagingSenderId: "111848124141",
  appId:             "1:111848124141:web:976573163886c5c53326e4"
};

const app      = initializeApp(firebaseConfig);
const auth     = getAuth(app);
const provider = new GoogleAuthProvider();

// Force account picker every time
provider.setCustomParameters({ prompt: "select_account" });

// DOM refs
const loggedOut  = document.getElementById("loggedOut");
const loggedIn   = document.getElementById("loggedIn");
const userAvatar = document.getElementById("userAvatar");
const userName   = document.getElementById("userName");
const loginBtn   = document.getElementById("loginBtn");
const logoutBtn  = document.getElementById("logoutBtn");

// Auth state
onAuthStateChanged(auth, (user) => {
  if (user) {
    loggedOut.style.display = "none";
    loggedIn.style.display  = "flex";
    userName.textContent    = user.displayName || "User";
    if (user.photoURL) {
      userAvatar.src          = user.photoURL;
      userAvatar.style.display = "block";
    } else {
      userAvatar.style.display = "none";
    }
  } else {
    loggedOut.style.display = "flex";
    loggedIn.style.display  = "none";
  }
});

// Login
loginBtn.addEventListener("click", () => {
  signInWithPopup(auth, provider).catch((err) => {
    // Common errors
    if (err.code === "auth/popup-blocked") {
      alert("Popup was blocked by your browser. Please allow popups for this site and try again.");
    } else if (err.code === "auth/unauthorized-domain") {
      alert("This domain is not authorized in Firebase. Please add it under Authentication → Settings → Authorized Domains.");
    } else {
      console.error("Login error:", err.message);
    }
  });
});

// Logout
logoutBtn.addEventListener("click", () => {
  signOut(auth).catch(console.error);
});