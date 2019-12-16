import axios from "axios";
// import firebase from "firebase/app";
// import "firebase/database";

export default axios.create({
  baseURL: "https://daily-quest-255801.firebaseio.com"
});

// this sadly did not work:
/*
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCumpHJHu_cHob8APU8ckGjvj87vtL0tG4",
  authDomain: "daily-quest-255801.firebaseapp.com",
  databaseURL: "https://daily-quest-255801.firebaseio.com",
  projectId: "daily-quest-255801",
  storageBucket: "daily-quest-255801.appspot.com",
  messagingSenderId: "614367436290",
  appId: "1:614367436290:web:e61a97bb560b68860ed11b",
  measurementId: "G-RD0F4V0YWN"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// a reference to the database service
const fireDb = firebase.database();

export const dbSortItemsByProperty = async (objectName, propertyName) => {
  // console.log(fireDb.ref(objectName).orderByChild(propertyName));
  var sortedItems = null;
  await fireDb
    .ref(objectName)
    .orderByChild(propertyName)
    .once("value")
    .then(function(snapshot) {
      sortedItems = snapshot.val();
    });
  //
  console.log(sortedItems);
  return sortedItems;
};
*/
