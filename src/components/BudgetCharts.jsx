import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts'
import { FaChartBar, FaChartPie, FaChartLine } from 'react-icons/fa'
import { HiOutlineChartBar, HiOutlineTrendingUp } from 'react-icons/hi'

function BudgetCharts({ items }) {
  // Income vs Expenses comparison
  const income = items
    .filter(item => item.type === 'income')
    .reduce((sum, item) => sum + parseFloat(item.amount || 0), 0)

  const expenses = items
    .filter(item => item.type === 'expense')
    .reduce((sum, item) => sum + parseFloat(item.amount || 0), 0)

  const comparisonData = [
    { name: 'Income', amount: income, fill: '#10b981' },
    { name: 'Expenses', amount: expenses, fill: '#ef4444' }
  ]

  // Expenses by category
  const expenseByCategory = items
    .filter(item => item.type === 'expense')
    .reduce((acc, item) => {
      const category = item.category || 'Other'
      acc[category] = (acc[category] || 0) + parseFloat(item.amount || 0)
      return acc
    }, {})

  const categoryData = Object.entries(expenseByCategory)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  // Income by category
  const incomeByCategory = items
    .filter(item => item.type === 'income')
    .reduce((acc, item) => {
      const category = item.category || 'Other'
      acc[category] = (acc[category] || 0) + parseFloat(item.amount || 0)
      return acc
    }, {})

  const incomeCategoryData = Object.entries(incomeByCategory)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  // Monthly trends (last 6 months)
  const getMonthKey = (dateString) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
  }

  const monthlyData = items.reduce((acc, item) => {
    const monthKey = getMonthKey(item.date)
    if (!acc[monthKey]) {
      acc[monthKey] = { month: monthKey, income: 0, expenses: 0 }
    }
    if (item.type === 'income') {
      acc[monthKey].income += parseFloat(item.amount || 0)
    } else {
      acc[monthKey].expenses += parseFloat(item.amount || 0)
    }
    return acc
  }, {})

  const monthlyTrendData = Object.values(monthlyData)
    .sort((a, b) => a.month.localeCompare(b.month))
    .slice(-6)
    .map(item => ({
      ...item,
      month: new Date(item.month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    }))

  // Colors for pie charts
  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16']

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value)
  }

  if (items.length === 0) {
    return (
      <motion.div 
        className="budget-charts animate-fade-in"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>
          <FaChartBar className="inline-icon" />
          Budget Analysis
        </h2>
        <motion.div 
          className="empty-charts animate-fade-in"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p>Add some budget items to see analysis charts!</p>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className="budget-charts animate-fade-in"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>
        <FaChartBar className="inline-icon" />
        Budget Analysis
      </h2>
      
      <div className="charts-grid">
        {/* Income vs Expenses Comparison */}
        <motion.div 
          className="chart-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
        >
          <h3>
            <HiOutlineChartBar className="chart-icon" />
            Income vs Expenses
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Bar dataKey="amount" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Expenses by Category */}
        {categoryData.length > 0 && (
          <motion.div 
            className="chart-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <h3>
              <FaChartPie className="chart-icon" />
              Expenses by Category
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {/* Income by Category */}
        {incomeCategoryData.length > 0 && (
          <motion.div 
            className="chart-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <h3>
              <FaChartPie className="chart-icon" />
              Income by Category
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={incomeCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {incomeCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {/* Monthly Trends */}
        {monthlyTrendData.length > 0 && (
          <motion.div 
            className="chart-card chart-card-wide"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.01 }}
          >
            <h3>
              <HiOutlineTrendingUp className="chart-icon" />
              Monthly Trends (Last 6 Months)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={formatCurrency} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="Income"
                  dot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#ef4444"
                  strokeWidth={3}
                  name="Expenses"
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default BudgetCharts

