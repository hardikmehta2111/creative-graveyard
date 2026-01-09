import React from 'react'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/routes'
import { AuthProvider } from './context/AuthContext'

const App = () => {
  return (
    <React.StrictMode>
      <AuthProvider>
      <RouterProvider router={routes}/>
      </AuthProvider>
    </React.StrictMode>
  )
}

export default App