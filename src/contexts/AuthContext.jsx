import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 이메일 회원가입
  async function signup(email, password, name, childInfo = null) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // 회원가입 성공 시 Firestore에 기본 프로필 저장
    const userData = {
      uid: userCredential.user.uid,
      email: email,
      name: name,
      createdAt: new Date(),
      settings: {
        pushEnabled: false
      },
      hasAnalysis: false
    };
    if (childInfo) {
      userData.children = [childInfo]; // 첫 번째 자녀 정보 저장
    }
    
    await setDoc(doc(db, "users", userCredential.user.uid), userData);
    return userCredential;
  }

  // 이메일 로그인
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // 구글 로그인
  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    
    // 구글 로그인 성공 시, Firestore 문서가 없으면 생성
    const userDocRef = doc(db, "users", userCredential.user.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        name: userCredential.user.displayName || "구글 회원",
        createdAt: new Date(),
        settings: {
          pushEnabled: false
        },
        hasAnalysis: false
      });
    }
    return userCredential;
  }

  // 로그아웃
  function logout() {
    return signOut(auth);
  }

  // 비밀번호 재설정
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            setUserData(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
