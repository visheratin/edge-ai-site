import Navbar from "./navbar";
import Footer from "./footer"
import { ReactNode } from "react";

interface Props {
  children?: ReactNode
}

const Layout = ({ children, ...props }: Props) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout