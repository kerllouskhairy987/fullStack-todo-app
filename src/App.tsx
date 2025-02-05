import './App.css'
import { RouterProvider } from 'react-router'
import router from './router'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <main>
      <RouterProvider router={router} />
      <Toaster />
    </main>
  )
}

export default App
