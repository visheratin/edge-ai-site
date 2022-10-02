import React from "react"

export default function Footer() {
  return (
    <>
      <footer className="page-footer orange">
        <div className="container">
          <div className="row">
            <div className="col l9 s12">
              <h5 className="white-text">About the project</h5>
              <p className="grey-text text-lighten-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et voluptatum laborum aliquid!
                Saepe dolore nostrum ullam explicabo consequuntur, deserunt ipsum. Temporibus id quas natus
                recusandae praesentium et est voluptatum blanditiis?
              </p>
            </div>
            <div className="col l3 s12">
              <h5 className="white-text">Contacts</h5>
              <ul>
                <li><a className="white-text" href="https://twitter.com/visheratin">Twitter</a></li>
                <li><a className="white-text" href="https://www.linkedin.com/in/visheratin/">LinkedIn</a></li>
                <li><a className="white-text" href="mailto:alex@visheratin.com">Email</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}