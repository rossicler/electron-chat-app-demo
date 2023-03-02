import db from "../db/firestore";
import firebase from "firebase/app";
import "firebase/auth";

const createUserProfile = async (userProfile) => {
  await db.collection("profiles").doc(userProfile.uid).set(userProfile);
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
    const userProfile = {
      uid: user.uid,
      username,
      email,
      avatar,
      joinedChats: [],
    };
    await createUserProfile(userProfile);
    return userProfile;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const login = async (formData) => {
  const { user } = await firebase
    .auth()
    .signInWithEmailAndPassword(formData.email, formData.password);
  const userProfile = await getUserProfile(user.uid);
  return userProfile;
};

export const logout = () => firebase.auth().signOut();

export const onAuthStateChanged = (onAuth) =>
  firebase.auth().onAuthStateChanged(onAuth);
