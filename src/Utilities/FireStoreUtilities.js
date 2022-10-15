import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  doc,
  getFirestore,
  setDoc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

/**
 * Adds user to Firestore
 * @param _userId The ID of the user to add to firestore database.
 * @param _displayName The display name of the new user
 */
export async function addUser(_userId) {
  const auth = getAuth();
  await setDoc(doc(getFirestore(), "users", _userId), {
    userId: _userId,
    displayName: auth.currentUser.displayName,
    friendsList: [],
  });
}

/**
 * Checks if user exists in Firestore
 * @param _userId The ID of the user to check the database for
 * @return True if user exists & false if not
 */
export async function getUser(_userId) {
  const docRef = await doc(getFirestore(), "users", _userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return true;
  } else {
    return false;
  }
}

/**
 * Return data from given userID
 * @param _userId The ID of the user to retrieve the data from
 * @return User data if it exists, false if not
 */
export async function getUserDataFromUserId(_userId) {
  const querySnapshot = await getDocs(collection(getFirestore(), "users"));

  let exists = false;

  querySnapshot.forEach((doc) => {
    if (doc.data().userid === _userId) {
      exists = {
        userID: doc.data().userid,
        userDisplayName: doc.data().displayname,
        userContactList: doc.data().contactlist,
      };
      return exists;
    }
  });

  return exists;
}

/**
 * Check if display name is already taken
 * @param _displayName The displayname to check
 * @return boolean, does the username already exist
 */
export async function checkDisplayName(_displayName) {
  const querySnapshot = await getDocs(collection(getFirestore(), "users"));

  let exists = false;

  querySnapshot.forEach((doc) => {
    if (doc.data().displayName === _displayName) {
      exists = true;
      return exists;
    }
  });

  return exists;
}

/**
 * Delete user data from database
 * @param _userId The ID of the user to delete from database
 */
export async function deleteUser(_userId, email, password) {
  const user = getAuth().currentUser;
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password).then(() => {
    //Reauthenticated, delete user account
    deleteDoc(doc(getFirestore(), "users", _userId)).then(() => {
      user.delete().then();
    });
  });
}

export async function searchForUser(_displayName) {
  const querySnapshot = await getDocs(collection(getFirestore(), "users"));

  let exists = false;

  querySnapshot.forEach((doc) => {
    if (doc.data().displayName === _displayName) {
      exists = doc.data();
      console.log(exists);
      return exists;
    }
  });

  return exists;
}
