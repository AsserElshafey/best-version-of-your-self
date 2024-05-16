import '@/styles/globals.css';

import Footer from '@/components/Footer';

export const metadata = {
  title: "BVOYS",
  description: "This Website is designed to make you the greatest version of your self"
}

const Rootlayout = ({ children }) => {
  return (
    <html lang='en'>
      <body className='bg-gray-100'>
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

export default Rootlayout