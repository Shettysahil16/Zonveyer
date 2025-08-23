import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom';
import router from './routes/index.jsx'
import { AuthProvider } from './context/AuthProvider.jsx';
import { SocketProvider } from './context/SocketContext.jsx';
import { UserSearchProvider } from './context/UserSearchContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <SocketProvider>
        <UserSearchProvider>
          <RouterProvider router={router} />
        </UserSearchProvider>
      </SocketProvider>
    </AuthProvider>
  </StrictMode>,
)
