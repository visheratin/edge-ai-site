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
              <a href="/demos/image">Image processing demos</a>
            </li>
            <li>
              <a href="/demos/text">Text processing demos</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
