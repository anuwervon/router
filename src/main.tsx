import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/home/home'
import User from './pages/user/user'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route>
          <Route index element={<Home/>} />
          <Route path='users/:id' element={<User/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
