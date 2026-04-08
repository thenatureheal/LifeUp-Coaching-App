import { db } from '../firebase';
import { collection, doc, setDoc, getDoc, getDocs, addDoc, query, where, orderBy, serverTimestamp } from 'firebase/firestore';

// ===== Users =====
export const getUserProfile = async (uid) => {
  const docRef = doc(db, 'users', uid);
  const snap = await getDoc(docRef);
  return snap.exists() ? snap.data() : null;
};

export const updateUserProfile = async (uid, data) => {
  const docRef = doc(db, 'users', uid);
  await setDoc(docRef, { ...data, updatedAt: serverTimestamp() }, { merge: true });
};

// ===== Children =====
export const getChildren = async (userId) => {
  const q = query(collection(db, 'children'), where('userId', '==', userId));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addChild = async (userId, childData) => {
  const docRef = await addDoc(collection(db, 'children'), {
    userId,
    ...childData,
    createdAt: serverTimestamp()
  });
  return docRef.id;
};

// ===== Diary & Goals =====
export const getDiaryEntries = async (childId) => {
  const q = query(collection(db, 'diary'), where('childId', '==', childId), orderBy('date', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addDiaryEntry = async (childId, entryData) => {
  const docRef = await addDoc(collection(db, 'diary'), {
    childId,
    ...entryData,
    createdAt: serverTimestamp()
  });
  return docRef.id;
};
