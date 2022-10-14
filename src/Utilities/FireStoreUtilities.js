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
 * Add weight entry in Firestore
 * @param _userId The ID of the user to add the weightEntry for
 * @param _weightDate The date of the weight entry
 * @param _weightValue The value of the weight entry
 */
export async function addWeightEntry(_weightDate, _weightValue, _userId) {
  const userRef = doc(getFirestore(), "users", _userId);
  const docSnap = await getDoc(userRef);

  const newWeightEntry = { date: _weightDate, weight: _weightValue };

  const newWeightEntryList = [...docSnap.data().weightEntries, newWeightEntry];
  await updateDoc(userRef, { weightEntries: newWeightEntryList });
}

/**
 * Add calorie entry in Firestore
 * @param _userId The ID of the user to add the calorie entry for
 * @param _calorieEntryObject The calorie entry object to add
 */
export async function addCalorieEntry(_calorieEntryObject, _userId) {
  const userRef = doc(getFirestore(), "users", _userId);
  const docSnap = await getDoc(userRef);

  const newCalorieEntryList = [
    ...docSnap.data().calorieEntries,
    _calorieEntryObject,
  ];

  await updateDoc(userRef, { calorieEntries: newCalorieEntryList });
}

/**
 * Add active diet to firestore
 * @param _userId The ID of the user to add the active diet for
 * @param _activeDietObject The calorie entry object to add
 */
export async function addActiveDiet(_activeDietObject, _userId) {
  const userRef = doc(getFirestore(), "users", _userId);

  await updateDoc(userRef, { activeDiet: _activeDietObject });
  await updateDoc(userRef, { hasActiveDiet: true });
}

/**
 * Add goal weight to firestore
 * @param _userId The ID of the user to add the active diet for
 * @param _goalWeight The calorie entry object to add
 */
export async function addGoalWeight(_goalWeight, _userId) {
  const userRef = doc(getFirestore(), "users", _userId);

  await updateDoc(userRef, { goalWeight: _goalWeight });
}

/**
 * Add exercise entry in Firestore
 * @param _userId The ID of the user to add the exercise entry for
 * @param _exerciseEntryObject The exercise entry object to add
 */
export async function addExerciseEntry(_exerciseEntryObject, _userId) {
  const userRef = doc(getFirestore(), "users", _userId);
  const docSnap = await getDoc(userRef);

  const newExerciseEntryList = [
    ...docSnap.data().exerciseEntries,
    _exerciseEntryObject,
  ];

  await updateDoc(userRef, { exerciseEntries: newExerciseEntryList });
}

/**
 * Retrieves list of weight entries for a given user
 * @param _userId The ID of the user to retrieve weight entries for
 * @return The weight entries for a given user
 */
export async function getWeightEntryList(_userId) {
  const userRef = doc(getFirestore(), "users", _userId);
  const docSnap = await getDoc(userRef);

  return docSnap.data().weightEntries;
}

/**
 * Retrieves list of calorie entries for a given user
 * @param _userId The ID of the user to retrieve calorie entries for
 * @return The calorie entries for a given user
 */
export async function getCalorieEntryList(_userId) {
  const userRef = doc(getFirestore(), "users", _userId);
  const docSnap = await getDoc(userRef);

  return docSnap.data().calorieEntries;
}

/**
 * Retrieves list of exercise entries for a given user
 * @param _userId The ID of the user to retrieve exercise entries for
 * @return The exercise entries for a given user
 */
export async function getExerciseEntryList(_userId) {
  const userRef = doc(getFirestore(), "users", _userId);
  const docSnap = await getDoc(userRef);

  return docSnap.data().exerciseEntries;
}

/**
 * Retrieves the active diet
 * @param _userId The ID of the user to retrieve active diet for
 * @return The active diet
 */
export async function getActiveDiet(_userId) {
  const userRef = doc(getFirestore(), "users", _userId);
  const docSnap = await getDoc(userRef);

  return docSnap.data().activeDiet;
}

/**
 * Retrieves the boolean for if the user has an active diet
 * @param _userId The ID of the user to check the active diet for
 * @return Has the user got an active diet
 */
export async function hasActiveDiet(_userId) {
  const userRef = doc(getFirestore(), "users", _userId);
  const docSnap = await getDoc(userRef);

  return docSnap.data().hasActiveDiet;
}

/**
 * Retrieves the goal weight
 * @param _userId The ID of the user to retrieve the goal weight for
 * @return The goal weight
 */
export async function getGoalWeight(_userId) {
  const userRef = doc(getFirestore(), "users", _userId);
  const docSnap = await getDoc(userRef);

  return docSnap.data().goalWeight;
}

/**
 * Removes a weight entry for a given user
 * @param _userId The ID of the user to remove the weight entry for
 * @param _weightDate The date of the weight entry to remove
 * @param _weightValue The value of the weight entry to remove
 */
export async function removeWeightEntry(_weightDate, _weightValue, _userId) {
  const userRef = doc(getFirestore(), "users", _userId);
  const docSnap = await getDoc(userRef);

  const newWeightEntryList = docSnap
    .data()
    .weightEntries.filter(
      (entry) => entry.date !== _weightDate && entry.weight !== _weightValue
    );

  await updateDoc(userRef, { weightEntries: newWeightEntryList });
}

/**
 * Removes a calorie entry for a given user
 * @param _userId The ID of the user to remove the weight entry for
 * @param _entryToRemove The calorie entry to remove for the given user
 */
export async function removeCalorieEntry(_entryToRemove, _userId) {
  const userRef = doc(getFirestore(), "users", _userId);
  const docSnap = await getDoc(userRef);

  const newCalorieEntryList = docSnap
    .data()
    .calorieEntries.filter(
      (entry) =>
        !(
          entry._selectedDate === _entryToRemove._selectedDate &&
          entry._proteinAmount === _entryToRemove._proteinAmount &&
          entry._nameOfFood === _entryToRemove._nameOfFood &&
          entry._fatAmount === _entryToRemove._fatAmount &&
          entry._carbsAmount === _entryToRemove._carbsAmount &&
          entry._caloriesAmount === _entryToRemove._caloriesAmount
        )
    );

  await updateDoc(userRef, { calorieEntries: newCalorieEntryList });
}

/**
 * Removes an exercise entry for a given user
 * @param _userId The ID of the user to remove the exercise entry for
 * @param _entryToRemove The exercise entry to remove for the given user
 */
export async function removeExerciseEntry(_entryToRemove, _userId) {
  const userRef = doc(getFirestore(), "users", _userId);
  const docSnap = await getDoc(userRef);

  const newExerciseEntryList = docSnap
    .data()
    .exerciseEntries.filter(
      (entry) =>
        !(
          entry._selectedDate === _entryToRemove._selectedDate &&
          entry._nameOfExercise === _entryToRemove._nameOfExercise &&
          entry._caloriesAmount === _entryToRemove._caloriesAmount
        )
    );

  await updateDoc(userRef, { exerciseEntries: newExerciseEntryList });
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
