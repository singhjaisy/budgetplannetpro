import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxYxnWcLjetM0LsnFbKhEMSfSUOkEZRjc",
  authDomain: "budget-planner-pro-ba287.firebaseapp.com",
  projectId: "budget-planner-pro-ba287",
  storageBucket: "budget-planner-pro-ba287.firebasestorage.app",
  messagingSenderId: "1013991949480",
  appId: "1:1013991949480:web:717c1e0bff3576de4f2e9d",
  measurementId: "G-0Z47X1ZELQ"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)

// Initialize Analytics (only in browser environment)
let analytics = null
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app)
}
export { analytics }

export default app
