// src/context/AuthContext.js
import React, { createContext, useState } from 'react';

// AuthContext oluşturuluyor
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      // localStorage'dan kullanıcı bilgisini al
      const savedUser = localStorage.getItem('user');
      return savedUser && savedUser !== 'undefined' ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Kullanıcı bilgisi okunurken hata oluştu:', error);
      return null;
    }
  });

  const login = async (email, password) => {
    try {
      const loginResponse = await fetch('http://localhost:5079/api/user/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      if (!loginResponse.ok) {
        const errorText = await loginResponse.text();
        console.error('Login yanıtı:', errorText);
        return false;
      }

      const userData = await loginResponse.json();
      
      // Kullanıcının güncel skorunu al
      const userDetailsResponse = await fetch(`http://localhost:5079/api/user/${userData.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (userDetailsResponse.ok) {
        const userDetails = await userDetailsResponse.json();
        // Login yanıtı ile güncel skoru birleştir ve şifreyi çıkar
        const { password, ...userDataWithoutPassword } = userData;
        const completeUserData = {
          ...userDataWithoutPassword,
          score: userDetails.score
        };
        
        setUser(completeUserData);
        localStorage.setItem('user', JSON.stringify(completeUserData));
      } else {
        // Kullanıcı detayları alınamazsa bile temel bilgilerle devam et
        const { password, ...userDataWithoutPassword } = userData;
        setUser(userDataWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userDataWithoutPassword));
      }

      return true;

    } catch (error) {
      console.error('Login hatası:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateScore = async (newScore) => {
    if (user) {
      const updatedUser = { ...user, score: newScore };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateScore }}>
      {children}
    </AuthContext.Provider>
  );
};
