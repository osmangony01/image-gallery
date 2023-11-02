import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Route.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='max-w-[1000px] mx-auto bg-white my-3 rounded'>
      <RouterProvider router={router}></RouterProvider>
    </div>
  </React.StrictMode>,
)
