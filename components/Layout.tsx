import Head from "next/head"
import Link from "next/link"
import { Children } from "react"

const Layout: React.FC = ({ children }) => {
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
  )
}
export default Layout