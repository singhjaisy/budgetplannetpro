import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaBriefcase, 
  FaLaptopCode, 
  FaChartLine, 
  FaGift,
  FaUtensils,
  FaCar,
  FaShoppingBag,
  FaFileInvoiceDollar,
  FaFilm,
  FaHospital,
  FaGraduationCap,
  FaTag,
  FaTrash,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa'
import { HiOutlineCalendar } from 'react-icons/hi'

function BudgetList({ items, onDelete }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getCategoryIcon = (category) => {
    const iconMap = {
      'Salary': FaBriefcase,
      'Freelance': FaLaptopCode,
      'Investment': FaChartLine,
      'Gift': FaGift,
      'Food': FaUtensils,
      'Transport': FaCar,
      'Shopping': FaShoppingBag,
      'Bills': FaFileInvoiceDollar,
      'Entertainment': FaFilm,
      'Healthcare': FaHospital,
      'Education': FaGraduationCap,
      'Other': FaTag
    }
    const IconComponent = iconMap[category] || FaTag
    return <IconComponent />
  }

  if (items.length === 0) {
    return (
      <motion.div 
        className="budget-list animate-fade-in"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Budget Items</h2>
        <motion.div 
          className="empty-state animate-fade-in"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p>No budget items yet. Add your first income or expense above!</p>
        </motion.div>
      </motion.div>
    )
  }

  // Separate income and expenses
  const incomeItems = items.filter(item => item.type === 'income')
  const expenseItems = items.filter(item => item.type === 'expense')

  return (
    <motion.div 
      className="budget-list animate-fade-in"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Budget Items</h2>
      
      {incomeItems.length > 0 && (
        <motion.div 
          className="items-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="section-title income-title">
            <span>
              <FaArrowUp className="section-icon" />
              Income
            </span>
            <span className="section-total">
              {formatCurrency(incomeItems.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0))}
            </span>
          </h3>
          <div className="items-container">
            <AnimatePresence>
              {incomeItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="budget-item income-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, scale: 0.9 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.02, x: 8 }}
                  layout
                >
                  <motion.div 
                    className="item-icon"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {getCategoryIcon(item.category)}
                  </motion.div>
                  <div className="item-details">
                    <div className="item-description">{item.description}</div>
                    <div className="item-meta">
                      <span className="item-category">{item.category}</span>
                      <span className="item-date">
                        <HiOutlineCalendar className="date-icon" />
                        {formatDate(item.date)}
                      </span>
                    </div>
                  </div>
                  <div className="item-amount income-amount">
                    +{formatCurrency(item.amount)}
                  </div>
                  <motion.button
                    className="delete-btn"
                    onClick={() => onDelete(item.id)}
                    aria-label="Delete item"
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaTrash />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {expenseItems.length > 0 && (
        <motion.div 
          className="items-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="section-title expense-title">
            <span>
              <FaArrowDown className="section-icon" />
              Expenses
            </span>
            <span className="section-total">
              {formatCurrency(expenseItems.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0))}
            </span>
          </h3>
          <div className="items-container">
            <AnimatePresence>
              {expenseItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="budget-item expense-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, scale: 0.9 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.02, x: 8 }}
                  layout
                >
                  <motion.div 
                    className="item-icon"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {getCategoryIcon(item.category)}
                  </motion.div>
                  <div className="item-details">
                    <div className="item-description">{item.description}</div>
                    <div className="item-meta">
                      <span className="item-category">{item.category}</span>
                      <span className="item-date">
                        <HiOutlineCalendar className="date-icon" />
                        {formatDate(item.date)}
                      </span>
                    </div>
                  </div>
                  <div className="item-amount expense-amount">
                    -{formatCurrency(item.amount)}
                  </div>
                  <motion.button
                    className="delete-btn"
                    onClick={() => onDelete(item.id)}
                    aria-label="Delete item"
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaTrash />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default BudgetList
