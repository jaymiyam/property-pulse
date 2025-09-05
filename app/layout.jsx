import '@/assets/styles/globals.css';
import { Poppins } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import { GlobalContextProvider } from './context/GlobalContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  title: 'Property Pulse',
  description: 'Find your perfect property listing.',
};

const RootLayout = ({ children }) => {
  return (
    <AuthProvider>
      <GlobalContextProvider>
        <html className={`${poppins.variable}`}>
          <body className="font-main">
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </GlobalContextProvider>
    </AuthProvider>
  );
};

export default RootLayout;
