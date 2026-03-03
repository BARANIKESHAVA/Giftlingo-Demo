import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';

export const metadata = {
  title: 'GiftLingo — Find the Perfect Gift for Every Occasion',
  description:
    'GiftLingo is your one-stop shop for unique, fun, and thoughtful gift items. Browse toy cars, LED gifts, couple gifts, surprise boxes, and more!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
