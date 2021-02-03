import '../styles/global.css';
import { AuthProvider } from '../context/Auth';
import { useEffect } from 'react';

function MyApp({ Component, pageProps, maconha }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <h1>{maconha}</h1>
    </AuthProvider>
  )
}

export default MyApp
