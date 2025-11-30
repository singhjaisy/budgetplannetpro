import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  // Sign up new user
  const signup = (email, password, name) => {
    // Get existing users
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      throw new Error('User with this email already exists')
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      createdAt: new Date().toISOString()
    }

    // Store user (in a real app, password would be hashed)
    users.push({
      ...newUser,
      password // In production, this should be hashed!
    })

    localStorage.setItem('users', JSON.stringify(users))
    
    // Set as current user
    setCurrentUser(newUser)
    localStorage.setItem('currentUser', JSON.stringify(newUser))
    
    return newUser
  }

  // Login user
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.email === email && u.password === password)

    if (!user) {
      throw new Error('Invalid email or password')
    }

    // Remove password before setting current user
    const { password: _, ...userWithoutPassword } = user
    setCurrentUser(userWithoutPassword)
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))
    
    return userWithoutPassword
  }

  // Logout user
  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('currentUser')
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

