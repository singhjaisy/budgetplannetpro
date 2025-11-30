import { motion } from 'framer-motion'
import { FaArrowUp, FaArrowDown, FaBalanceScale } from 'react-icons/fa'
import { HiTrendingUp, HiTrendingDown } from 'react-icons/hi'

function BudgetSummary({ income, expenses, balance }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const cards = [
    {
      type: 'income',
      label: 'Total Income',
      amount: income,
      icon: FaArrowUp,
      color: 'income',
      delay: 0.1
    },
    {
      type: 'expense',
      label: 'Total Expenses',
      amount: expenses,
      icon: FaArrowDown,
      color: 'expense',
      delay: 0.2
    },
    {
      type: 'balance',
      label: 'Balance',
      amount: balance,
      icon: FaBalanceScale,
      color: balance >= 0 ? 'positive' : 'negative',
      delay: 0.3
    }
  ]

  return (
    <motion.div 
      className="budget-summary animate-fade-in"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {cards.map((card, index) => {
        const IconComponent = card.icon
        return (
          <motion.div
            key={card.type}
            className={`summary-card ${card.color}-card`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: card.delay, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -8 }}
          >
            <div className="summary-label">
              <IconComponent className="summary-icon" />
              {card.label}
            </div>
            <motion.div 
              className={`summary-amount ${card.color}-amount`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: card.delay + 0.2, type: "spring", stiffness: 200 }}
            >
              {formatCurrency(card.amount)}
            </motion.div>
            {card.type === 'balance' && (
              <motion.div
                className="balance-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: card.delay + 0.4 }}
              >
                {balance >= 0 ? (
                  <HiTrendingUp className="trend-icon positive" />
                ) : (
                  <HiTrendingDown className="trend-icon negative" />
                )}
              </motion.div>
            )}
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export default BudgetSummary
