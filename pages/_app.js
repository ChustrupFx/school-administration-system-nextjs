import '../styles/global.css';
import { AuthProvider } from '../context/Auth';
import { SidebarProvider } from '../context/Sidebar';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Component {...pageProps} />
      </SidebarProvider>
    </AuthProvider>
  )
}

export default MyApp
