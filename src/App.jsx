import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './App.css'
import { useAuth } from './context/AuthContext'
import { FaWallet, FaSignOutAlt } from 'react-icons/fa'
import { HiHand } from 'react-icons/hi'
import { 
  subscribeToBudgetItems, 
  addBudgetItem as firebaseAddItem, 
  deleteBudgetItem as firebaseDeleteItem,
  importBudgetItems as firebaseImportItems
} from './firebase/budgetItems'
import BudgetSummary from './components/BudgetSummary'
import BudgetForm from './components/BudgetForm'
import BudgetList from './components/BudgetList'
import DataExport from './components/DataExport'
import BudgetCharts from './components/BudgetCharts'
import Login from './components/Login'
import Signup from './components/Signup'

function App() {
  const { currentUser, logout, loading } = useAuth()
  const [items, setItems] = useState([])
  const [showSignup, setShowSignup] = useState(false)

  // Subscribe to budget items from Firebase (real-time updates)
  useEffect(() => {
    if (currentUser) {
      const unsubscribe = subscribeToBudgetItems(currentUser.id, (items) => {
        setItems(items)
      })

      // Cleanup subscription on unmount or user change
      return () => unsubscribe()
    } else {
      setItems([])
    }
  }, [currentUser])

  const addItem = async (item) => {
    if (!currentUser) return
    
    try {
      await firebaseAddItem(currentUser.id, item)
      // Items will update automatically via subscription
    } catch (error) {
      console.error('Error adding item:', error)
      alert('Failed to add item. Please try again.')
    }
  }

  const deleteItem = async (id) => {
    if (!currentUser) return
    
    try {
      await firebaseDeleteItem(currentUser.id, id)
      // Items will update automatically via subscription
    } catch (error) {
      console.error('Error deleting item:', error)
      alert('Failed to delete item. Please try again.')
    }
  }

  const importItems = async (importedItems) => {
    if (!currentUser) return
    
    try {
      await firebaseImportItems(currentUser.id, importedItems)
      // Items will update automatically via subscription
    } catch (error) {
      console.error('Error importing items:', error)
      alert('Failed to import items. Please try again.')
    }
  }

  const income = items
    .filter(item => item.type === 'income')
    .reduce((sum, item) => sum + parseFloat(item.amount || 0), 0)

  const expenses = items
    .filter(item => item.type === 'expense')
    .reduce((sum, item) => sum + parseFloat(item.amount || 0), 0)

  const balance = income - expenses

  // Show loading state
  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  // Show login/signup if not authenticated
  if (!currentUser) {
    return (
      <div className="app">
      <motion.header 
        className="app-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>
          <FaWallet className="header-icon" />
          Budget Planner Pro
        </h1>
        <p>Take control of your finances</p>
      </motion.header>
        {showSignup ? (
          <Signup onSwitchToLogin={() => setShowSignup(false)} />
        ) : (
          <Login onSwitchToSignup={() => setShowSignup(true)} />
        )}
      </div>
    )
  }

  // Show main app if authenticated
  return (
    <div className="app">
      <motion.header 
        className="app-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-content">
          <div>
            <h1>
              <FaWallet className="header-icon" />
              Budget Planner Pro
            </h1>
            <p>
              Welcome back, {currentUser.name}! 
              <HiHand className="wave-icon" />
            </p>
          </div>
          <motion.button 
            onClick={logout} 
            className="logout-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSignOutAlt className="logout-icon" />
            Logout
          </motion.button>
        </div>
      </motion.header>

      <BudgetSummary income={income} expenses={expenses} balance={balance} />

      <div className="app-content">
        <div className="form-section">
          <BudgetForm onAdd={addItem} />
          <DataExport items={items} onImport={importItems} />
        </div>

        <div className="list-section">
          <BudgetList items={items} onDelete={deleteItem} />
        </div>
      </div>

      <BudgetCharts items={items} />
    </div>
  )
}

export default App
