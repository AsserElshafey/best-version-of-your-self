import '@/styles/globals.css';
import "@mantine/core/styles.css";

import { AuthProvider } from '../contexts/AuthContext';

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
        </AuthProvider>
      </body>
    </html>
  )
}

export default Rootlayout