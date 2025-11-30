import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FaDollarSign, 
  FaMinus, 
  FaPlus, 
  FaFileAlt, 
  FaTag,
  FaCheckCircle 
} from 'react-icons/fa'
import { 
  HiOutlineCurrencyDollar,
  HiOutlineTag,
  HiOutlineDocumentText
} from 'react-icons/hi'

function BudgetForm({ onAdd }) {
  const [type, setType] = useState('expense')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const categories = {
    income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'],
    expense: ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Healthcare', 'Education', 'Other']
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!description.trim() || !amount || parseFloat(amount) <= 0) {
      alert('Please fill in all fields with valid values')
      return
    }

    onAdd({
      type,
      description: description.trim(),
      amount: parseFloat(amount),
      category: category || categories[type][0]
    })

    // Reset form
    setDescription('')
    setAmount('')
    setCategory('')
    
    // Show success animation
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  return (
    <motion.div 
      className="budget-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {type === 'income' ? (
          <><FaPlus className="inline-icon" /> Add Income</>
        ) : (
          <><FaMinus className="inline-icon" /> Add Expense</>
        )}
      </motion.h2>
      
      <form onSubmit={handleSubmit}>
        <motion.div 
          className="form-group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label>Type</label>
          <div className="type-toggle">
            <motion.button
              type="button"
              className={`type-btn ${type === 'income' ? 'active' : ''}`}
              onClick={() => {
                setType('income')
                setCategory('')
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaPlus className="btn-icon" />
              Income
            </motion.button>
            <motion.button
              type="button"
              className={`type-btn ${type === 'expense' ? 'active' : ''}`}
              onClick={() => {
                setType('expense')
                setCategory('')
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaMinus className="btn-icon" />
              Expense
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          className="form-group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label htmlFor="description">
            <HiOutlineDocumentText className="label-icon" />
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            required
          />
        </motion.div>

        <motion.div 
          className="form-group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label htmlFor="amount">
            <HiOutlineCurrencyDollar className="label-icon" />
            Amount ($)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            min="0"
            step="0.01"
            required
          />
        </motion.div>

        <motion.div 
          className="form-group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label htmlFor="category">
            <HiOutlineTag className="label-icon" />
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categories[type].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </motion.div>

        <motion.button 
          type="submit" 
          className="submit-btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {showSuccess ? (
            <>
              <FaCheckCircle className="btn-icon" />
              Added!
            </>
          ) : (
            <>
              <FaPlus className="btn-icon" />
              Add {type === 'income' ? 'Income' : 'Expense'}
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  )
}

export default BudgetForm
