import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import AuthPage from './pages/AuthPage'; // Import your AuthPage
function App() {

  return (
    
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
      
  )
}

export default App
