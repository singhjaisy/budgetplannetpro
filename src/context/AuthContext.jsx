import { createContext, useContext, useState, useEffect } from 'react'
import { signup as firebaseSignup, login as firebaseLogin, logout as firebaseLogout, onAuthStateChange } from '../firebase/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Sign up new user
  const signup = async (email, password, name) => {
    try {
      const user = await firebaseSignup(email, password, name)
      return user
    } catch (error) {
      // Convert Firebase errors to user-friendly messages
      if (error.message.includes('email-already-in-use')) {
        throw new Error('User with this email already exists')
      }
      throw error
    }
  }

  // Login user
  const login = async (email, password) => {
    try {
      const user = await firebaseLogin(email, password)
      return user
    } catch (error) {
      // Convert Firebase errors to user-friendly messages
      if (error.message.includes('user-not-found') || error.message.includes('wrong-password')) {
        throw new Error('Invalid email or password')
      }
      throw error
    }
  }

  // Logout user
  const logout = async () => {
    try {
      await firebaseLogout()
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
    loading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
