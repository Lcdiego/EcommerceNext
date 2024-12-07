import "./globals.css";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { ProductoProvider } from "./components/contex/contex";




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.jpg" />
      </head>
      <body
       
      >
        <ProductoProvider>
          <Navbar />
          {children}
          <Footer />
        </ProductoProvider>
      </body>
    </html>
  );
}
