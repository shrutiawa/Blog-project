import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react"; // Import ReactNode type for children prop

interface LayoutProps {
  children: ReactNode; // Specify children prop with ReactNode type
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Recipes</title>
      </Head>
      <div className="layout">
        <header>
          <Link href='/'>
            <h1>
              <span>Just Add</span>
              <span>Marmite</span>
            </h1>
            <h2>Spreed The Joy</h2>
          </Link>
        </header>
        <div className="page-content">
          {children}
        </div>
        <footer>
          <p>Copyright {new Date().getFullYear()} Just Add Marmite</p>
        </footer>
      </div>
    </>
  );
};

export default Layout;
