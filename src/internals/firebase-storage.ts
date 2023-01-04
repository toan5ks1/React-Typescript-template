import FirebaseStorage from "../packages/firebase/Storage";
import firebaseApp from "./firebase-app";

const firebaseStorage = new FirebaseStorage(firebaseApp.getInstance());

export default firebaseStorage;
