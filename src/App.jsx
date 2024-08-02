import HomePage from './pages/HomePage'
import DevPage from './pages/DevPage'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
      <div className="main">     
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/dev' element={<DevPage />}></Route>
          <Route path='*' element={<HomePage />}></Route>
      </Routes>
      </div>
  )
}

export default App
