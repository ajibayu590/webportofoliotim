import './globals.css';
import { Montserrat, Poppins } from 'next/font/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const montserrat = Montserrat({ 
  subsets: ['latin'], 
  weight: ['700'],
  variable: '--font-montserrat'
});

const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['300', '400', '600'],
  variable: '--font-poppins'
});

export const metadata = {
  title: 'Creative Agency | Digital Portfolio',
  description: 'Creative Agency – A place for creative expression. Professional photography, video, graphic design, and branding services to strengthen your visual identity.',
  keywords: 'creative agency, creative studio, photography services, video services, graphic design, branding, visual identity',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${montserrat.variable} ${poppins.variable} bg-white text-slate-800`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
