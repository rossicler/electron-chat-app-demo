import db from "../db/firestore";
import firebase from "firebase/app";

const extractSnapshotData = (snapshot) => {
  const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return items.map((item) => {
    return {
      ...item,
      admin: item.admin.path,
      joinedUsers: item.joinedUsers.map((user) => user.id),
    };
  });
};

export const fetchChats = async () =>
  db.collection("chats").get().then(extractSnapshotData);

export const createChat = (chat) =>
  db
    .collection("chats")
    .add(chat)
    .then((docRef) => docRef.id);

export const joinChat = async (userId, chatId) => {
  const userRef = db.doc(`profiles/${userId}`);
  const chatRef = db.doc(`chats/${chatId}`);

  await userRef.update({
    joinedChats: firebase.firestore.FieldValue.arrayUnion(chatRef),
  });
  await chatRef.update({
    joinedUsers: firebase.firestore.FieldValue.arrayUnion(userRef),
  });
};

export const subscribeToChat = (chatId, onSubscribe) =>
  db
    .collection("chats")
    .doc(chatId)
    .onSnapshot((doc) => {
      const chat = { id: doc.id, ...doc.data() };
      onSubscribe(chat);
    });

export const subscribeToProfile = (uid, onSubscribe) =>
  db
    .collection("profiles")
    .doc(uid)
    .onSnapshot((doc) => onSubscribe(doc.data()));

export const sendChatMessaage = (message, chatId) =>
  db
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .doc(message.timestamp)
    .set(message);

export const subscribeToMessages = (chatId, onSubscribe) =>
  db
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .onSnapshot((snapshot) => onSubscribe(snapshot.docChanges()));
