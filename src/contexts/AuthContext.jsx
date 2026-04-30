import React, { createContext, useContext, useState, useEffect } from 'react';

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

  // 이메일 로그인 (Spring Boot /login API 호출)
  async function login(email, password) {
    // 실제로는 Spring Security form login 또는 /api/auth/login을 사용
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: email, password })
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    await fetchCurrentUser();
    return true;
  }

  // 로그아웃 (Spring Boot /logout API 호출)
  async function logout() {
    await fetch('/logout', { method: 'POST' });
    setCurrentUser(null);
    setUserData(null);
  }

  // 현재 유저 정보 가져오기
  async function fetchCurrentUser() {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        setCurrentUser({ uid: data.uid, email: data.email });
        setUserData(data);
      } else {
        setCurrentUser(null);
        setUserData(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setCurrentUser(null);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const value = {
    currentUser,
    userData,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
