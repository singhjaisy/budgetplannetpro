import { 
  collection, 
  doc, 
  addDoc, 
  deleteDoc, 
  getDocs, 
  query, 
  orderBy,
  onSnapshot 
} from 'firebase/firestore'
import { db } from './config'

// Get user's budget items
export const getBudgetItems = async (userId) => {
  try {
    const itemsRef = collection(db, 'users', userId, 'budgetItems')
    const q = query(itemsRef, orderBy('date', 'desc'))
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error getting budget items:', error)
    throw error
  }
}

// Listen to budget items changes (real-time)
export const subscribeToBudgetItems = (userId, callback) => {
  const itemsRef = collection(db, 'users', userId, 'budgetItems')
  const q = query(itemsRef, orderBy('date', 'desc'))
  
  return onSnapshot(q, (querySnapshot) => {
    const items = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    callback(items)
  }, (error) => {
    console.error('Error subscribing to budget items:', error)
    callback([])
  })
}

// Add budget item
export const addBudgetItem = async (userId, item) => {
  try {
    const itemsRef = collection(db, 'users', userId, 'budgetItems')
    const newItem = {
      ...item,
      date: new Date().toISOString()
    }
    const docRef = await addDoc(itemsRef, newItem)
    return {
      id: docRef.id,
      ...newItem
    }
  } catch (error) {
    console.error('Error adding budget item:', error)
    throw error
  }
}

// Delete budget item
export const deleteBudgetItem = async (userId, itemId) => {
  try {
    await deleteDoc(doc(db, 'users', userId, 'budgetItems', itemId))
  } catch (error) {
    console.error('Error deleting budget item:', error)
    throw error
  }
}

// Import budget items (bulk)
export const importBudgetItems = async (userId, items) => {
  try {
    const itemsRef = collection(db, 'users', userId, 'budgetItems')
    const batch = []
    
    // Note: For large imports, use Firestore batch writes (max 500 per batch)
    for (const item of items) {
      const { id, ...itemData } = item
      batch.push(addDoc(itemsRef, itemData))
    }
    
    await Promise.all(batch)
  } catch (error) {
    console.error('Error importing budget items:', error)
    throw error
  }
}

