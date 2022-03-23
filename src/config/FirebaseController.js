import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { addDoc, collection, getDocs, getFirestore, query, orderBy, limit, onSnapshot } from "firebase/firestore";
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
//ordered query
const q = query(tweetsDB, orderBy('date', 'desc'), limit(10));


const auth = getAuth();

const APIController = {

  signup: async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  login: async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredential.user, 'logged in')
    return userCredential.user;
  },

  updateDisplayName: async (newName) => {
    await updateProfile(auth.currentUser, {
      displayName: newName, //photoURL:'someurl'
    });
    //console.log(auth.currentUser.uid)
  },

  uploadPhoto: async (uploadPath, imageFile) => {
    const storageRef = ref(projectStorage, uploadPath);
    await uploadBytes(storageRef, imageFile).then((snapshot) => {
      console.log('Uploaded a file!');
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

  getAllTweets: async () => {
    const querySnapshot = await getDocs(q);
    const tweets = [];
    querySnapshot.forEach((doc) => {
      tweets.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return tweets;
  },

  addNewTweet: async ({ content, displayName, date, photoURL }) => {
    const docRef = await addDoc(tweetsDB, {
      content,
      displayName,
      date,
      photoURL
    });
  },
}

export default APIController;
