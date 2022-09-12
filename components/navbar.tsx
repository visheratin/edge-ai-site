export default function Navbar() {
  return (
    <>
      <nav className="light-blue lighten-1" role="navigation">
        <div className="nav-wrapper container">
          <a id="logo-container" href="/" className="brand-logo">Edge AI</a>
          <ul className="right hide-on-med-and-down">
            <li><a href="/models/sem-segment">Microscopy images segmentation</a></li>
          </ul>

          <ul id="nav-mobile" className="sidenav">
            <li><a href="/models/sem-segment">Microscopy images segmentation</a></li>
          </ul>
          <a href="#" data-target="nav-mobile" className="sidenav-trigger"
          ><i className="material-icons">Menu</i></a>
        </div>
      </nav>
    </>
  )
}