import { Routes, Route } from 'react-router-dom'
import Login from './controllers/login'
import Register from './controllers/register'
import Dashboard from './controllers/dashboard'

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
