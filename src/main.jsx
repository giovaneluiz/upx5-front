import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PrimeReactProvider } from 'primereact/api';
import Login from './pages/Login'
import MenuUser from './pages/MenuUser';
import PrintQrCode from './pages/MenuUser/components/PrintQrCode';

import './index.css'
import 'primeflex/primeflex.css'
import 'primereact/resources/primereact.min.css'
// import "primereact/resources/themes/arya-blue/theme.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import 'primeicons/primeicons.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },{
    path: '/menu',
    element: <MenuUser />
  },{
    path: '/print-qrcode/:uuid',
    element: <PrintQrCode />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <RouterProvider router={router} />
    </PrimeReactProvider>
  </React.StrictMode>
)
