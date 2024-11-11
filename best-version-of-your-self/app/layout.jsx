import '@/styles/globals.css';
import "@mantine/core/styles.css";

import { AuthProvider } from './context/AuthContext';

import Footer from '@/components/Footer';

export const metadata = {
  title: "Better",
  description: "This Website is designed to make you the greatest version of your self"
}

const Rootlayout = ({ children }) => {
  return (
    <html lang='en'>
      <body className='bg-gray-100'>
        <AuthProvider>
          <main>
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}

export default Rootlayout