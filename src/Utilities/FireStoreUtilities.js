import {
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  getFirestore,
  setDoc,
  getDoc,
  getDocs,
  collection,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

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
    bio: "",
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
    if (doc.data().userId === _userId) {
      exists = doc.data();
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
      //console.log(exists);
      return exists;
    }
  });

  return exists;
}

/**
 * Change bio in firestore
 * @param _userId The ID of the user to add the bio for
 * @param _bio The bio to add
 */
export async function changeBio(_userId, _bio) {
  const userRef = doc(getFirestore(), "users", _userId);

  await updateDoc(userRef, { bio: _bio });
}

/**
 * Change display name in firestore
 * @param _userId The ID of the user to change name for
 * @param _name The displayname to change to
 */
export async function changeDisplayName(_userId, _name) {
  const userRef = doc(getFirestore(), "users", _userId);

  await updateDoc(userRef, { displayName: _name });
}

/**
 * Change profile picture
 * @param _userId The ID of the user to change display picture for
 * @param _image The new profile picture
 */
export async function changeProfilePicture(_userId, _image) {
  const storage = getStorage();
  const auth = getAuth();

  // Create the file metadata
  const metadata = {
    contentType: "image/jpeg",
  };

  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, "images/" + _image.name);
  const uploadTask = uploadBytesResumable(storageRef, _image, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      switch (snapshot.state) {
        case "paused":
          break;
        case "running":
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        updateProfile(auth.currentUser, {
          photoURL: downloadURL,
        }).then(window.location.reload());
      });
    }
  );
}
