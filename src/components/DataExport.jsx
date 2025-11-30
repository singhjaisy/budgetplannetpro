import { motion } from 'framer-motion'
import { 
  FaDownload, 
  FaFileExport, 
  FaFileImport, 
  FaDatabase,
  FaCheckCircle
} from 'react-icons/fa'
import { HiOutlineCloudDownload, HiOutlineCloudUpload } from 'react-icons/hi'

function DataExport({ items, onImport }) {
  const exportToJSON = () => {
    const dataStr = JSON.stringify(items, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `budget-data-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const exportToCSV = () => {
    const headers = ['Type', 'Description', 'Amount', 'Category', 'Date']
    const rows = items.map(item => [
      item.type,
      `"${item.description}"`,
      item.amount,
      item.category,
      new Date(item.date).toLocaleDateString()
    ])
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')
    
    const dataBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `budget-data-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleImport = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result)
        if (Array.isArray(importedData)) {
          if (window.confirm(`Import ${importedData.length} items? This will replace your current data.`)) {
            onImport(importedData)
          }
        } else {
          alert('Invalid file format. Please import a valid JSON file.')
        }
      } catch (error) {
        alert('Error reading file. Please make sure it is a valid JSON file.')
        console.error('Import error:', error)
      }
    }
    reader.readAsText(file)
    e.target.value = '' // Reset input
  }

  return (
    <motion.div 
      className="data-export"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <h3>
        <FaDatabase className="inline-icon" />
        Data Management
      </h3>
      <div className="export-buttons">
        <motion.button 
          onClick={exportToJSON} 
          className="export-btn"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <HiOutlineCloudDownload className="btn-icon" />
          Export JSON
        </motion.button>
        <motion.button 
          onClick={exportToCSV} 
          className="export-btn"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaFileExport className="btn-icon" />
          Export CSV
        </motion.button>
        <motion.label 
          className="import-btn"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <HiOutlineCloudUpload className="btn-icon" />
          Import JSON
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            style={{ display: 'none' }}
          />
        </motion.label>
      </div>
      {items.length > 0 && (
        <motion.p 
          className="data-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <FaCheckCircle className="info-icon" />
          {items.length} item{items.length !== 1 ? 's' : ''} saved
        </motion.p>
      )}
    </motion.div>
  )
}

export default DataExport
