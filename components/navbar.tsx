import { useLayoutEffect } from "react";

export default function Navbar() {
  return (
    <>
      <nav className="light-blue lighten-1" role="navigation">
        <div className="nav-wrapper container">
          <a id="logo-container" href="/" className="brand-logo">Edge AI</a>
          <ul className="right hide-on-med-and-down">
            <li><a href="/models/sem-segment">Microscopy images segmentation</a></li>
            <li><a href="/models/grammar-check">Grammar check</a></li>
          </ul>
        </div>
      </nav>
    </>
  )
}