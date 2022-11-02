export default function Navbar() {
  return (
    <>
      <nav className="green darken-1" role="navigation">
        <div className="nav-wrapper container">
          <a href="/" id="logo-container" className="brand-logo">
            In-browser AI
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              <a href="/models/sem-segment">Microscopy images segmentation</a>
            </li>
            <li>
              <a href="/models/grammar-check">Grammar correction</a>
            </li>
            <li>
              <a href="/models/segment">Images segmentation</a>
            </li>
            <li>
              <a href="/models/classification">Images classification</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
