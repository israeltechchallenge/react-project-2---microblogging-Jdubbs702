import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { addDoc, collection, getDocs, getFirestore, query, orderBy, limit, onSnapshot, startAfter } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB5Pk1C8UwkSHNp08a9AyKhdTERGxq2Scc",
  authDomain: "tweeter-c02b8.firebaseapp.com",
  projectId: "tweeter-c02b8",
  storageBucket: "tweeter-c02b8.appspot.com",
  messagingSenderId: "339484820051",
  appId: "1:339484820051:web:b2fb0655770bb57bc77ca6",
  measurementId: "G-PRKYYPHJMV"
};
//init firebase app
const app = initializeApp(firebaseConfig);
//init services
const db = getFirestore(app);
const tweetsDB = collection(db, 'tweets');
const projectStorage = getStorage();
const provider = new GoogleAuthProvider();
const auth = getAuth();

//queries
const q = query(tweetsDB, orderBy('date', 'desc'), limit(10));

const APIController = {

  signup: async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  login: async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  loginWGoogle: async () => {
     signInWithPopup(auth, provider);
  },

  updateDisplayName: async (newName) => {
    await updateProfile(auth.currentUser, {
      displayName: newName,
    });
  },

  uploadPhoto: async (uploadPath, imageFile) => {
    const storageRef = ref(projectStorage, uploadPath);
    await uploadBytes(storageRef, imageFile).then((snapshot) => {
    });
  },

  downloadPhoto: async (path, setPhotoURL) => {
    await getDownloadURL(ref(projectStorage, path))
      .then((url) => {
        updateProfile(auth.currentUser, {
          photoURL: url,
        });
        setPhotoURL(url);
      })
      .catch((error) => {
        console.log(error)
      });
  },

  signout: async () => {
    await signOut(auth);
  },

  observeTweets: (callback) => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tweets = [];
      querySnapshot.forEach((doc) => {
        tweets.push(doc.data());
      });
      callback(tweets);
    });
    return unsubscribe;
  },

  observeAuthState: (callback) => {
    onAuthStateChanged(auth, (user) => {
      callback(user);
    });
  },

  getTweets: async (setIsEmpty, setLastDoc) => {
    const querySnapshot = await getDocs(q);
    const isCollectionEmpty = querySnapshot.size === 0;
    const tweets = [];
    if (isCollectionEmpty) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
      querySnapshot.forEach((doc) => {
        tweets.push({
          id: doc.id,
          ...doc.data()
        });
      });
      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastDoc(lastDoc);
    }
    return tweets;
  },

  fetchMore: async (setIsEmpty, setLastDoc, lastDoc) => {
    const nextQ = query(tweetsDB, orderBy('date', 'desc'), startAfter(lastDoc), limit(10));
    const querySnapshot = await getDocs(nextQ);
    const isCollectionEmpty = querySnapshot.size === 0;
    const tweets = [];
    if (isCollectionEmpty) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
      querySnapshot.forEach((doc) => {
        tweets.push({
          id: doc.id,
          ...doc.data()
        });
      });
      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastDoc(lastDoc);
    }
    return tweets;
  },

  addNewTweet: async ({ content, displayName, date, photoURL, userID }) => {
    await addDoc(tweetsDB, {
      content,
      displayName,
      date,
      photoURL,
      userID
    });
  },
}

export default APIController;
