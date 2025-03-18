import "@/styles/globals.css";
import "@mantine/core/styles.css";
import { AuthProvider } from "../contexts/AuthContext";
import { Inter } from "next/font/google";
import Script from "next/script";
import { MantineProvider, createTheme } from "@mantine/core";

// Load Google Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Create theme
const theme = createTheme({
  colors: {
    primary: [
      "#F2F8EE", // 0 - Lightest tint
      "#E7F5DC", // 1 - Very light
      "#D3E9C3", // 2
      "#BFE0AD", // 3
      "#A7D490", // 4
      "#90C674", // 5
      "#728156", // 6 - Primary
      "#5D6945", // 7 - Primary Dark
      "#495234", // 8 - Darker shade
      "#343923", // 9 - Darkest shade
    ],
  },
  primaryColor: "primary",
  primaryShade: 6,
  defaultRadius: "md",
  fontFamily: inter.style.fontFamily,
  headings: {
    fontFamily: inter.style.fontFamily,
  },
  components: {
    Button: {
      defaultProps: {
        size: "md",
        radius: "md",
      },
    },
  },
});

export const metadata = {
  title: "Better",
  description:
    "This Website is designed to make you the greatest version of yourself",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="350cae94-af0d-4764-ac52-1cbe297332f8"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.className} bg-gray-100`}>
        <AuthProvider>
          <MantineProvider theme={theme}>
            <main>{children}</main>
          </MantineProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
