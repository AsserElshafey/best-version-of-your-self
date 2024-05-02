import '@/styles/globals.css';

export const metadata = {
  title: "BVOYS",
  description: "This Website is designed to make you the greatest version of your self"
}

const Rootlayout = ({ children }) => {
  return (
    <html lang='en'>

      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}

export default Rootlayout