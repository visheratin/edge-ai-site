import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <nav className="green darken-1" role="navigation">
        <div className="nav-wrapper container">
          <Link href="/" passHref={true}>
            <a id="logo-container" className="brand-logo">Edge AI</a>
          </Link>
          <ul className="right hide-on-med-and-down">
            <li>
              <Link href="/models/sem-segment" passHref={true}>
                <a>Microscopy images segmentation</a>
              </Link>
            </li>
            <li>
              <Link href="/models/grammar-check" passHref={true}>
                <a>Grammar check</a>
              </Link>
            </li>
            <li>
              <Link href="/models/segment" passHref={true}>
                <a>Images segmentation</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}