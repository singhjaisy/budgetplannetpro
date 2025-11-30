import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './App.css'
import { useAuth } from './context/AuthContext'
import { FaWallet, FaSignOutAlt } from 'react-icons/fa'
import { HiHand } from 'react-icons/hi'
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

  // Load user-specific items from localStorage
  useEffect(() => {
    if (currentUser) {
      const savedItems = localStorage.getItem(`budgetItems_${currentUser.id}`)
      if (savedItems) {
        setItems(JSON.parse(savedItems))
      } else {
        setItems([])
      }
    } else {
      setItems([])
    }
  }, [currentUser])

  // Save user-specific items to localStorage
  useEffect(() => {
    if (currentUser && items.length >= 0) {
      localStorage.setItem(`budgetItems_${currentUser.id}`, JSON.stringify(items))
    }
  }, [items, currentUser])

  const addItem = (item) => {
    const newItem = {
      id: Date.now().toString(),
      ...item,
      date: new Date().toISOString()
    }
    setItems([...items, newItem])
  }

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  const importItems = (importedItems) => {
    setItems(importedItems)
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
