# 💰 Budget Planner Pro

A modern, feature-rich budget planning application built with React. Track your income, expenses, and analyze your financial data with beautiful charts and visualizations.

![Budget Planner Pro](https://img.shields.io/badge/React-19.2.0-blue) ![Vite](https://img.shields.io/badge/Vite-7.2.4-purple) ![PWA](https://img.shields.io/badge/PWA-Enabled-green)

## ✨ Features

- 🔐 **User Authentication** - Secure login and signup system
- 💰 **Income & Expense Tracking** - Easily add and manage your financial transactions
- 📊 **Visual Analytics** - Beautiful charts showing income vs expenses, category breakdowns, and monthly trends
- 💾 **Data Management** - Export to JSON/CSV and import your data
- 📱 **Progressive Web App** - Install on your phone and use offline
- 🎨 **Modern UI** - Beautiful, responsive design with smooth animations
- 🔄 **Real-time Updates** - See your balance update instantly
- 📈 **Category Management** - Organize transactions by categories
- 💾 **Local Storage** - Data persists automatically

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/plannerpro.git
cd plannerpro
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## 📱 Install on Your Phone

This app is a Progressive Web App (PWA) that can be installed on your phone:

1. Deploy the app (see [DEPLOYMENT.md](./DEPLOYMENT.md))
2. Open the URL on your phone
3. **Android**: Chrome → Menu → "Add to Home Screen"
4. **iPhone**: Safari → Share → "Add to Home Screen"

## 🛠️ Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **React Icons** - Icon library
- **PWA Plugin** - Progressive Web App support

## 📁 Project Structure

```
plannerpro/
├── public/          # Static assets
├── src/
│   ├── components/ # React components
│   ├── context/    # React context (Auth)
│   ├── App.jsx     # Main app component
│   └── main.jsx    # Entry point
├── index.html      # HTML template
└── vite.config.js  # Vite configuration
```

## 🎯 Key Components

- **BudgetSummary** - Displays total income, expenses, and balance
- **BudgetForm** - Form to add new income/expense items
- **BudgetList** - List of all budget items with delete functionality
- **BudgetCharts** - Visual analytics with multiple chart types
- **DataExport** - Export/import functionality
- **Login/Signup** - User authentication

## 📊 Features in Detail

### Budget Tracking
- Add income and expenses with descriptions
- Categorize transactions
- Automatic balance calculation
- Date tracking for each transaction

### Analytics
- Income vs Expenses comparison chart
- Expenses by category (pie chart)
- Income by category (pie chart)
- Monthly trends (line chart)

### Data Management
- Export data to JSON format
- Export data to CSV format
- Import previously exported data
- Automatic local storage backup

## 🔒 Security Note

This is a frontend-only application. User passwords are stored in localStorage for demonstration purposes. In a production environment, you should:
- Use a secure backend API
- Hash passwords properly
- Implement proper authentication tokens
- Use HTTPS

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 👤 Author

Your Name

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for the blazing-fast build tool
- All the open-source library maintainers

---

Made with ❤️ using React
