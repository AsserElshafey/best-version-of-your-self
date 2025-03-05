import "@/styles/globals.css";
import "@mantine/core/styles.css";
import { AuthProvider } from "../contexts/AuthContext";
import { Inter, Pacifico } from "next/font/google";
import Script from "next/script";

// Load Google Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Better",
  description:
    "This Website is designed to make you the greatest version of yourself",
};

const Rootlayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="350cae94-af0d-4764-ac52-1cbe297332f8"
        ></script>{" "}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="350cae94-af0d-4764-ac52-1cbe297332f8"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.className} bg-gray-100`}>
        <AuthProvider>
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
};

export default Rootlayout;
