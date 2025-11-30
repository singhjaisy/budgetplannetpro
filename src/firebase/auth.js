import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from './config'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from './config'

// Sign up new user
export const signup = async (email, password, name) => {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email,
      name,
      createdAt: new Date().toISOString()
    })

    return {
      id: user.uid,
      email,
      name
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

// Login user
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid))
    const userData = userDoc.data()

    return {
      id: user.uid,
      email: user.email,
      name: userData?.name || 'User'
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

// Logout user
export const logout = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    throw new Error(error.message)
  }
}

// Listen to auth state changes
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      const userData = userDoc.data()
      
      callback({
        id: user.uid,
        email: user.email,
        name: userData?.name || 'User'
      })
    } else {
      callback(null)
    }
  })
}

