import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Dashboard from './pages/Dashboard.jsx';
import './index.css';
import Auth from './pages/Auth.jsx';
import { RequireAuth } from './components/hoc/RequireAuth.jsx';

// Dashboard не работает пока из-за того что ему нужен mailboxId
const router = createBrowserRouter([
  { path: '/', element: <App /> },
  {
    path: '/dashboard',
    element: (
      <RequireAuth>
        <Dashboard />
      </RequireAuth>
    ),
  },
  { path: '/auth', element: <Auth /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
