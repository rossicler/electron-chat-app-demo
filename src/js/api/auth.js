import db from "../db/firestore";
import firebase from "firebase/app";
import "firebase/auth";

const createUserProfile = (userProfile) => {
  db.collection("profiles").doc(userProfile.uid).set(userProfile);
};

export const getUserProfile = (uid) =>
  db
    .collection("profiles")
    .doc(uid)
    .get()
    .then((snapshot) => snapshot.data());

export const register = async ({ email, password, username, avatar }) => {
  try {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    await createUserProfile({
      uid: user.uid,
      username,
      email,
      avatar,
      joinedChats: [],
    });
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const login = (formData) =>
  firebase.auth().signInWithEmailAndPassword(formData.email, formData.password);

export const logout = () => firebase.auth().signOut();

export const onAuthStateChanged = (onAuth) =>
  firebase.auth().onAuthStateChanged(onAuth);
