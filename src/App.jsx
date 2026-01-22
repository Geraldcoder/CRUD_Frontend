import { Routes, Route } from 'react-router-dom'
import Login from './components/login'
import Register from './components/register'
import Dashboard from './components/dashboard'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  )
}

export default App
